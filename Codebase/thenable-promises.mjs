import startCounter from 'count-promises'
import {fetch, request} from 'undici'

const stop = startCounter()

const res = await request('http://example.com')
const text = await res.body.text()

const total = stop()
console.log(total, 'promises have been created since `startCounter()`')
