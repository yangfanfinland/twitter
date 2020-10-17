/**
 * @description User view router
 * @author Fan Yang
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})

router.get('/setting', loginRedirect, async (ctx, next) => {
  await ctx.render('setting', ctx.session.userInfo)
})

/**
 * Get login info
 * @param {Object} ctx ctx
 */
function getLoginInfo(ctx) {
  let data = {
    isLogin: false, // Default not login
  }

  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName,
    }
  }
  return data
}

module.exports = router
