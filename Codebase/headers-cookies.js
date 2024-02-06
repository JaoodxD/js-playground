const headers = new Headers()
headers.append('Set-Cookie', 'key=value')
headers.append('Set-Cookie', 'key2=value2')



for (const [key, value] of headers) {
  console.log(key, value)
}

console.log(headers.getSetCookie())
