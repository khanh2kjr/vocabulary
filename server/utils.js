const { pickBy, isEmpty } = require('lodash')

const cleanObject = obj => {
  if (typeof obj !== 'object') return obj
  Object.keys(obj).forEach(key => typeof obj[key] === 'string' && obj[key].trim())
  return pickBy(obj, item => {
    switch (true) {
      case typeof item === 'string':
        return !isEmpty(item)
      case item === null || item === undefined:
        return false
      default:
        return true
    }
  })
}

module.exports = {
  cleanObject,
}
