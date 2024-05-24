/* eslint-disable no-empty */
import { readFileSync } from 'node:fs'

export default function (path) {
  const text = readFileSync(path, { encoding: 'utf-8' })
  for (let i = 0; i < 1e10; i++) {} // takes ~9 seconds
  return text
}
