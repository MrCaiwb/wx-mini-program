Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [] // 图片数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  choose () {
    let that = this
    wx.chooseImage({
      success: chooseResult => {
        for (let i = 0; i < chooseResult.tempFilePaths.length; i++) {
          that.setData({ imageList: that.data.imageList.concat(chooseResult.tempFilePaths[i]) })
          wx.cloud.uploadFile({
            cloudPath: `${new Date().getTime()}.png`,
            filePath: chooseResult.tempFilePaths[i],
            success: res => {
              console.log('上传成功', res)
            },
          })
        }
      },
    })
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