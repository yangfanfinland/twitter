/**
 * @description Blog @ relationship controller
 * @author Fan Yang
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getAtMeBlogList } = require('../../controller/blog-at')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/atMe')

// Load more
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const { id: userId } = ctx.session.userInfo
  const result = await getAtMeBlogList(userId, pageIndex)

  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router
