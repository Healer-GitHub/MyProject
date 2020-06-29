//index.js
//获取应用实例
  const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

// Page({
//   data: {
//     array: [{
//       mode: 'scaleToFill',
//       text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
//     }, {
//       mode: 'aspectFit',
//       text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
//     }, {
//       mode: 'aspectFill',
//       text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来'
//     }, {
//       mode: 'top',
//       text: 'top：不缩放图片，只显示图片的顶部区域'
//     }, {
//       mode: 'bottom',
//       text: 'bottom：不缩放图片，只显示图片的底部区域'
//     }, {
//       mode: 'center',
//       text: 'center：不缩放图片，只显示图片的中间区域'
//     }, {
//       mode: 'left',
//       text: 'left：不缩放图片，只显示图片的左边区域'
//     }, {
//       mode: 'right',
//       text: 'right：不缩放图片，只显示图片的右边边区域'
//     }, {
//       mode: 'top left',
//       text: 'top left：不缩放图片，只显示图片的左上边区域'
//     }, {
//       mode: 'top right',
//       text: 'top right：不缩放图片，只显示图片的右上边区域'
//     }, {
//       mode: 'bottom left',
//       text: 'bottom left：不缩放图片，只显示图片的左下边区域'
//     }, {
//       mode: 'bottom right',
//       text: 'bottom right：不缩放图片，只显示图片的右下边区域'
//     }],
//     src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1035415831,1465727770&fm=26&gp=0.jpg'
//   },
//   imageError: function (e) {
//     console.log('image3发生error事件，携带值为', e.detail.errMsg)
//   }
// })