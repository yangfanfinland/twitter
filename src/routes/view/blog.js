/**
 * @description Blog view router
 * @author Fan Yang
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { isExist } = require('../../controller/user')
const { getFans, getFollowers } = require('../../controller/user-relation')

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

// My space
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

// User space
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName

  let curUserInfo
  const { userName: curUserName } = ctx.params
  const isMe = myUserName === curUserName
  if (isMe) {
    curUserInfo = myUserInfo
  } else {
    const existResult = await isExist(curUserName)
    if (existResult.errno !== 0) {
      return
    }
    curUserInfo = existResult.data
  }

  // Get first page blog list
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  // Get fans
  const fansResult = await getFans(curUserInfo.id)
  const { count: fansCount, fansList } = fansResult.data

  // Get following list
  const followersResult = await getFollowers(curUserInfo.id)
  const { count: followersCount, followersList } = followersResult.data

  // Whether I followed current user or not
  const amIFollowed = fansList.some((item) => {
    return item.userName === myUserName
  })

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: {
        count: fansCount,
        list: fansList,
      },
      followersData: {
        count: followersCount,
        list: followersList,
      },
      amIFollowed,
      atCount: 0,
    },
  })
})

// Square
router.get('/square', loginRedirect, async (ctx, next) => {
  // Get first page blog list
  const result = await getSquareBlogList(0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
  })
})

module.exports = router
