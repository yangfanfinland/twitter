/**
 * @description Blog @ relationship test
 * @author Fan Yang
 */

const server = require('../server')

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

let BLOG_ID

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

test('User1 create blog, @User2 success', async () => {
  const content = 'Unit test created blog @userName2 - ' + userName2
  const res = await server
    .post('/api/blog/create')
    .send({
      content,
    })
    .set('cookie', COOKIE1)
  expect(res.body.errno).toBe(0)

  BLOG_ID = res.body.data.id
})

test('Get @ list(first page) of User2, should contains blog created above', async () => {
  const res = await server
    .get('/api/atMe/loadMore/0')
    .set('cookie', COOKIE2)
  expect(res.body.errno).toBe(0)
  const data = res.body.data
  const blogList = data.blogList
  const isHaveCurBlog = blogList.some((blog) => blog.id === BLOG_ID)
  expect(isHaveCurBlog).toBe(true)
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
