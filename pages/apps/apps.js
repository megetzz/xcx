// pages/apps/apps.js
// 得到app的实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: ['应用名1', '应用名2','应用名2']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 调用一个方法获取django后台数据,并且将获取到的内容更新到九宫格
    this.updateMenuData()
  },

  updateMenuData: function() {
    var appnames = this
    // 1.去后台获取数据
    wx.request({
      // url: 'http://127.0.0.1:8000/api/v1.0/apps/',
      url: app.globalData.appurl + app.globalData.appv + app.globalData.routeapp,
      success: function(res) {
        // 2.更新数据 
        console.log('chenggong')
        console.log(res.data)
        appnames.setData({grids:res.data})
      },
      fail: function(res) {
        console.log('失败')
        console.log(res.errMsg)
        // console.log(this.url)
      },

    })
  },
  onNavigatorTap: function (e) {
    console.log(e)
    // 获取点击的 navigator的index
    var index = e.currentTarget.dataset.index
    // wx.showToast({
    //   title: index+'',
    // })
    var item = this.data.grids[index]
    console.log(item)
    // wx.showToast({
    //   title: item.app.name,
    // })
    if (item.app.name == '微信') {
      wx.navigateTo({
        url: '/pages/wx/wx',
      })
    } else if (item.app.name == '支付宝') {

      wx.navigateTo({
        // 只能跳转非  tabbar 界面
        url: '/pages/zfb/zfb',
      })
    } else if (item.app.name == '精品段子') {
      wx.navigateTo({
        url: '/pages/jokes/jokes',
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showToast({
      title: '刷新了',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})