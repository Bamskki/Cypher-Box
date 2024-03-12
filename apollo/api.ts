import { useMutation, useQuery } from '@apollo/client';
import {
  CAPTCHA_CREATE_CHALLENGE,
  CAPTCHA_REQUEST_AUTH_CODE,
  USER_LOGIN,
  ME_QUERY,
  GET_LN_INVOICE,
  ON_CHAIN_CREATE_ADDRESS,
} from './queries';

export const useCaptchaCreateChallenge = () =>
  useMutation(CAPTCHA_CREATE_CHALLENGE);

export const useCaptchaRequestAuthCode = () =>
  useMutation(CAPTCHA_REQUEST_AUTH_CODE);

export const useUserLogin = () => useMutation(USER_LOGIN);

export const useMeQuery = () => useQuery(ME_QUERY);

export const useCreateLNInvoice = () => useMutation(GET_LN_INVOICE);

export const useCreateOnChainAddress = () => useMutation(ON_CHAIN_CREATE_ADDRESS);
