/**
 * @description User relationship controller
 * @author Fan Yang
 */

const {
  getUsersByFollower,
  getFollowersByUser,
  addFollower,
  deleteFollower,
} = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  addFollowerFailInfo,
  deleteFollowerFailInfo,
} = require('../model/ErrorInfo')

/**
 * Get fans list base on user id
 * @param {number} userId
 */
async function getFans(userId) {
  const { count, userList } = await getUsersByFollower(userId)

  return new SuccessModel({
    count,
    fansList: userList,
  })
}

/**
 * Get following list
 * @param {number} userId userId
 */
async function getFollowers(userId) {
  const { count, userList } = await getFollowersByUser(userId)

  return new SuccessModel({
    count,
    followersList: userList,
  })
}

/**
 * Follow
 * @param {number} myUserId Current login user id
 * @param {number} curUserId 要被关注的用户 id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (ex) {
    console.error(ex)
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 * Unfollow
 * @param {number} myUserId Current login user id
 * @param {number} curUserId 要被关注的用户 id
 */
async function unFollow(myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
  getFans,
  getFollowers,
  follow,
  unFollow,
}
