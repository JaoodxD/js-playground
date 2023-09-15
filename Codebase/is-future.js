const date = '2023-09-16'

console.log(isFuture(date))


function isFuture(date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const day = 1000 * 60 * 60 * 24
  const nextDay = +today + day

  return (new Date(date) - nextDay) >= 0
}
