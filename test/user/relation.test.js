/**
 * @description User relationship test
 * @author Fan Yang
 */

const server = require('../server')
const { getFollowers, getFollowing } = require('../../src/controller/user-relation')

// User info
const userName1 = `u1_${Date.now()}`
const password1 = `p1_${Date.now()}`
const testUser1 = {
  userName: userName1,
  password: password1,
  nickName: userName1,
  gender: 1,
}

const userName2 = `u2_${Date.now()}`
const password2 = `p2_${Date.now()}`
const testUser2 = {
  userName: userName2,
  password: password2,
  nickName: userName2,
  gender: 2,
}

// Save cookie
let COOKIE1 = ''
let COOKIE2 = ''
let USER1_ID = ''
let USER2_ID = ''

// User register
test('Register user1 success', async () => {
  const res = await server.post('/api/user/register').send(testUser1)
  expect(res.body.errno).toBe(0)
})
test('Register user2 success', async () => {
  const res = await server.post('/api/user/register').send(testUser2)
  expect(res.body.errno).toBe(0)
})

// User exist
test('User1 exist after registered success', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName: userName1 })
  expect(res.body.errno).toBe(0)

  USER1_ID = res.body.data.id
})
test('User2 exist after registered success', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName: userName2 })
  expect(res.body.errno).toBe(0)

  USER2_ID = res.body.data.id
})

// User login
test('User1 login success', async () => {
  const res = await server.post('/api/user/login').send({
    userName: userName1,
    password: password1,
  })
  expect(res.body.errno).toBe(0)

  // Get cookie
  COOKIE1 = res.headers['set-cookie'].join(';')
})
test('User2 login success', async () => {
  const res = await server.post('/api/user/login').send({
    userName: userName2,
    password: password2,
  })
  expect(res.body.errno).toBe(0)

  // Get cookie
  COOKIE2 = res.headers['set-cookie'].join(';')
})

// User1 unfollow User2 (Avoid User1 already followed User2)
test('User1 unfollow User2 success', async () => {
  const res = await server
    .post('/api/profile/unFollow')
    .send({ userId: USER2_ID })
    .set('cookie', COOKIE1)
  expect(1).toBe(1)
})

// Add follow
test('User1 follow User2 success', async () => {
  const res = await server
    .post('/api/profile/follow')
    .send({ userId: USER2_ID })
    .set('cookie', COOKIE1)
  expect(res.body.errno).toBe(0)
})

// Get followers
test('Get User2 followers, should contains User1', async () => {
  const result = await getFollowers(USER2_ID)
  const { count, followersList } = result.data
  const hasUserName = followersList.some((fanInfo) => {
    return fanInfo.userName === userName1
  })
  expect(count > 0).toBe(true)
  expect(hasUserName).toBe(true)
})

// Get followings
test('Get User1s followings, should cotains User2', async () => {
  const result = await getFollowing(USER1_ID)
  const { count, followingList } = result.data
  const hasUserName = followingList.some((followerInfo) => {
    return followerInfo.userName === userName2
  })
  expect(count > 0).toBe(true)
  expect(hasUserName).toBe(true)
})

// Get at list
test('@ list of User1, should contains User2', async () => {
  const res = await server.get('/api/user/getAtList').set('cookie', COOKIE1)
  const atList = res.body
  const hasUserName = atList.some((item) => {
    // 'Nickname - userName'
    return item.indexOf(`- ${userName2}`) > 0
  })
  expect(hasUserName).toBe(true)
})

// Unfollow
test('User1 unfollow User2 success', async () => {
  const res = await server
    .post('/api/profile/unFollow')
    .send({ userId: USER2_ID })
    .set('cookie', COOKIE1)
  expect(res.body.errno).toBe(0)
})

// Delete user
test('Delete user1 success', async () => {
  const res = await server.post('/api/user/delete').set('cookie', COOKIE1)
  expect(res.body.errno).toBe(0)
})
test('Delete user2 success', async () => {
  const res = await server.post(`/api/user/delete`).set('cookie', COOKIE2)
  expect(res.body.errno).toBe(0)
})

// Logout
test('User1 logout success', async () => {
  const res = await server.post('/api/user/logout').set('cookie', COOKIE1)
  expect(res.body.errno).toBe(0)
})
test('User2 logout success', async () => {
  const res = await server.post('/api/user/logout').set('cookie', COOKIE2)
  expect(res.body.errno).toBe(0)
})

// User not exist
test('User1 not exist after deleted success', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName: userName1 })
  expect(res.body.errno).not.toBe(0)
})
test('User2 not exist after deleted success', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName: userName2 })
  expect(res.body.errno).not.toBe(0)
})
