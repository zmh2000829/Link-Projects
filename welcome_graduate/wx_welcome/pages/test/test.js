var app = getApp();
Page({
  data: {
    index: 0,  // 题目序列
    chooseValue: [], // 选择的答案序列
    totalScore: 0, // 总分
    wrong: 0, // 错误的题目数量
    wrongList: [], // 错误的题目集合-乱序
    wrongListSort: [], // 错误的题目集合-正序
    questionList: [],
    countDownNum: 30,
    type: "刷题广场",
    testId: "square"
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: "刷题广场" })
    this.setData({
      questionList: app.globalData.questionList["race"]
    })
    console.log(this.data.questionList);
    let count = this.generateArray(0, this.data.questionList.length-1); // 生成题序
    let num = 60;  //每个模块20道题
    this.setData({
      shuffleIndex: this.shuffle(count).slice(0, num) // 生成随机题序并截取num道题
    })
    this.countDown();
  },
  /* 数组乱序/洗牌 */
  shuffle: function (arr) {
    let i = arr.length;
    while (i) {
      let j = Math.floor(Math.random() * i--);
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  },
  /* 单选事件*/
  radioChange: function(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.data.chooseValue[this.data.index] = e.detail.value;
    console.log(this.data.chooseValue);
  },
  /*多选事件*/
  checkboxChange:function(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.data.chooseValue[this.data.index] = e.detail.value.sort();
    console.log(this.data.chooseValue);
  },
  /* 退出答题 按钮*/
  outTest: function(){
    wx.showModal({
      title: '提示',
      content: '你真的要退出答题吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.reLaunch({
            url: '../home/home'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //倒计时
  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;
    that.setData({
      timer: setInterval(function () {
        countDownNum--;
        that.setData({
          countDownNum: countDownNum
        })
        if (countDownNum == 0) {
          console.log("over")
          clearInterval(that.data.timer);
          that.gameover();
        }
      }, 1000)
    })
  },
  /* 下一题/提交 按钮*/
  nextSubmit: function(){
    // 如果没有选择
    if (this.data.chooseValue[this.data.index] == undefined || this.data.chooseValue[this.data.index].length == 0) {  
      wx.showToast({
        title: '请选择至少一个答案!',
        icon: 'none',
        duration: 2000,
        success: function(){
          return;
        }
      })
      return;
    }
    this.chooseError();
    if (this.data.wrong > 0){
      this.gameover()
    }else if (this.data.index < this.data.shuffleIndex.length - 1) {
      clearInterval(this.data.timer);
      this.setData({
        index: this.data.index + 1,
        countDownNum: 10
      })
      this.countDown()
    } else {
      this.gameover()
    }    
  },
  gameover: function() {
    let wrongList = JSON.stringify(this.data.wrongList);
      let wrongListSort = JSON.stringify(this.data.wrongListSort);
      let chooseValue = JSON.stringify(this.data.chooseValue);

      wx.request({
        url: 'https://wx.link-studio.cn:8888/score_1',
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'chartset': 'utf-8'
        },
        data:{
          stuid: app.globalData.stuid,
          name: app.globalData.name,
          score: this.data.totalScore
        },
        success: function(res) {
          var mes = res.data
          console.log(mes+'数据库记录成功')
        }
      })

      wx.navigateTo({
        url: '../results/results?score=' + this.data.totalScore + '&wrongList=' + wrongList + '&testId=' + this.data.testId + '&chooseValue=' + chooseValue + '&wrongListSort=' + wrongListSort + '&type=' + this.data.type
      })

      // 设置缓存
      var logs = wx.getStorageSync('logs') || []
      let logsList = { "date": Date.now(), "type": this.data.type, "score": this.data.totalScore }
      logs.unshift(logsList);
      wx.setStorageSync('logs', logs);
  },
  /* 错题处理 */
  chooseError: function(){
    var trueValue = this.data.questionList[this.data.shuffleIndex[this.data.index]]['true'];
    var chooseVal = this.data.chooseValue[this.data.index];
    console.log('选择了' + chooseVal + '答案是' + trueValue);
    if (chooseVal.toString() != trueValue.toString()) {
      console.log('错了');
      this.data.wrong++;
      this.data.wrongListSort.push(this.data.index);
      this.data.wrongList.push(this.data.shuffleIndex[this.data.index]);
      clearInterval(this.data.timer);

    }else{
      this.data.totalScore++;
    }
  },
  generateArray: function(start, end) {
    return Array.from(new Array(end + 1).keys()).slice(start)
  },
  onUnload: function() {
    //销毁定时器
    console.log("+++++++++onUnload++++++++++")
    clearInterval(this.data.timer);
  },
})