// pages/content/content.js
Page({
  data: {
    news_content: [],
    title:"",
    source:"",
    date:"",
    readCount:"",
    firstImage:"",
  },
  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //跳转到此页后,设置导航栏颜色,并根据id参数调用获取具体新闻函数
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#87CEFA',
    })
    console.log(options)
    this.ShowReadNews(options)
  },
  //通过API获取具体新闻
  ShowReadNews(options){
    this.setData({
      id: options.id
    })
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id,
      },
      success: res => {
        let result = res.data.result
        console.log(result)
        let news_content = []
        for (let i = 0; i < result.content.length; i += 1) {
          news_content.push({
            type: result.content[i].type,
            src: result.content[i].src,
            text: result.content[i].text,
          })
        }
        this.setData({
          news_content: news_content,
          title: result.title,
          source: result.source,
          date: result.date.substr(11, 5),
          readCount: "阅读" + result.readCount,
          firstImage: result.firstImage
        })
      }
    })
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