var jsonList = require('data/json.js'); 

App({
  onLaunch: function () {
    wx.login({
      success: res => {

      }
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo)
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    frag_num: 0,
    score_total: 0,
    stuid: '',
    name: '',
    userInfo: '',
    questionList: jsonList.questionList
  }
})