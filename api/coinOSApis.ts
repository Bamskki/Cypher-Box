import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleToast from "react-native-simple-toast";

const BASE_URL = 'https://coinos.io/api';
const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('authToken');
  } catch (error) {
    console.error('Error getting auth token from AsyncStorage:', error);
    throw error;
  }
};

const withAuthToken = async (requestConfig: any) => {
  const authToken = await getAuthToken();
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

export const registerUser = async (username: string, password: string) => {
  try {
    const payload = {
        user: {
            username: username,
            password: password,
        }
    }
    console.log('payload:', payload)
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return await response.text();
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const payload = {
        username,
        password
    }
    console.log('payload: ', payload)
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    console.log('response: ', response)
    return await response.json();
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const createInvoice = async (invoiceData: any) => {
  try {
    const response = await fetch(`${BASE_URL}/invoice`, await withAuthToken({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ invoice: invoiceData }),
    }));
    return await response.json();
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
};

export const getInvoiceByHash = async (hash: string) => {
  try {
    const response = await fetch(`${BASE_URL}/invoice/${hash}`, await withAuthToken({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }));
    return await response.json();
  } catch (error) {
    console.error('Error fetching invoice by hash:', error);
    throw error;
  }
};

export const sendLightningPayment = async (payreq: string) => {
  try {
    const response = await fetch(`${BASE_URL}/payments`, await withAuthToken({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payreq: payreq }),
    }));

    console.log('response: ', response)
    const responseJSON = await response.text();
    console.log('responseJSON: ', responseJSON)
    return responseJSON;
  } catch (error) {
    console.error('Error sending lightning payment:', error);
    throw error;
  }
};

export const sendCoinsViaUsername = async (address: string, amount: number) => {
  try {
    let [name, domain] = address.split("@");
    
    let url = `https://${domain}/.well-known/lnurlp/${name}`;
    
    const response = await fetch(url);
    console.log('sendCoinsViaLNURL response: ', response)
    const lnurlPayData = await response.json();
    console.log('sendCoinsViaLNURL lnurlPayData: ', lnurlPayData)

    if (lnurlPayData.tag === "payRequest") {
      const paymentResponse = await fetch(lnurlPayData.callback+'?amount='+(amount * 1000), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('sendCoinsViaLNURL paymentResponse: ', paymentResponse)

      const paymentResult = await paymentResponse.json();
      console.log('sendCoinsViaLNURL paymentResult: ', paymentResult)
      if(paymentResult.pr){
        const sendToUser = await sendLightningPayment(paymentResult.pr)

        console.log('sendToUser: ' ,sendToUser)
        return sendToUser;  
      } else {
        SimpleToast.show(paymentResult.reason, SimpleToast.SHORT);
        return;
      }
    } else {
      SimpleToast.show("Invalid LNURL-Pay response", SimpleToast.SHORT)
      throw new Error("Invalid LNURL-pay response");
    }
  } catch (error) {
    console.error("Error sending LNURL-pay payment:", error);
    throw error;
  }
}

export const sendInternalPayment = async (amount: number, hash: string) => {
  try {
    const response = await fetch(`${BASE_URL}/payments`, await withAuthToken({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, hash }),
    }));
    return await response.json();
  } catch (error) {
    console.error('Error sending internal payment:', error);
    throw error;
  }
};

export const sendBitcoinPayment = async (amount: number, address: string) => {
  try {
    const response = await fetch(`${BASE_URL}/bitcoin/send`, await withAuthToken({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, address }),
    }));
    return await response.json();
  } catch (error) {
    console.error('Error sending bitcoin payment:', error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await fetch(`${BASE_URL}/me`, await withAuthToken({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }));
    return await response.json();
  } catch (error) {
    console.error('Error getting me:', error);
    throw error;
  }
};

export const testAPI = async () => {
  try {
    const response = await fetch(`${BASE_URL}/rates`, await withAuthToken({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }));
    return await response.json();
  } catch (error) {
    console.error('Error getting me:', error);
    throw error;
  }
};

export const getTransactionHistory = async (offset: number, limit: number) => {
  try {
    const response = await fetch(`${BASE_URL}/payments?offset=${offset}&limit=${limit}`, await withAuthToken({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }));
    return await response.json();
  } catch (error) {
    console.error('Error fetching invoice by hash:', error);
    throw error;
  }
};