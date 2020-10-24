/**
 * @description Blog view router
 * @author Fan Yang
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { isExist } = require('../../controller/user')
const { getFollowers, getFollowing } = require('../../controller/user-relation')
const { getHomeBlogList } = require('../../controller/blog-home')
const {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead,
} = require('../../controller/blog-at')

// Main page
router.get('/', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { id: userId } = userInfo

  // Get first page blog list
  const result = await getHomeBlogList(userId)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  // Get followers
  const followersResult = await getFollowers(userId)
  const { count: followersCount, followersList } = followersResult.data

  // Get following list
  const followingResult = await getFollowing(userId)
  const { count: followingCount, followingList } = followingResult.data

  // Get @ amount
  const atCountResult = await getAtMeCount(userId)
  const { count: atCount } = atCountResult.data

  await ctx.render('index', {
    userData: {
      userInfo,
      followersData: {
        count: followersCount,
        list: followersList,
      },
      followingData: {
        count: followingCount,
        list: followingList,
      },
      atCount,
    },
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
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

  // Get followers
  const followersResult = await getFollowers(curUserInfo.id)
  const { count: followersCount, followersList } = followersResult.data

  // Get following list
  const followingResult = await getFollowing(curUserInfo.id)
  const { count: followingCount, followingList } = followingResult.data

  // Whether I followed current user or not
  const amIFollowed = followersList.some((item) => {
    return item.userName === myUserName
  })

  // Get @ amount
  const atCountResult = await getAtMeCount(myUserInfo.id)
  const { count: atCount } = atCountResult.data

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
      followersData: {
        count: followersCount,
        list: followersList,
      },
      followingData: {
        count: followingCount,
        list: followingList,
      },
      amIFollowed,
      atCount,
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

// atMe router
router.get('/at-me', loginRedirect, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo

  // Get @ amount
  const atCountResult = await getAtMeCount(userId)
  const { count: atCount } = atCountResult.data

  // Get first page blog list
  const result = await getAtMeBlogList(userId)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  await ctx.render('atMe', {
    atCount,
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
  })

  // Mark read
  if (atCount > 0) {
    await markAsRead(userId)
  }
})

module.exports = router
