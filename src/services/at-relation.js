/**
 * @description Blog @ user relationship service
 * @author Fan Yang
 */

const { AtRelation, Blog, User } = require('../db/model/index')
const { formatBlog, formatUser } = require('./_format')

/**
 * Create blog @ user relationship
 * @param {number} blogId
 * @param {number} userId
 */
async function createAtRelation(blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId,
  })
  return result.dataValues
}

/**
 * Get @ user's blog amount (NOT read)
 * @param {number} userId userId
 */
async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false,
    },
  })
  return result.count
}

/**
 * Get @ user's blog list
 * @param {Object} param0 Query condition { userId, pageIndex, pageSize = 10 }
 */
async function getAtUserBlogList({ userId, pageIndex, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [['id', 'desc']],
    include: [
      // @ Relationship
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: { userId },
      },
      // User
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
      },
    ],
  })

  // Formate
  let blogList = result.rows.map((row) => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map((blogItem) => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })

  return {
    count: result.count,
    blogList,
  }
}

/**
 * Update AtRelation
 * @param {Object} param0 Update content
 * @param {Object} param1 Query condition
 */
async function updateAtRelation(
  { newIsRead }, // Content to be updated
  { userId, isRead } // Conditions
) {

  const updateData = {}
  if (newIsRead) {
    updateData.isRead = newIsRead
  }

  const whereData = {}
  if (userId) {
    whereData.userId = userId
  }
  if (isRead) {
    whereData.isRead = isRead
  }

  const result = await AtRelation.update(updateData, {
    where: whereData,
  })
  return result[0] > 0
}

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation,
}
