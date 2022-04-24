import { radar } from '../../components/radar/radar'
var app = getApp();

Page({
  radar,
  data: {
    frag_num: app.globalData.frag_num,
    score_total: app.globalData.score_total,
    ranking: 0,
    nums: 0,
    part: [],
  },
  onLoad: function (options) {
    let that = this
      wx.request({
        url: 'https://wx.link-studio.cn:4433/rank',
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
          let num = mes['count']
          let rank = mes['rank']
          let grade = mes['score_total']
          let Part = [mes['Part_1']/5,mes['Part_2']/5,mes['Part_3']/5,mes['Part_4']/5]
          console.log(Part)
          that.setData({
              ranking: rank,
              score_total: grade,
              nums: num,
              part: Part
          })
          console.log(mes)
        }
      })
      console.log('onLoad')
      console.log(this.data.part)
      setTimeout(function (){
        that.radar.draw(that.data.part)
      }, 500)
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