// pages/results/results.js
var app = getApp();
Page({
  data: {
    score: null, // 分数
    wrongList: [], // 错误的题数-乱序
    wrongListSort: [],  // 错误的题数-正序
    chooseValue: [], // 选择的答案
    modalShow: false,
    score_1: 0,
    score_2: 0,
    testId: ''
  },
  onLoad: function (options) {
    console.log(options);
    //回调home onload
    var pages = getCurrentPages();
    console.log(pages)
    var beforePage = pages[pages.length - 3];
    beforePage.getdata()
    wx.setNavigationBarTitle({ title: options.type }) // 动态设置导航条标题
    
    let wrongList = JSON.parse(options.wrongList);
    let wrongListSort = JSON.parse(options.wrongListSort);
    let chooseValue = JSON.parse(options.chooseValue);
    let score1 = app.globalData.score_1
    let score2 = app.globalData.score_2
    if(options.testId == "square"){
      score1 = options.score
    }else{
      score2 = options.score
    }
    this.setData({
      score: options.score != ""?options.score:"无",
      wrongList: wrongList,
      testId: options.testId,
      wrongListSort: wrongListSort,
      chooseValue: chooseValue,
      questionList: app.globalData.questionList['race'],  // 拿到答题数据
      score_1: app.globalData.score_1,
      score_2: app.globalData.score_2,
    })
    console.log(this.data.chooseValue);
  },
  // 查看错题
  toView: function(){
    this.setData({
      modalShow: true
    })
  },
  toIndex: function(){
    wx.reLaunch({
      url: '../home/home'
    })
  },
  toRank: function(){
    wx.reLaunch({
      url: '../rank/rank'
    })
  }
})