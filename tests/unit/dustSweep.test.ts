/**
 * Folding dust capsules into one, without being asked.
 *
 * The case that drove this: a 700 sat Lightning receive landed as a 300 and a
 * 400 (the ASP pays out of a pool of VTXOs and bundles them, confirmed by
 * Second.tech 2026-09). Both pieces are below the per input refresh floor, so
 * every automatic path refused them and only the manual Capsules button could
 * rescue them.
 *
 * The shape the ASP accepts is a dust ONLY batch clearing the dust limit,
 * confirmed live on mainnet 2026-08-20 (two 400s swept into one, bark 0.6.1).
 * These tests pin that shape: never a lone capsule, never mixed with healthy
 * ones, never an input that could expire mid round.
 */

import {
    ARK_DUST_SWEEP_MIN_BLOCKS_LEFT,
    ARK_DUST_SWEEP_MIN_TOTAL_SATS,
    buildDustSweepPlan,
    type BuildDustSweepInputs,
    type DustSweepVtxoInput,
} from '../../src/services/ark/dustSweep';

const MIN_SATS = 500; // ARK_REFRESH_MIN_SATS

const dust = (over: Partial<DustSweepVtxoInput> = {}): DustSweepVtxoInput => ({
    id: `v${Math.random().toString(36).slice(2, 8)}`,
    sats: 400,
    blocksUntilExpiry: null, // arkoor, the Lightning receive case
    stateTag: 'Spendable',
    alreadyRefreshing: false,
    ...over,
});

const plan = (vtxos: DustSweepVtxoInput[], over: Partial<BuildDustSweepInputs> = {}) =>
    buildDustSweepPlan({
        vtxos,
        exitInProgress: false,
        minRefreshSats: MIN_SATS,
        ...over,
    });

describe('the reported case', () => {
    it('sweeps a 700 sat receive that landed as a 300 and a 400', () => {
        const a = dust({ id: 'a', sats: 300 });
        const b = dust({ id: 'b', sats: 400 });
        expect(plan([a, b])).toEqual({
            sweep: true,
            ids: ['a', 'b'],
            totalSats: 700,
            candidateCount: 2,
            candidateSats: 700,
            reason: 'sweep',
            excludedCount: 0,
            excludedSats: 0,
        });
    });

    it('leaves the healthy capsules in the wallet out of the batch', () => {
        // A mixed batch has made the ASP reject the whole round, taking the
        // healthy inputs down with the dust. Dust only, always.
        const result = plan([
            dust({ id: 'dust1', sats: 300 }),
            dust({ id: 'dust2', sats: 400 }),
            dust({ id: 'healthy', sats: 5_000 }),
            dust({ id: 'at-the-floor', sats: MIN_SATS }),
        ]);
        expect(result.ids).toEqual(['dust1', 'dust2']);
        expect(result.totalSats).toBe(700);
    });
});

describe('the total gate', () => {
    it('does not sweep below the total, the output would be dust again', () => {
        const result = plan([dust({ sats: 200 }), dust({ sats: 150 })]);
        expect(result).toMatchObject({ sweep: false, reason: 'below-min-total', ids: [] });
        // The refusal still reports what it looked at, so the caller can say
        // how far short the wallet is instead of going quiet.
        expect(result).toMatchObject({ candidateCount: 2, candidateSats: 350 });
    });

    it('sweeps at the total, not only above it', () => {
        const half = ARK_DUST_SWEEP_MIN_TOTAL_SATS / 2;
        expect(plan([dust({ sats: half }), dust({ sats: half })]).sweep).toBe(true);
    });

    it('clears the refresh floor after the round fee, which is the point of the gate', () => {
        const result = plan([dust({ sats: 300 }), dust({ sats: 300 })]);
        expect(result.sweep).toBe(true);
        // Fee measured at ~1 sat on device; even the 20 sat allowance in the
        // pre-filter leaves the output above the floor, so the swept capsule can
        // refresh itself from then on. The caller re-checks this against bark's
        // real estimate before submitting.
        expect(result.totalSats - 20).toBeGreaterThanOrEqual(MIN_SATS);
    });

    it('lets through a 550 sat receive that split into two dust pieces', () => {
        // The concrete case a round 600 gate would have refused: output ~549,
        // comfortably above the floor, so the rescue is worth making.
        const result = plan([dust({ id: 'a', sats: 250 }), dust({ id: 'b', sats: 300 })]);
        expect(result).toMatchObject({ sweep: true, ids: ['a', 'b'], totalSats: 550 });
    });

    it('honours a caller supplied total', () => {
        expect(plan([dust({ sats: 200 }), dust({ sats: 200 })], { minTotalSats: 331 }).sweep).toBe(
            true,
        );
    });
});

