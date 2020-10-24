/**
 * @description Formate data
 * @author Fan Yang
 */

const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require('../conf/constant')
const { timeFormat } = require('../utils/dt')

/**
 * Default User avatar
 * @param {Object} obj User object
 */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * Formate user info
 * @param {Array|Object} list User list or user object
 */
function formatUser(list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    // User list
    return list.map(_formatUserPicture)
  }

  // Signle user object
  return _formatUserPicture(list)
}

/**
 * Formate data datetime
 * @param {Object} obj data
 */
function _formatDBTime(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
  return obj
}

/**
 * Formate blog content
 * @param {Object} obj Blog object
 */
function _formatContent(obj) {
  obj.contentFormat = obj.content

  // Formate @
  // from 'Hi @fan - yangfanfinland Hello'
  // to 'Hi <a href="/profile/fan">yangfanfinland</a> Hello'
  obj.contentFormat = obj.contentFormat.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      return `<a href="/profile/${userName}">@${nickName}</a>`
    }
  )

  return obj
}

/**
 * Formate blog info
 * @param {Array|Object} list Blog list or blog object
 */
function formatBlog(list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    // Blog list
    return list.map(_formatDBTime).map(_formatContent)
  }
  // Single blog object
  let result = list
  result = _formatDBTime(result)
  result = _formatContent(result)
  return result
}

module.exports = {
  formatUser,
  formatBlog,
}