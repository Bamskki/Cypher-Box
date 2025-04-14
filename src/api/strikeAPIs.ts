import useAuthStore from '@Cypher/stores/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleToast from "react-native-simple-toast";

const BASE_URL = 'https://api.strike.me/v1';

const withAuthToken = async (requestConfig: any) => {
    const authToken = useAuthStore.getState().strikeToken;
    if (!authToken) {
        throw new Error('Auth token not found in AsyncStorage');
    }
    return {
        ...requestConfig,
        headers: {
            ...requestConfig.headers,
            Authorization: `Bearer ${authToken}`,
        },
    };
};

export const getBalances = async () => {
    try {
        const response = await fetch(`${BASE_URL}/balances/`, await withAuthToken({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }));
        return await response.json();
    } catch (error) {
        console.error('Error fetching balances by strike:', error);
        throw error;
    }
};

export const getInvoices = async () => {
    try {
        const response = await fetch(`${BASE_URL}/invoices/`, await withAuthToken({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }));
        return await response.json();
    } catch (error) {
        console.error('Error fetching invoices by strike:', error);
        throw error;
    }
};

export const getInvoicesByID = async (id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/invoices/${id}`, await withAuthToken({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }));
        return await response.json();
    } catch (error) {
        console.error('Error fetching invoices by strike:', error);
        throw error;
    }
};