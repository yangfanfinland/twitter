/**
 * @description Blog view router
 * @author Fan Yang
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

// Main page
router.get('/', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { id: userId } = userInfo

  await ctx.render('index', {
    userData: {
      userInfo,
      fansData: {
        count: 0,
        list: [],
      },
      followersData: {
        count: 0,
        list: [],
      },
      atCount: 0,
    },
    blogData: {
      isEmpty: true,
      blogList: [],
      pageSize: 10,
      pageIndex: 0,
      count: 0,
    },
  })
})

module.exports = router
