/**
 * @description User controller
 * @author Fan Yang
 */

const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 * Username exists
 * @param {string} userName
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * User register
 * @param {string} userName Username
 * @param {string} password User password
 * @param {number} gender Gender（1 Man，2 Woman，3 Secret）
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // Username exits
    return new ErrorModel(registerUserNameExistInfo)
  }

  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender,
    })
    return new SuccessModel()
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * User login
 * @param {Object} ctx koa2 ctx
 * @param {string} userName Username
 * @param {string} password User pasword
 */
async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    return new ErrorModel(loginFailInfo)
  }

  // Save user info into session once login success
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 * Delete user
 * @param {string} userName Username
 */
async function deleteCurUser(userName) {
  const result = await deleteUser(userName)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteUserFailInfo)
}

/**
 * Modify personal information
 * @param {Object} ctx ctx
 * @param {string} nickName
 * @param {string} city
 * @param {string} picture
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }

  const result = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture,
    },
    { userName }
  )
  if (result) {
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture,
    })
    return new SuccessModel()
  }
  return new ErrorModel(changeInfoFailInfo)
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo
}
