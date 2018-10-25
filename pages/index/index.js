//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    current_type:'',
    news_type: ["gn", "gj", "cj", "yl", "js", "ty","other"],
    news_list:[],
    titleFontWeightMap : {
      'gn': 'bold',
      'gj': '',
      'cj': '',
      'yl': '',
      'js': '',
      'ty': '',
      'other': '',
    },
    titleFontOpacityMap: {
      'gn': 1,
      'gj': 0.8,
      'cj': 0.8,
      'yl': 0.8,
      'js': 0.8,
      'ty': 0.8,
      'other': 0.8,
    },
  },
  //启动小程序后，设置导航栏颜色并获取新闻列表
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#87CEFA',
    })
    this.onTapListNews()
  },
  //下拉刷新动作执行刷新当前新闻类型的列表
  onPullDownRefresh(event) {
    this.getListNews(event, () => {
      wx.stopPullDownRefresh()
    })
  },
  //选中一种新闻类型后,此类型标题加亮,其他标题取消加亮
  setTitleFont(event){
    let news_type = this.data.news_type
    let titleFontWeightMap = this.data.titleFontWeightMap
    let titleFontOpacityMap = this.data.titleFontOpacityMap
    let id = 'gn'
    if (event){
      id=event.target.id
    }
    for (let i = 0; i < news_type.length; i += 1){
      if (news_type[i] == id) {
        titleFontWeightMap[news_type[i]]='bold'
        titleFontOpacityMap[news_type[i]]=1
      } else {
        titleFontWeightMap[news_type[i]]=''
        titleFontOpacityMap[news_type[i]]=0.8
      }
    }
    this.setData({
      titleFontWeightMap: titleFontWeightMap,
      titleFontOpacityMap: titleFontOpacityMap
    })
  },
  //点击新闻类型后的动作,加亮标题并执行下拉刷新,列出新闻列表
  onTapListNews(event, callback){
    console.log(event)
    this.setTitleFont(event)
    this.onPullDownRefresh(event)
  },
  //列出新闻列表
  getListNews(event, callback){
    let type = "gn"
    if (event) {
      type = event.target.id
    } else if (this.data.current_type){
      type = this.data.current_type
    }
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: type
      },
      success: res => {
        let result = res.data.result
        console.log(result)
        let news_list = []
        for (let i = 0; i < result.length; i += 1) {
          news_list.push({
            sn: i,
            id: result[i].id,
            title: result[i].title,
            date: result[i].date.substr(11, 5),
            source: result[i].source,
            firstImage: result[i].firstImage
          })
        }
        this.setData({
          news_list: news_list,
          current_type: type
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  //点击一个新闻项后,跳转到第二页详细新闻
  onTapReadNews(event){
    console.log(event)
    wx.navigateTo({
      url: '/pages/content/content?id=' + event.currentTarget.id,
    })
  }
})
