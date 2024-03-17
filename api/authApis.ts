// api.js

const httpLink = 'https://api.mainnet.galoy.io:443';

export const requestEmailCode = async (email: string) => {
    try {
      const response = await fetch(httpLink+'/auth/email/code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error requesting email code:', error);
      throw error;
    }
  };
  
  export const emailLogin = async (emailLoginId: string, code: number) => {
    try {
      const response = await fetch(httpLink+'/auth/email/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ emailLoginId, code }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error logging in with email:', error);
      throw error;
    }
  };
  