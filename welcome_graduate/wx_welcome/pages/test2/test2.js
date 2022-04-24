var app = getApp();
Page({
  data: {
    index: 0,  // 题目序列
    chooseValue: [], // 选择的答案序列
    score: 0, // 总分
    wrong: 3, // 错误的题目数量
    wrongList: [], // 错误的题目集合-乱序
    wrongListSort: [], // 错误的题目集合-正序
    countDownNum: 60,
    questionList: [],
    type: "竞速赛道",
    wrongChoose: "",
    rightChoode: "",
    testId: "race",
    none:"none"
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: "竞速赛道" })
    this.setData({
      questionList: app.globalData.questionList["race"]
    })
    let count = this.generateArray(0, this.data.questionList.length-1); // 生成题序
    let num = 60;
    this.setData({
      shuffleIndex: this.shuffle(count).slice(0, num) // 生成随机题序并截取num道题
    })
    this.countDown();
  },

  gameover: function () {
      console.log("over")
      let wrongList = JSON.stringify(this.data.wrongList);
      let wrongListSort = JSON.stringify(this.data.wrongListSort);
      let chooseValue = JSON.stringify(this.data.chooseValue);

      wx.request({
        url: 'https://wx.link-studio.cn:8888/score_2',
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'chartset': 'utf-8'
        },
        data:{
          stuid: app.globalData.stuid,
          name: app.globalData.name,
          score: this.data.score
        },
        success: function(res) {
          var mes = res.data
          console.log(mes+'数据库记录成功')
        }
      })

      wx.navigateTo({
        url: '../results/results?score=' + this.data.score + '&testId=' + this.data.testId + '&wrongList=' + wrongList + '&chooseValue=' + chooseValue + '&wrongListSort=' + wrongListSort + '&type=' + this.data.type
      })
      // 设置缓存
      var logs = wx.getStorageSync('logs') || []
      let logsList = { "date": Date.now(), "type": this.data.type, "score": this.data.score }
      logs.unshift(logsList);
      wx.setStorageSync('logs', logs);
    
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
    let that = this;
    wx.showModal({
      title: '提示',
      content: '你真的要退出答题吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          clearInterval(that.data.timer);
          wx.reLaunch({
            url: '../home/home'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    // 判断答案是否正确
    this.chooseError();
  },
  /* 错题处理 */
  chooseError: function(){
    var trueValue = this.data.questionList[this.data.shuffleIndex[this.data.index]]['true'];
    var chooseVal = this.data.chooseValue[this.data.index];
    var temp;
    console.log('选择了' + chooseVal + '答案是' + trueValue);
    if (chooseVal.toString() != trueValue.toString()) {
      console.log('错了');
      
      let wrongnum = this.data.wrong;
      this.setData({
        wrongChoose: chooseVal,
        rightChoode: trueValue,
        wrong: wrongnum-1,
        none:"block"
      })

      temp = setTimeout(()=>{
        console.log('next');
        this.setData({
          none: "none",
          index: this.data.index + 1,
        })
      }, 1000);

      this.data.wrongListSort.push(this.data.index);
      this.data.wrongList.push(this.data.shuffleIndex[this.data.index]);
      if(this.data.wrong <= 0){
        clearInterval(this.data.timer);
        this.gameover();
      } 
    }else{
      this.data.score++;
      clearTimeout(temp);
      this.setData({
        none:"none",
        index: this.data.index + 1,
      })
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