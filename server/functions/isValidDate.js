function isValidDate(date) {
  if (!(date instanceof Date) && Object.prototype.toString.call(date) !== "[object Date]") return false
  return !isNaN(date.getTime())
}

module.exports = isValidDate
