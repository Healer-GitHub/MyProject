// // pages/menu4/index.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAllSelect: false,
    totalMoney: 0,
    carts: [{
      imgSrc: 'https://bkimg.cdn.bcebos.com/pic/caef76094b36acaf857b1ff373d98d1001e99c22?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2U4MA==,xp_5,yp_5',
      title: "Microsoft Surface Pro 7",
      desc: '酷睿i5/8GB/128GB/亮铂金',
      price: 6988,
      isSelect: false,
      count: {
        quantity: 2,
        min: 1,
        max: 20
      }
    }, {
        imgSrc: 'https://bkimg.cdn.bcebos.com/pic/e61190ef76c6a7ef630e4d71f2faaf51f3de66b9?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxODA=,xp_5,yp_5',
      title: "小米10",
      desc: '12GB+256GB',
      price: 4699,
      isSelect: true,
      count: {
        quantity: 2,
        min: 1,
        max: 20
      }
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTotalPrice()
  },
  // 选择物品函数
  switchSelect: function (e) {
    const index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let carts = this.data.carts; // 获取购物车列表
    let selectNum = 0; //统计选中商品
    const isSelect = carts[index].isSelect; // 获取当前商品的选中状态
    carts[index].isSelect = !isSelect; // 改变状态
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].isSelect) {
        selectNum++
      }
    }
    if (selectNum == carts.length) {
      this.setData({
        isAllSelect: true
      })
    } else {
      this.setData({
        isAllSelect: false
      })
    }
    this.setData({
      carts: carts
    })
    this.getTotalPrice()
  },
  // 商品增加或减少
  quantityChange(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let quantity = carts[index].count.quantity;
    if (e.target.id == 'sub') {
      if (quantity <= 1) return
      quantity -= 1
    } else if (e.target.id == 'add') {
      quantity += 1
    }
    carts[index].count.quantity = quantity
    this.setData({
      carts: carts
    })
    this.getTotalPrice()
  },
  // 计算总价函数
  getTotalPrice() {
    let carts = this.data.carts; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i].isSelect) { // 判断选中才会计算价格
        total += carts[i].count.quantity * carts[i].price; // 所有价格加起来
      }
    }
    this.setData({ // 最后赋值到data中渲染到页面
      carts: carts,
      totalMoney: total.toFixed(2)
    });
  },
  // 商品全选
  selectAll(e) {
    let isAllSelect = this.data.isAllSelect; // 是否全选状态
    isAllSelect = !isAllSelect;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].isSelect = isAllSelect; // 改变所有商品状态
    }
    this.setData({
      isAllSelect: isAllSelect,
      carts: carts
    });
    this.getTotalPrice(); // 重新获取总价
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})