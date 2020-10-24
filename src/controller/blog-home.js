/**
 * @description Main page controller
 * @author Fan Yang
 */

const xss = require('xss')
const { createBlog, getFollowingBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/at-relation')

/**
 * Create blog
 * @param {Object} param0 Data to create blog { userId, content, image }
 */
async function create({ userId, content, image }) {
  // Analyse and collect @user inside content
  // content Formate as 'Hello @Elaine.yinran - tong Hi @Martin Holm - martin '
  const atUserNameList = []
  content = content.replace(REG_FOR_AT_WHO, (matchStr, nickName, userName) => {
    atUserNameList.push(userName)
    return matchStr
  })

  // Get user info base on @ user
  const atUserList = await Promise.all(
    atUserNameList.map((userName) => getUserInfo(userName))
  )

  const atUserIdList = atUserList.map((user) => user.id)

  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image,
    })

    // Create @ relationship
    await Promise.all(
      atUserIdList.map((userId) => createAtRelation(blog.id, userId))
    )

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
  const result = await getFollowingBlogList({
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
  getHomeBlogList,
}
