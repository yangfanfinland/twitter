/**
 * @description Datetime related tools funtions
 * @author Fan Yang
 */

const { format } = require('date-fns')

/**
 * Formate time, like 09.05 23:02
 * @param {string} str Datetime string
 */
function timeFormat(str) {
  return format(new Date(str), 'MM.dd HH:mm')
}

module.exports = {
  timeFormat,
}
