/**
 * @description utils controller
 * @author Fan Yang
 */

const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

// Save directory
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// Maximum uploaded file size: 1M
const MIX_SIZE = 1024 * 1024 * 1024

fse.pathExists(DIST_FOLDER_PATH).then((exist) => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * Save file
 * @param {string} name file name
 * @param {string} type file type
 * @param {number} size file size
 * @param {string} filePath file path
 */
async function saveFile({ name, type, size, filePath }) {
  if (size > MIX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  // move file
  const fileName = Date.now() + '.' + name
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  await fse.move(filePath, distFilePath)

  return new SuccessModel({
    url: '/' + fileName,
  })
}

module.exports = {
  saveFile,
}
