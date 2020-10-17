/**
 * @description json schema validate
 * @author Fan Yang
 */

const Ajv = require('ajv')
const ajv = new Ajv({
  // allErrors: true // Output all error（slow）
})

/**
 * json schema validate
 * @param {Object} schema json schema rules
 * @param {Object} data data to be validated
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate
