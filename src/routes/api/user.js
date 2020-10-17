/**
 * @description User API router
 * @author Fan Yang
 */

const router = require('koa-router')()
const { isExist, register, login } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')

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


module.exports = router
