/**
 * @description user data formate validate
 * @author Fan Yang
 */

const validate = require('./_validate')

// Validate rule
const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$',
      maxLength: 255,
      minLength: 2,
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    nickName: {
      type: 'string',
      maxLength: 255,
    },
    picture: {
      type: 'string',
      maxLength: 255,
    },
    city: {
      type: 'string',
      maxLength: 255,
      minLength: 2,
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3,
    },
  },
}

/**
 * Validate user data formate
 * @param {Object} data User data
 */
function userValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = userValidate
