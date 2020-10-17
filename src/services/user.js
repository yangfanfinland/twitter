/**
 * @description User service
 * @author Fan Yang
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

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

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
}
