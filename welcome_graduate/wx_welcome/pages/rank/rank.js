import { radar } from '../../components/radar/radar'
var app = getApp();

Page({
  radar,
  data: {
    score_1: app.globalData.score_1,
    score_2: app.globalData.score_2,
    rank_1: [],
    rank_2: [],
    ranking_1: 0,
    ranking_2: 0,
    nums: 0,
    height: 0
  },
  onLoad: function (options) {
    let screenHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: screenHeight - 200,
    });
    let that = this
      wx.request({
        url: 'https://wx.link-studio.cn:8888/select',
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'chartset': 'utf-8'
        },
        data:{
            stuid: app.globalData.stuid,
            name: app.globalData.name,
        },
        success: function(res) {
          let mes = res.data
          let rank_1 = mes['rank1']
          let rank_2 = mes['rank2']
          let ranking_1 = mes['ranking1']
          let ranking_2 = mes['ranking2']
          that.setData({
              //ranking: rank,
              rank_1: rank_1,
              rank_2: rank_2,
              score_1: app.globalData.score_1,
              score_2: app.globalData.score_2,
              ranking_1: ranking_1,
              ranking_2: ranking_2,
          })
          console.log(mes)
        }
      })
      console.log('onLoad')
    ;
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {}
    return {
      path: 'pages/index/index'
    }
  },
  tohomePage: function(e){
    let testId = e.currentTarget.dataset['testid'];
    wx.reLaunch({
      url: '../home/home'
    })
  }
})