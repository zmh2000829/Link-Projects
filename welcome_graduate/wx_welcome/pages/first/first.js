const app = getApp();

Page({
  data:{
    stuid: '',
    name: '',
    teststring: '',
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {}
    return {
      path: 'pages/index/index'
    }
  },
  listenerstuidInput: function(e) {
      this.data.stuid = e.detail.value;
  },
  listenernameInput: function(e) {
      this.data.name = e.detail.value;
  },
  tosecondPage: function(e){
      console.log('学工号: ', this.data.stuid);
      console.log('姓名: ', this.data.name);

      const userinfo = app.globalData.userInfo;
      console.log('微信登录信息:'+userinfo)
      
      app.globalData.name = this.data.name;
      app.globalData.stuid = this.data.stuid;
      
    wx.request({
      url: 'https://wx.link-studio.cn:8888/login',
      method: "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      data:{
        stuid: JSON.stringify(this.data.stuid),
        name: JSON.stringify(this.data.name)
      },
      success: function(res) {
        var mes = res.data
        console.log(mes)
        wx.showToast({
          title: mes,//这里打印出登录成功
          icon: 'none',
          duration: 2000
        });
      }
    })
    wx.redirectTo({
      url: '../home/home'
    })
  }
})