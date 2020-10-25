/**
 * @description Home page test
 * @author Fan Yang
 */

const server = require('../server')

// User info
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1,
}

// Save blog id
let BLOG_ID = ''
// Save cookie
let COOKIE = ''
// Save user id
let USER_ID = ''

// User register
test('Register user success', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errno).toBe(0)
})

// User exist
test('User exist after registered success', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })
  expect(res.body.errno).toBe(0)

  USER_ID = res.body.data.id
})

// User login
test('User login success', async () => {
  const res = await server.post('/api/user/login').send({
    userName,
    password,
  })
  expect(res.body.errno).toBe(0)

  // Get cookie
  COOKIE = res.headers['set-cookie'].join(';')
})

// Create blog
test('Create blog success', async () => {
  const content = 'Unit test created blog_' + Date.now()
  const image = '/xxx.png'
  const id = USER_ID

  const res = await server
    .post('/api/blog/create')
    .send({
      content,
      image,
      id,
    })
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)

  BLOG_ID = res.body.data.id
})

// Load first page blog list
test('Home page, load first page blog list', async () => {
  const res = await server.get(`/api/blog/loadMore/0`).set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})

// Delete user
test('Delete user success', async () => {
  const res = await server.post('/api/user/delete').set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// Logout
test('Logout success', async () => {
  const res = await server.post('/api/user/logout').set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// User not exist
test('User not exist after deleted success', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })
  expect(res.body.errno).not.toBe(0)
})
