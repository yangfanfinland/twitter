/**
 * @description User service
 * @author Fan Yang
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
const { addFollowing } = require('./user-relation')

/**
 * Get user info
 * @param {string} userName
 * @param {string} password
 */
async function getUserInfo(userName, password) {
  const whereOpt = {
    userName,
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }

  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt,
  })
  if (result == null) {
    return result
  }

  return formatUser(result.dataValues)
}

/**
 * Create user
 * @param {string} userName Username
 * @param {string} password User password
 * @param {number} gender Gender
 * @param {string} nickName Nickname
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName,
    gender,
  })
  const data = result.dataValues

  // Follow self (In order to get home page data)
  addFollowing(data.id, data.id)

  return data
}

/**
 * Delete user
 * @param {string} userName Username
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName,
    },
  })
  return result > 0
}

/**
 * Update user info
 * @param {Object} param0 Content to be updated { newPassword, newNickName, newPicture, newCity }
 * @param {Object} param1 Query conditions { userName, password }
 */
async function updateUser({ newPassword, newNickName, newPicture, newCity }, { userName, password }) {
  const updateData = {}
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newNickName) {
    updateData.nickName = newNickName
  }
  if (newPicture) {
    updateData.picture = newPicture
  }
  if (newCity) {
    updateData.city = newCity
  }

  const whereData = {
    userName,
  }
  if (password) {
    whereData.password = password
  }

  const result = await User.update(updateData, {
    where: whereData,
  })
  return result[0] > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
}
