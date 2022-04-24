var app = getApp();

Page({
  data: {
    frag_num: app.globalData.frag_num,
    score_total: app.globalData.score_total,
    modalHidden: true
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
      url: 'https://wx.link-studio.cn:4433/total_score',
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
        let s = mes['total_score']
        let f = mes['frag_num'] 
        that.setData({
          score_total: s,
          frag_num: f
        })
        app.globalData.frag_num = f
        app.globalData.score_total = s
        console.log(app.globalData.score_total)
      }
    })
  },
  check1: function(){
    let num = this.data.frag_num
    if(num == 4 ){
        wx.showToast({
          title: "恭喜您,已集齐4个碎片~",//这里打印出登录成功
          icon: 'none',
          duration: 2000
        });
     }
     else{
        wx.showToast({
          title: "您当前的碎片数量是: " + num,//这里打印出登录成功
          icon: 'none',
          duration: 2000
        });
     }
  },
  check2: function(){
    let score = this.data.score_total
      wx.showToast({
        title: "目前得分: " + score,//这里打印出登录成功
        icon: 'none',
        duration: 2000
      });

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
  get_pic: function(){
    if(this.data.frag_num == 4){    
      wx.showToast({
          title: "碎片收集完毕~准备生成精美图片",//这里打印出登录成功
          icon: 'none',
          duration: 3000,
        });
      this.setData({
        modalHidden: false
      })
    }
    else{
        wx.showToast({
          title: "需要集齐4个碎片哦~",//这里打印出登录成功
          icon: 'none',
          duration: 3000
        });
    }
  },
  toTestPage: function(e){
    let testId = e.currentTarget.dataset['testid'];
    wx.navigateTo({
      url: '../test/test?testId='+testId
    })
  },
  torankpage: function(e){
    wx.navigateTo({
      url: '../rank/rank'
    })
  }
})