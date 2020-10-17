/**
 * @description Response data model
 * @author Fan Yang
 */

/**
 * Base model
 */
class BaseModel {
  constructor({ errno, data, message }) {
    this.errno = errno
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

/**
 * Success model
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errno: 0,
      data,
    })
  }
}

/**
 * Failed model
 */
class ErrorModel extends BaseModel {
  constructor({ errno, message }) {
    super({
      errno,
      message,
    })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
}
