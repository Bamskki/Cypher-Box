import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

export const getItem = (key: string) => {
    try {
        const value = storage.getString(key);
        if (value) {
            return JSON.parse(value);
        }
        throw Error();
    } catch (e) {
        return null;
    }
};

export const setItem = (key: string, value: string | number | boolean | object) => {
    const storeValue = JSON.stringify(value);
    return storage.set(key, storeValue);
};

export const removeItem = (key: string) => storage.delete(key);

export const clearAllData = () => storage.clearAll();
