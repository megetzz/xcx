// pages/login/login.js
const cookieUtil = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getCookie: function () {
    wx.request({
      url: 'http://127.0.0.1:8000/api/v1.0/apps/testcookie/',
      success: function (res) {
        var cookie = cookieUtil.getSessionIDFromResponse(res)
        console.log(cookie)
        // 保存cookie
        cookieUtil.setCookieToStorage(cookie)
      }
    })
  },
  sendCookie: function () {
    var newcookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = newcookie
    wx.request({
      url: 'http://127.0.0.1:8000/api/v1.0/apps/testcookie2/',
      header: header,
      success: function (res) {
        console.log(res)
        console.log('赶快去后台看看')
      }
    })
  },

  authorize: function () {
    console.log(app.globalData.userInfo)
    wx.login({
      success: function (res) {

        // res.code
        wx.request({
          url: 'http://127.0.0.1:8000/api/v1.0/apps/authorize/',
          method: 'POST',
          data: {
            code: res.code,
            nickName: app.globalData.userInfo.nickName
          },
          success: function (res) {
            wx.showToast({
              title: '认证成功',
            })
            // 获取返回来的session
            var cookie = cookieUtil.getSessionIDFromResponse(res)
            console.log(cookie)
            cookieUtil.setCookieToStorage(cookie)
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})