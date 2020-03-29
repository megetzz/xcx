// pages/homepage/homepage.js

const app = getApp()
const cookieUtil = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  onReadCookies: function () {
    console.log('onReadCookies....')
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/auth/test',
      success(res) {
        var cookie = cookieUtil.getSessionIDFromResponse(res)
        console.log(cookie)
      }
    }
    )
  },

  // navigator跳转处理
  onNavigatorTap: function (event) {
    var cookie = cookieUtil.getCookieFromStorage()
    if (cookie.length == 0) {
      wx.showToast({
        title: '尚未授权(没有登录)',
        icon: 'none'
      })
      return
    }

    // 获取由 data-type 标签传递过来的参数
    console.log(event.currentTarget.dataset.type)
    var navigatorType = event.currentTarget.dataset.type

    if (navigatorType == 'focusCity') {
      navigatorType = 'city'
    } else if (navigatorType == 'focusStock') {
      navigatorType = 'stock'
    } else {
      navigatorType = 'constellation'
    }
    // var url = '../picker/picker?type=' + navigatorType + '&abc=123'
    var url = '../picker/picker?type=' + navigatorType + '&abc = 12334'
    wx.navigateTo({
      // url: url,
      url:url
    })
  },

  authorize: function () {
    console.log('authorize')
    var that = this
    // 登陆并获取cookie
    wx.login({
      success: function (res) {
        console.log(res)
        var code = res.code

        var nickName = app.globalData.userInfo.nickName
        // 请求后台
        wx.request({
          url: 'http://127.0.0.1:8000/api/v1.0/apps/authorize/',
          // url: app.globalData.appurl + app.globalData.appv + app.globalData.routeapp+'authorize/',

          method: 'POST',
          data: {
            code: code,
            nickName: nickName
          },

          success(res) {
            wx.showToast({
              title: '授权成功',
            })
            // 保存cookie
            var cookie = cookieUtil.getSessionIDFromResponse(res)
            cookieUtil.setCookieToStorage(cookie)
            console.log(cookie)
          }
        })
      }
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