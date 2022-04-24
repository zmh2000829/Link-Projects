
Page({
  data: {

  },
  onLoad: function (options) {

  },
  tohomePage: function(e){
    let testId = e.currentTarget.dataset['testid'];
    wx.redirectTo({
      url: '../home/home'
    })
  }
})