describe('what never goes into a sweep', () => {
    it('refuses a single capsule however large, a lone sub floor input is rejected', () => {
        expect(plan([dust({ sats: 499 })])).toMatchObject({
            sweep: false,
            reason: 'single-capsule',
        });
    });

    it('refuses everything while a unilateral exit is in flight', () => {
        expect(
            plan([dust({ sats: 400 }), dust({ sats: 400 })], { exitInProgress: true }),
        ).toMatchObject({ sweep: false, reason: 'exit-in-progress' });
    });

    it('leaves out capsules that are not spendable', () => {
        const result = plan([
            dust({ id: 'ok1', sats: 400 }),
            dust({ id: 'ok2', sats: 400 }),
            dust({ id: 'locked', sats: 400, stateTag: 'Locked' }),
        ]);
        expect(result.ids).toEqual(['ok1', 'ok2']);
        expect(result).toMatchObject({ excludedCount: 1, excludedSats: 400 });
    });

    it('leaves out capsules another caller already submitted to a round', () => {
        const result = plan([
            dust({ id: 'ok1', sats: 400 }),
            dust({ id: 'ok2', sats: 400 }),
            dust({ id: 'mid-round', sats: 400, alreadyRefreshing: true }),
        ]);
        expect(result.ids).toEqual(['ok1', 'ok2']);
        expect(result.excludedCount).toBe(1);
    });

    it('leaves out an input that could expire while the round runs', () => {
        // Rounds fire hourly on mainnet and an expired input poisons the batch.
        const result = plan([
            dust({ id: 'ok1', sats: 400, blocksUntilExpiry: 4032 }),
            dust({ id: 'ok2', sats: 400, blocksUntilExpiry: 4032 }),
            dust({ id: 'expiring', sats: 400, blocksUntilExpiry: ARK_DUST_SWEEP_MIN_BLOCKS_LEFT - 1 }),
        ]);
        expect(result.ids).toEqual(['ok1', 'ok2']);
        expect(result).toMatchObject({ sweep: true, excludedCount: 1, excludedSats: 400 });
    });

    it('leaves out an already expired input', () => {
        const result = plan([
            dust({ id: 'ok1', sats: 400, blocksUntilExpiry: 4032 }),
            dust({ id: 'ok2', sats: 400, blocksUntilExpiry: 4032 }),
            dust({ id: 'expired', sats: 400, blocksUntilExpiry: -10 }),
        ]);
        expect(result.ids).toEqual(['ok1', 'ok2']);
    });

    it('reports no dust rather than sweeping a healthy wallet', () => {
        expect(plan([dust({ sats: 5_000 }), dust({ sats: 900 })])).toMatchObject({
            sweep: false,
            reason: 'no-dust',
            ids: [],
        });
    });
});

describe('near expiry dust, where this rule departs from the other refresh paths', () => {
    it('sweeps dust that is inside the exit runway floor', () => {
        // Every other automatic path refuses inside 28h of expiry, to protect
        // the unilateral exit window. Dust cannot be economically exited (a 400
        // at depth 17 costs 5,645 vB to rescue 400 sats), so refusing here just
        // loses the funds. 28h is ~168 blocks; these two sit well inside it.
        const result = plan([
            dust({ id: 'a', sats: 400, blocksUntilExpiry: 40 }),
            dust({ id: 'b', sats: 400, blocksUntilExpiry: 40 }),
        ]);
        expect(result).toMatchObject({ sweep: true, ids: ['a', 'b'], totalSats: 800 });
    });

    it('includes arkoor capsules, whose expiry the SDK does not report', () => {
        // expiryHeight 0 reaches this rule as null. These are exactly the
        // capsules a Lightning receive produces, so null must not mean skip.
        const result = plan([
            dust({ id: 'a', sats: 350, blocksUntilExpiry: null }),
            dust({ id: 'b', sats: 350, blocksUntilExpiry: null }),
        ]);
        expect(result.sweep).toBe(true);
    });

    it('treats an unreadable expiry as unsafe rather than guessing', () => {
        const result = plan([
            dust({ id: 'ok1', sats: 400, blocksUntilExpiry: 4032 }),
            dust({ id: 'ok2', sats: 400, blocksUntilExpiry: 4032 }),
            dust({ id: 'nan', sats: 400, blocksUntilExpiry: Number.NaN }),
        ]);
        expect(result.ids).toEqual(['ok1', 'ok2']);
        expect(result.excludedCount).toBe(1);
    });
});
