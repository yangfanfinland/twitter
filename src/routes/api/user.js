/**
 * @description User API router
 * @author Fan Yang
 */

const router = require('koa-router')()
const {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout,
} = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')

router.prefix('/api/user')

// Check user exist
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// User register
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({
    userName,
    password,
    gender,
  })
})

// User login
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

// Delete user
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    // Under test env, tester ONLY possible to delete self with logged in.
    const { userName } = ctx.session.userInfo
    ctx.body = await deleteCurUser(userName)
  }
})

// Delete user by userName
router.post('/delete/:userName', loginCheck, async (ctx, next) => {
  let { userName } = ctx.params
  ctx.body = await deleteCurUser(userName)
})

// Modify personal info
router.patch(
  '/changeInfo',
  loginCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeInfo(ctx, { nickName, city, picture })
  }
)

// Modify password
router.patch(
  '/changePassword',
  loginCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo
    ctx.body = await changePassword(userName, password, newPassword)
  }
)

// Logout
router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx)
})

module.exports = router
