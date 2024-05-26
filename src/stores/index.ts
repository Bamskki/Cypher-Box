import { StateStorage } from "zustand/middleware";
import { getItem, removeItem, setItem } from "./storageService";

export const zustandStorage: StateStorage = {
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem
};
