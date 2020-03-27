const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const key = 'cookie'
// 从后台获取session(cookie)
// 吧cookie保存到本地
// 从本地读出cookie,以便于携带cookie 到后台
function getSessionIDFromResponse(res) {
  var cookie = res.header['Set-Cookie']
  console.log('getSessionIDFromResponse:' + cookie)
  return cookie
}

function setCookieToStorage(cookie) {
  try {
    wx.setStorageSync(key, cookie)
  } catch (e) {
    console.log(e)
  }

}

function getCookieFromStorage() {
  var value = ws.getStorageSync(key)
  return value
}

module.exports = {
  formatTime: formatTime,
  getSessionIDFromResponse: getSessionIDFromResponse,
  setCookieToStorage: setCookieToStorage,
  getCookieFromStorage: getCookieFromStorage
}