/**
 * @description Blog model test
 * @author Fan Yang
 */

const { Blog } = require('../../src/db/model/index')

test('Blog model properties are valid', () => {
  const blog = Blog.build({
    userId: 1,
    content: 'Blog content',
    image: '/test.png',
  })
  expect(blog.userId).toBe(1)
  expect(blog.content).toBe('Blog content')
  expect(blog.image).toBe('/test.png')
})
