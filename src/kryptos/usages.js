import {
  RSASSA_PKCS1_V1_5_2048,
  ECDSA_P521,
  RSA_OAEP_2048,
  ECDH_P521,
} from './algorithms.js'

export const DERIVE = ['deriveBits', 'deriveKey']
export const WRAP = ['wrapKey', 'unwrapKey']
export const ENCRYPT = ['encrypt', 'decrypt']
export const SIGN = ['sign', 'verify']
export const VERIFY_ONLY = ['verify']
export const ENCRYPT_ONLY = ['encrypt']
export const WRAP_ONLY = ['wrapKey']
export const SIGN_ONLY = ['sign']
export const DECRYPT_UNWRAP = ['decrypt', 'unwrapKey']
export const ENCRYPT_WRAP = ['encrypt', 'wrapKey']

export function getUsage(algorithm) {
  switch (algorithm) {
    case ECDSA_P521:
    case RSASSA_PKCS1_V1_5_2048:
      return SIGN_ONLY
    case RSA_OAEP_2048:
      return DECRYPT_UNWRAP
    case ECDH_P521:
      return DERIVE
    case 'BIP39':
      return null
    default:
      break
  }
  throw new Error('Invalid algorithm usage.')
}
