// pages/results/results.js
var app = getApp();
Page({
  data: {
    totalScore: null, // 分数
    wrongList: [], // 错误的题数-乱序
    wrongListSort: [],  // 错误的题数-正序
    chooseValue: [], // 选择的答案
    remark: ["好极了！获得碎片 x 1","哎哟不错哦","别灰心，继续努力哦！"], // 评语
    modalShow: false
  },
  onLoad: function (options) {
    console.log(options);
    if(options.totalScore == 100){
      wx.request({
        url: 'https://wx.link-studio.cn:4433/frag',
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'chartset': 'utf-8'
        },
        data:{
            stuid: app.globalData.stuid,
            name: app.globalData.name,
            part: options.testId
        },
        success: function(res) {
          let mes = res.data
          console.log(mes)
        }
      })
    }
    //回调home onload
    var pages = getCurrentPages();
    console.log(pages)
    var beforePage = pages[pages.length - 3];
    beforePage.getdata()
    wx.setNavigationBarTitle({ title: options.testId }) // 动态设置导航条标题
    
    let wrongList = JSON.parse(options.wrongList);
    let wrongListSort = JSON.parse(options.wrongListSort);
    let chooseValue = JSON.parse(options.chooseValue);
    this.setData({
      totalScore: options.totalScore != ""?options.totalScore:"无",
      wrongList: wrongList,
      wrongListSort: wrongListSort,
      chooseValue: chooseValue,
      questionList: app.globalData.questionList[options.testId],  // 拿到答题数据
      testId: options.testId  // 课程ID
    })
    console.log(this.data.chooseValue);
  },
  // 查看错题
  toView: function(){
    // 显示弹窗
    this.setData({
      modalShow: true
    })
  },
  // 返回首页
  toIndex: function(){
    wx.reLaunch({
      url: '../home/home'
    })
  }
})