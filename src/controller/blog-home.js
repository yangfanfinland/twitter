/**
 * @description Main page controller
 * @author Fan Yang
 */

const xss = require('xss')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE } = require('../conf/constant')
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
      content: xss(content),
      image,
    })
    return new SuccessModel(blog)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * Get main page blog list
 * @param {number} userId userId
 * @param {number} pageIndex page index
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowersBlogList({
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

module.exports = {
  create,
  getHomeBlogList
}
