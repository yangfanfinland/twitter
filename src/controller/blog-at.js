/**
 * @description Blog @ relationship controller
 * @author Fan Yang
 */

const {
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation,
} = require('../services/at-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constant')

/**
 * Get @ me blog amount
 * @param {number} userId userId
 */
async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId)
  return new SuccessModel({
    count,
  })
}

/**
 * Get @ user blog list
 * @param {number} userId user id
 * @param {number} pageIndex page index
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  const result = await getAtUserBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE,
  })
  const { count, blogList } = result

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count,
  })
}

/**
 * Mark as read
 * @param {number} userId userId
 */
async function markAsRead(userId) {
  try {
    await updateAtRelation({ newIsRead: true }, { userId, isRead: false })
  } catch (ex) {
    console.error(ex)
  }

  // No need return SuccessModel or ErrorModel
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead,
}
