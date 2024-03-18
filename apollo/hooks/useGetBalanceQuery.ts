import { useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { GET_BALANCE_QUERY } from "../queries";

const useGetBalanceQuery = () => {
    const [authToken, setAuthToken] = useState('');
    const [loadingToken, setLoadingToken] = useState(true);
  
    useEffect(() => {
      const fetchAuthToken = async () => {
        try {
          const token = await AsyncStorage.getItem('authToken');
          if (token) {
            setAuthToken(token);
          }
        } catch (error: any) {
          console.error('Error retrieving authToken:', error?.message);
        } finally {
          setLoadingToken(false);
        }
      };
  
      fetchAuthToken();
    }, []);
  
    const { loading, error, data } = useQuery(GET_BALANCE_QUERY, {
      skip: loadingToken || !authToken,
    });
  
    return {
      loading,
      error,
      data,
    };
  };
  
  export default useGetBalanceQuery;