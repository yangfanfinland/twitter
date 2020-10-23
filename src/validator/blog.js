/**
 * @description Blog data formate validation
 * @author Fan Yang
 */

const validate = require('./_validate')

// Validate rules
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
    },
    image: {
      type: 'string',
      maxLength: 255,
    },
  },
}

/**
 * Validate blog data formate
 * @param {Object} data Blog data
 */
function blogValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = blogValidate
