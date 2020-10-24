/**
 * @description User relationship controller
 * @author Fan Yang
 */

const {
  getUsersByFollowing,
  getFollowingByUser,
  addFollowing,
  deleteFollowing,
} = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  addFollowerFailInfo,
  deleteFollowerFailInfo,
} = require('../model/ErrorInfo')

/**
 * Get followers list base on user id
 * @param {number} userId
 */
async function getFollowers(userId) {
  const { count, userList } = await getUsersByFollowing(userId)

  return new SuccessModel({
    count,
    followersList: userList,
  })
}

/**
 * Get following list
 * @param {number} userId userId
 */
async function getFollowing(userId) {
  const { count, userList } = await getFollowingByUser(userId)

  return new SuccessModel({
    count,
    followingList: userList,
  })
}

/**
 * Follow
 * @param {number} myUserId Current login user id
 * @param {number} curUserId 要被关注的用户 id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollowing(myUserId, curUserId)
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
  const result = await deleteFollowing(myUserId, curUserId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
  getFollowers,
  getFollowing,
  follow,
  unFollow,
}
