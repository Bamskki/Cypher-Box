import { create, GetState, SetState } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "./index";

export type AuthStateType = {
    user: null | any;
    token: string | null;
    withdrawThreshold: any | null;
    isAuth: boolean | undefined;
    walletID: string | undefined;
    reserveAmount: number;
    coldStorageWalletID: string | undefined;
    vaultTab: boolean;
    userCreds: {email: string, password: string, isRememberMe: boolean} | undefined;
    setUserCreds: (state: {email: string, password: string, isRememberMe: boolean} | undefined) => void;
    setVaultTab: (state: boolean) => void;
    setReserveAmount: (state: number) => void;
    setAuth: (state: boolean | undefined) => void;
    setWalletID: (state: string | undefined) => void;
    setColdStorageWalletID: (state: string | undefined) => void;
    setToken: (token: string) => void;
    setUser: (state: any) => void;
    setWithdrawThreshold: (state: any) => void;
    clearAuth: () => void;
};

const createAuthStore = (
    set: SetState<AuthStateType>,
    get: GetState<AuthStateType>
): AuthStateType => ({
    user: null,
    token: null,
    withdrawThreshold: 2000000,
    reserveAmount: 100000,
    isAuth: undefined,
    walletID: undefined,
    vaultTab: false,
    userCreds: undefined,
    coldStorageWalletID: undefined,
    setAuth: (state: boolean | undefined) => set({ isAuth: state }),
    setVaultTab: (state: boolean) => set({ vaultTab: state }),
    setUserCreds: (state: {email: string, password: string, isRememberMe: boolean} | undefined) => set( { userCreds: state }),
    setToken: (token: string) => set({ token: token }),
    setUser: (state: any) => set({ user: state }),
    setWalletID: (state: string | undefined) => set({walletID: state}),
    setColdStorageWalletID: (state: string | undefined) => set({coldStorageWalletID: state}),
    setReserveAmount: (state: any) => set({ reserveAmount: state }),
    setWithdrawThreshold: (state: any) => set({ withdrawThreshold: state }),
    clearAuth: () =>
        set({
            vaultTab: false,
            isAuth: undefined,
            user: null,
            token: null,
            withdrawThreshold: 2000000,
            reserveAmount: 100000,
        })
});

const useAuthStore = create<AuthStateType>()(
    persist(createAuthStore, {
        name: 'Auth',
        storage: createJSONStorage(() => zustandStorage)
    })
);

export default useAuthStore;
