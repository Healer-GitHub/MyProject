// pages/detail/detail.js
Page({

  // data: {
  //   gender: '女',
  //   username: '{{userInfo.nickName}}',
  //   imgUrl: "/images/avatar.jpg"
  // },

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



  changeAvatar: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        this.setData({
          imgUrl: tempFilePaths
        })
      }
    })
  },

  jump: function(e) {
    // 跳转到“个人资料修改页”
    wx.navigateTo({
      // 为了避免用户名中的特殊字符破坏字符串结构，使用encodeURIComponent()编码
      url: '/pages/modify/modify?username=' + encodeURIComponent(this.data.username) + '&gender=' + encodeURIComponent(this.data.gender)
    })
  }
})