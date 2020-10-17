const { isTest } = require('../src/utils/env')
const server = require('./server')

test('Json interface return correct data formate', async () => {
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title: 'koa2 json'
    })
})