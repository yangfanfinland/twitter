/**
 * @description Encapsulation jquery ajax
 */

;(function (window, $) {
  // add methods under window
  if (window.ajax != null) {
    console.error('window.ajax exist!!!')
    return
  }
  window.ajax = {}

  // get
  window.ajax.get = function (url, callback) {
    ajaxFn('get', url, null, callback)
  }
  // post
  window.ajax.post = function (url, params, callback) {
    if (typeof params === 'function') {
      callback = params
      params = {}
    }
    ajaxFn('post', url, params, callback)
  }
  // patch
  window.ajax.patch = function (url, params, callback) {
    if (typeof params === 'function') {
      callback = params
      params = {}
    }
    ajaxFn('patch', url, params, callback)
  }
  // delete
  window.ajax.delete = function (url, params, callback) {
    if (typeof params === 'function') {
      callback = params
      params = {}
    }
    ajaxFn('delete', url, params, callback)
  }
  // upload files
  window.ajax.upload = function (url, file, callback) {
    var formData = new FormData()
    formData.append('file', file)
    $.ajax({
      type: 'POST',
      url,
      contentType: false,
      processData: false,
      data: formData,
      success: function (res) {
        if (res.errno !== 0) {
          callback(res.message)
          return
        }
        callback(null, res.data)
      },
      error: function (error) {
        callback(error.message)
      },
    })
  }

  // General
  function ajaxFn(method, url, params, callback) {
    $.ajax({
      type: method.toUpperCase(),
      url,
      contentType: 'application/json;charset=UTF-8',
      data: params ? JSON.stringify(params) : '',
      success: function (res) {
        if (res.errno !== 0) {
          callback(res.message)
          return
        }
        callback(null, res.data)
      },
      error: function (error) {
        callback(error.message)
      },
    })
  }
})(window, jQuery)
