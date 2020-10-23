/**
 * @description Blog service
 * @author Fan Yang
 */

const { Blog, User } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * Create blog
 * @param {Object} param0 Data to create blog { userId, content, image }
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image,
  })
  return result.dataValues
}

module.exports = {
  createBlog,
}
