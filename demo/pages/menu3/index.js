const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false
  },
  credit: function () {
    wx.request({
      url: 'http://127.0.0.1:3000/credit',
      data: { token: app.globalData.token },
      success: res => {
        console.log(res.data)
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },
  sendUserInfo: function () {
    var token = app.globalData.token
    wx.getUserInfo({
      success: res => {
        wx.request({
          url: 'http://127.0.0.1:3000/userinfo?token=' + token,
          method: 'post',
          data: {
            rawData: res.rawData,
            signature: res.signature,
            encryptedData: res.encryptedData,
            iv: res.iv
          }
        })
      }
    })
  },
  allorders: function(e) {
    // 跳转到订单查询页面 
    // wx.redirectTo({
    //   url: '/pages/order/order',
    // })
    wx.navigateTo({
      url: '/pages/order/list/list',
    })
  },
  info: function() {
    // 保留当前页面，点击页面左上角箭头，返回上一个页面
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  order: function(e) {
    // 跳转到订单查询页面 
    // wx.redirectTo({
    //   url: '/pages/order/order',
    // })
    wx.navigateTo({
      url: '/pages/order1/order',
    })
  },
  address: function() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  contact: function (e) {
    // 调用拨打电话API
    wx.makePhoneCall({
      phoneNumber: '400-321'   // 该电话号码为模拟数据
    })
  }
})