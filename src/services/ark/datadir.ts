import RNFS from 'react-native-fs';

export const ARK_DATADIR = `${RNFS.DocumentDirectoryPath}/bark`;

let ensured = false;

export async function ensureArkDatadir(): Promise<string> {
    if (ensured) return ARK_DATADIR;
    if (!(await RNFS.exists(ARK_DATADIR))) {
        await RNFS.mkdir(ARK_DATADIR, {
            NSURLIsExcludedFromBackupKey: true,
            NSFileProtectionKey: 'NSFileProtectionCompleteUntilFirstUserAuthentication',
        });
    }
    ensured = true;
    return ARK_DATADIR;
}

/**
 * Delete the Ark datadir (VTXO state, SQLite, exit txs).
 *
 * DESTRUCTIVE: any funds in VTXOs not backed up externally are unrecoverable
 * after this.
 *
 * NOT dev-only, despite what this said until 2026-09-08. Every caller is a
 * shipping path: the orphan-datadir auto-clean in CreateArkScreen, "Delete
 * vault" in Ark settings, and the re-key in ArkSeedPhraseScreen. This is the
 * function that destroys funds, and it has form: the old
 * `pendingExitsTotalSats == 0` auto-delete wiped a wallet mid-exit twice.
 *
 * THROWS IF THE DIRECTORY SURVIVES. `RNFS.unlink` does not only fail on a
 * missing path; it also fails on open file descriptors, iOS file protection,
 * and partial directory deletes, and in those cases the datadir is still there
 * afterwards. Callers use the throw to decide whether it is safe to delete the
 * seed, so "did it actually go" has to be answered rather than assumed.
 *
 * The `ensured` latch is reset in a `finally`. It used to sit after the awaited
 * unlink, so a throw left it `true` and the next `ensureArkDatadir()` returned
 * the path without checking the directory was there.
 */
export async function deleteArkDatadir(): Promise<void> {
    try {
        if (await RNFS.exists(ARK_DATADIR)) {
            await RNFS.unlink(ARK_DATADIR);
        }
        // Verify rather than trust. A resolved unlink is not proof on every
        // platform and failure mode, and the caller is about to decide whether
        // to destroy the only key to whatever is still on disk.
        if (await RNFS.exists(ARK_DATADIR)) {
            throw new Error(
                `Ark datadir still present after delete: ${ARK_DATADIR}`,
            );
        }
    } finally {
        ensured = false;
    }
}
