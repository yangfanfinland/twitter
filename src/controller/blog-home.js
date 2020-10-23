/**
 * @description Main page controller
 * @author Fan Yang
 */

const { createBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { getUserInfo } = require('../services/user')

/**
 * Create blog
 * @param {Object} param0 Data to create blog { userId, content, image }
 */
async function create({ userId, content, image }) {
  // Analyse and collect @user inside content

  try {
    const blog = await createBlog({
      userId,
      content,
      image,
    })
    return new SuccessModel(blog)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create,
}
