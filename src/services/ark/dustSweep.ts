/**
 * When should the wallet fold its dust capsules into one, by itself?
 *
 * WHY THIS EXISTS
 *
 * A Lightning receive is paid out of the ASP's VTXO pool, and the ASP bundles
 * pool VTXOs the way an on-chain wallet bundles inputs. So a single 700 sat
 * receive can land as a 300 and a 400 (observed live, reported to Second.tech
 * 2026-09; Peter confirmed the bundling is by design). Each piece is below
 * ARK_REFRESH_MIN_SATS, so:
 *
 *   - useArkoorReceivePrompt refuses to auto-refresh either one (its estimate
 *     says the post-fee output would fall below the floor) and shows a notice
 *     telling the user to spend them,
 *   - foregroundSweep counts them as stranded dust and skips them,
 *   - changeRefresh refuses them for the same reason,
 *
 * and the only thing that can actually save them is the user finding the "Dust
 * refresh" button on the Capsules tab. Nobody does that. The pieces then expire
 * even though the wallet holds enough dust to rescue them.
 *
 * The rescue itself is not new and not theoretical: a DELEGATED round over a
 * batch of sub-floor inputs is accepted as long as the batch clears the dust
 * limit, confirmed live on mainnet 2026-08-20 (two 400 sat capsules swept into
 * one, bark 0.6.1, which is the core inside SDK 0.16.1 today). This module is
 * that same rescue expressed as a rule, so the wallet can run it on its own.
 *
 * WHY A TOTAL, NOT A PER INPUT FLOOR
 *
 * The per input floor (ARK_REFRESH_MIN_SATS) is what makes a lone dust capsule
 * unrefreshable, and it is why dust must never ride along in a MIXED batch of
 * dust and healthy capsules (one sub floor input has made the ASP reject the
 * whole round, so the healthy inputs lose their refresh too). Neither of those
 * facts is changed here. A dust ONLY batch is the one shape that is known to
 * work, so that is the only shape this module ever produces.
 *
 * WHY THE TOTAL IS NOT THE DUST LIMIT
 *
 * The ASP accepts the round as soon as the batch clears the on chain dust limit
 * (ARK_VTXO_DUST_SATS, 330), and the manual button uses exactly that gate,
 * because a user who taps a button has decided for themselves. An AUTOMATIC
 * sweep should clear a higher bar: a 350 sat batch produces a ~349 sat capsule,
 * which is still below the refresh floor, so the wallet would have spent a fee
 * to arrive back at a capsule that cannot refresh itself, and nothing would have
 * changed. The batch has to be able to produce an output that clears
 * ARK_REFRESH_MIN_SATS, so the swept capsule rejoins normal maintenance.
 *
 * This rule applies that as a cheap size pre-filter only. The AUTHORITATIVE gate
 * is the SDK's own fee estimate at submit time (see maybeSweepDustArkVtxos),
 * because the fee is what decides whether the output clears the floor, and only
 * bark can price a round. Keeping the pre-filter close to the floor rather than
 * at a comfortable round number matters: a 550 sat Lightning receive that splits
 * into two dust pieces is rescuable (output ~549, above the floor), and a gate of
 * 600 would have refused it for no reason.
 *
 * WHY THE EXIT RUNWAY FLOOR DOES NOT APPLY
 *
 * Every other automatic refresh path refuses to act inside ARK_EXIT_RUNWAY_HOURS
 * of expiry, because a delegated round that hangs would eat the window the user
 * needs for a unilateral exit. That trade only exists when the exit is worth
 * something. It is not, for dust: a 400 sat capsule at depth 17 costs 5,645 vB
 * of exit tree fees to rescue 400 sats (measured 2026-08-22), which is why the
 * exit triage discards dust rather than funding it. So a near expiry dust
 * capsule loses nothing by joining a round, and doing nothing loses all of it.
 *
 * What we DO refuse is an input that could expire while the round runs. An
 * expired input poisons the whole round, mainnet rounds fire hourly, so an input
 * inside ARK_DUST_SWEEP_MIN_BLOCKS_LEFT of expiry is left out rather than
 * allowed to sink the rescue of the others.
 *
 * Pure and import free, matching changeRefresh.ts and refreshBatch.ts, so the
 * rule can be tested without standing up a wallet.
 */

/**
 * Size pre-filter: the total the dust must reach before the wallet even asks
 * bark to price a sweep.
 *
 * ARK_REFRESH_MIN_SATS (500) plus a 20 sat fee allowance. Below this the output
 * cannot clear the refresh floor whatever the fee comes back as, so there is
 * nothing to price. Above it, the SDK's estimate decides: the caller requires
 * total minus fee to clear the floor before it submits anything. The fee was
 * measured at ~1 sat on device (2026-08-20), so 20 is generous headroom rather
 * than a real constraint.
 *
 * The manual Capsules button keeps its lower ARK_VTXO_DUST_SATS gate. A user who
 * taps a button has decided for themselves.
 */
export const ARK_DUST_SWEEP_MIN_TOTAL_SATS = 520;

