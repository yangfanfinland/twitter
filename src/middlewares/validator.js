/**
 * @description json schema validate middleware
 * @author Fan Yang
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * Generate json schema validate middleware
 * @param {function} validateFn Validate function
 */
function genValidator(validateFn) {
  async function validator(ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      // Validate failed
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    // Validate success, continue
    await next()
  }
  return validator
}

module.exports = {
  genValidator,
}
