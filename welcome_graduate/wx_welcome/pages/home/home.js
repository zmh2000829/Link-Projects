var app = getApp();

Page({
  data: {
    score_1: app.globalData.score_1,
    score_2: app.globalData.score_2,
    modalHidden: true,
    buttonClicked: false
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {}
    return {
      path: 'pages/index/index'
    }
  },
  getdata: function(){
    let that = this
    wx.request({
      url: 'https://wx.link-studio.cn:8888/get_score',
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
        console.log(mes)
        let s = mes['score_1']
        let f = mes['score_2'] 
        that.setData({
          score_1: s,
          score_2: f
        })
        app.globalData.score_1 = s
        app.globalData.score_2 = f
        console.log(app.globalData.score_1)
      }
    })
  },
  onLoad: function (options) {
    this.getdata()
    var pages = getCurrentPages();
    console.log(pages)
  },
  buttonTap: function() {
    this.setData({
      modalHidden: false
    })
  },
  modalCandel: function() {
    // do something
    this.setData({
      modalHidden: true
    })
  },
  modalConfirm: function() {
    // do something
    this.setData({
      modalHidden: true
    })
  },
  toTestPage: function(){
    this.buttonClicked()
    wx.navigateTo({
      url: '../test/test'
    })
  },
  toTestPage2: function(){
    this.buttonClicked()
    wx.navigateTo({
      url: '../test2/test2'
    })
  },
  torankpage: function(e){
    this.buttonClicked()
    wx.navigateTo({
      url: '../rank/rank'
    })
  },
  buttonClicked() {
    this.setData({
      buttonClicked: true
    })
    let that = this
    setTimeout(function () {
      that.setData({
        buttonClicked: false
      })
    }, 500)
  }
})