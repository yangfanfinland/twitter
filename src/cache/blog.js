/**
 * @description Blog cache
 * @author Fan Yang
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// redis key prefix
const KEY_PREFIX = 'weibo:square:'

/**
 * Get square blog list cache
 * @param {number} pageIndex pageIndex
 * @param {number} pageSize pageSize
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

  // Get cache
  const cacheResult = await get(key)
  if (cacheResult != null) {
    return cacheResult
  }

  // No cache, read from DB
  const result = await getBlogListByUser({ pageIndex, pageSize })

  // 1min Set cache, expire 1 min
  set(key, result, 60)

  return result
}

module.exports = {
  getSquareCacheList,
}
