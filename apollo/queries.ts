import { gql } from '@apollo/client';

export const CAPTCHA_CREATE_CHALLENGE = gql`
  mutation CaptchaCreateChallenge {
    captchaCreateChallenge {
      result {
        challengeCode
        failbackMode
        id
        newCaptcha
      }
      errors {
        message
      }
    }
  }
`;

export const CAPTCHA_REQUEST_AUTH_CODE = gql`
  mutation captchaRequestAuthCode($input: CaptchaRequestAuthCodeInput!) {
    captchaRequestAuthCode(input: $input) {
      success
      errors {
        message
      }
    }
  }
`;

export const USER_LOGIN = gql`
  mutation userLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
      errors {
        message
      }
      authToken
    }
  }
`;

export const ME_QUERY = gql`
  query me {
    me {
      defaultAccount {
        wallets {
          id
          walletCurrency
          balance
        }
      }
    }
  }
`;

export const GET_BALANCE_QUERY = gql`
  query me {
    me {
        email {
            address
        }
        username
        defaultAccount {
            id
            wallets {
                id
                walletCurrency
                balance
            }
        }
    }
  }
`;

export const GET_LN_INVOICE = gql`
  mutation lnInvoiceCreateOnBehalfOfRecipient($input: LnInvoiceCreateOnBehalfOfRecipientInput!) {
    lnInvoiceCreateOnBehalfOfRecipient(input: $input) {
      errors {
        message
      }
      invoice {
        paymentRequest
        paymentHash
        paymentSecret
        satoshis
      }
    }
  }
`;