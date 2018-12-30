import axios from 'axios'
import ifElse from 'crocks/logic/ifElse'
import isString from 'crocks/predicates/isString'
import { fromPromise, Rejected } from 'crocks/Async'

import { BASE_URL } from './constants/urls'

const instance = axios.create({
  baseURL: BASE_URL,
})

const safeAsyncRequest = httpMethod => predicate => url =>
  ifElse(predicate, fromPromise(httpMethod), Rejected, url)

const getResource = safeAsyncRequest(instance.get)

const http = {
  GET: getResource(isString),
}

export { http }
