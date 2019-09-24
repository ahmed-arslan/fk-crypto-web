import { kryptos } from '../kryptos'
import * as utils from '../utils'
import * as algorithms from '../algorithms'
import * as formats from '../formats'
import * as usage from '../usages'
import { NONEXTRACTABLE } from '../constants'

export function signData(arrayBuffer, privateKey) {
  if (!privateKey) {
    throw new Error('Missing crypto key.')
  }
  if (!(privateKey instanceof CryptoKey)) {
    throw new Error('Invalid crypto key.')
  }

  return kryptos.subtle.sign(
    algorithms.getSignAlgorithm(privateKey.algorithm.name),
    privateKey,
    new Uint8Array(arrayBuffer),
  )
}

export async function signIt(plainText, privateKey) {
  try {
    const data = utils.stringToArrayBuffer(JSON.stringify(plainText))
    const signature = await signData(data, privateKey)
    return utils.arrayBufferToBase64(signature)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

export function importHmacKey(raw) {
  return kryptos.subtle.importKey(
    formats.RAW,
    raw,
    algorithms.HMAC_ALGO,
    NONEXTRACTABLE,
    usage.SIGN,
  )
}

export async function hmacSignIt(plainText, rawKey) {
  try {
    const data = utils.stringToArrayBuffer(plainText)
    const signKey = await importHmacKey(utils.stringToArrayBuffer(rawKey))
    const signature = await signData(data, signKey)
    return utils.arrayBufferToBase64(signature)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