/**
 * Minimum blocks of life an input needs before it may join a sweep. Mainnet
 * rounds run hourly and an expired input makes the ASP reject the whole round,
 * so anything inside ~2 hours of expiry is excluded to protect the batch it
 * would otherwise be riding in.
 */
export const ARK_DUST_SWEEP_MIN_BLOCKS_LEFT = 12;

export type DustSweepVtxoInput = {
    id: string;
    sats: number;
    /**
     * Blocks until expiry, or null when the wallet cannot know. Arkoor capsules
     * report expiryHeight 0 (the SDK does not surface the ASP trust window), and
     * they are precisely the capsules a Lightning receive produces, so null must
     * mean "include", not "skip". Their real deadline (~3 days) is far outside
     * the mid round window this field guards.
     */
    blocksUntilExpiry: number | null;
    /** bark state tag, flattened to its variant string. */
    stateTag: string;
    /** Already submitted to a round by another caller. */
    alreadyRefreshing: boolean;
};

export type BuildDustSweepInputs = {
    vtxos: readonly DustSweepVtxoInput[];
    /** A unilateral exit is active on this wallet. */
    exitInProgress: boolean;
    /** Per input round minimum (ARK_REFRESH_MIN_SATS). Below it is dust. */
    minRefreshSats: number;
    /** Batch total the sweep needs; defaults to ARK_DUST_SWEEP_MIN_TOTAL_SATS. */
    minTotalSats?: number;
    /** Life an input needs to survive the round; defaults to ARK_DUST_SWEEP_MIN_BLOCKS_LEFT. */
    minBlocksLeft?: number;
};

export type DustSweepPlan = {
    sweep: boolean;
    /**
     * Ids to hand to refreshVtxosDelegated. Deliberately EMPTY unless `sweep`,
     * so a caller that forgets to read `sweep` submits nothing rather than an
     * unacceptable batch. Read `candidateCount` / `candidateSats` for what was
     * considered.
     */
    ids: string[];
    /** Aggregate sats of `ids`. */
    totalSats: number;
    /** Dust that passed every per input check, whether or not the batch fired. */
    candidateCount: number;
    /** Aggregate sats of that dust. Non zero on a refusal, which is the log line. */
    candidateSats: number;
    reason:
        | 'sweep'
        | 'exit-in-progress'
        | 'no-dust'
        | 'single-capsule'
        | 'below-min-total';
    /** Dust left out (not spendable, mid round, expiring inside the window). */
    excludedCount: number;
    /** Aggregate sats of the excluded dust, for the log line and any notice. */
    excludedSats: number;
};

/**
 * Decide whether the wallet's dust is worth sweeping, and which capsules go in.
 */
export function buildDustSweepPlan(input: BuildDustSweepInputs): DustSweepPlan {
    const minTotalSats = input.minTotalSats ?? ARK_DUST_SWEEP_MIN_TOTAL_SATS;
    const minBlocksLeft = input.minBlocksLeft ?? ARK_DUST_SWEEP_MIN_BLOCKS_LEFT;

    const ids: string[] = [];
    let totalSats = 0;
    let excludedCount = 0;
    let excludedSats = 0;

    const refuse = (reason: DustSweepPlan['reason']): DustSweepPlan => ({
        sweep: false,
        ids: [],
        totalSats: 0,
        candidateCount: ids.length,
        candidateSats: totalSats,
        reason,
        excludedCount,
        excludedSats,
    });

    // A cooperative round spends a coin the exit has already committed on chain.
    // Same refusal as every other refresh path.
    if (input.exitInProgress) return refuse('exit-in-progress');

    for (const v of input.vtxos) {
        // Dust is defined by the per input refresh floor: these are exactly the
        // capsules no other path can refresh.
        if (v.sats >= input.minRefreshSats) continue;
        if (v.stateTag.toLowerCase() !== 'spendable') {
            excludedCount += 1;
            excludedSats += v.sats;
            continue;
        }
        if (v.alreadyRefreshing) {
            excludedCount += 1;
            excludedSats += v.sats;
            continue;
        }
        // null is arkoor (expiry unknown, ~3 days out) and is included on
        // purpose. A KNOWN expiry inside the round window is not: an input that
        // expires mid round makes the ASP reject the batch it is riding in.
        if (v.blocksUntilExpiry != null) {
            if (!Number.isFinite(v.blocksUntilExpiry) || v.blocksUntilExpiry < minBlocksLeft) {
                excludedCount += 1;
                excludedSats += v.sats;
                continue;
            }
        }
        ids.push(v.id);
        totalSats += v.sats;
    }

    if (ids.length === 0) return refuse('no-dust');
    // A lone sub floor capsule cannot join a round on its own whatever its size:
    // its round output would fall below the dust limit and the ASP rejects it.
    // Only a batch has ever been accepted, so never submit a single id.
    if (ids.length === 1) return refuse('single-capsule');
    if (totalSats < minTotalSats) return refuse('below-min-total');

    return {
        sweep: true,
        ids,
        totalSats,
        candidateCount: ids.length,
        candidateSats: totalSats,
        reason: 'sweep',
        excludedCount,
        excludedSats,
    };
}
