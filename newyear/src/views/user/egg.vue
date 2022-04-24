<template>
<div id="content">
  <div id="Home">
    <!-- 16:9背景位置 -->
    <div id="background">
      <img src="../../../server/public/static/1st/egg.jpg" style="width:100%">
    </div>
    <div id="name" >
      <input type="text" name="name" id="n" required="required">
    </div>
    <div id="stuid" align="center">
      <input type="text" name="stuid" id="s" required="required">
    </div>
    <div id="num" align="center">
      <input type="text" name="phone" id="p" required="required">
    </div>
    <div id="but">
      <img id="sub" src="../../assets/png/but.png" @click="submit">
    </div>

  </div>
</div>

</template>

<script>
import Base from "@/api/Base.js"

export default {
  data () {
    return {
        name: '',
        stuid: '',
        phone: '',
        type: 1,
        seed: 0,
    }
  },
  mounted() {
    this.getWd()
    this.type = this.$route.params.type 
    if(this.type!=1 && this.type!=2){
      this.$router.push({name:'home'});
    }
  },
  methods:{
    getWd(){
      var sen = "Home";
      var width = document.body.clientWidth;
      var height = document.body.clientHeight;
      var ratio = width / height;
      if (ratio < (9 / 16)) {
        var bodywidth = height * 9 / 16;
        var margin = (width - bodywidth) / 2;
        document.getElementById(sen).style.height= height + 'px';
        document.getElementById(sen).style.width= bodywidth + 'px';
        document.getElementById(sen).style.marginLeft= margin + 'px';
        document.getElementById(sen).style.marginRight= margin + 'px';
      }else if(ratio > (9 / 16)){
        var bodyheight = width * 16 / 9;
        var margin = 0;
        document.getElementById(sen).style.height = bodyheight + 'px';
        document.getElementById(sen).style.width = width + 'px';
        document.getElementById(sen).style.marginTop = margin + 'px';
        document.getElementById(sen).style.marginBottom = margin + 'px';
      }else{
        document.getElementById(sen).style.height = height + 'px';
        document.getElementById(sen).style.width = width + 'px';
        document.getElementById(sen).style.marginTop = 0 + 'px';
        document.getElementById(sen).style.marginBottom = 0 + 'px';
      }
    },
    async submit(){
      this.name = document.getElementById("n").value;
      this.stuid = document.getElementById("s").value;
      this.phone = document.getElementById("p").value;
      console.log(this.name)
      let form = {
          name:this.name,
          studentID:this.stuid,
          phoneNumber:this.phone,
          giftType:this.type
      }
      if(this.name == ''||this.stuid == ''||this.phone == ''){
        alert("请填写完整信息~")
      } else{
        let res = await Base.addWinner(form)
        if(res.code === 200) {
          alert("信息登记成功，注意查收领奖消息")
          this.$router.push({name:'start'});
        }
        else{
          alert("该学号已存在！")
        }
      }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #Home{
    font-family:"宋体";
    font-size: 20px;
    position:absolute;
    font-weight:bold;
  }
  #content{
    background: url("../../assets/png/back.png") no-repeat center;
    background-size:100% 100%;
    height: 100%;
    width:100%;
  }
  #background{
    position: absolute;
    width: 100%;
    height:100%;
    right: 0%;
    left:0%;
    top:0%;
    z-index: 1;
  }
  #name{
    left: 50%;
    transform: translateX(-50%);
    margin: 0 auto;
    position: absolute;
    top:45.6%;
    z-index: 3;
  }
  #stuid{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top:57.9%;
    z-index: 3;
  }
  #num{
    position: absolute;
        left: 50%;
    transform: translateX(-50%);
    top:70.32%;
    z-index: 3;
  }
  #sub{
    position:absolute;
    width:25%;
    top:80%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 4;
  }
  #sub:active{
    opacity: 0.8;
  }      
  input {
    font-family:"微软雅黑";
    font-size: 16px;
    text-align: center;
    border: auto;
    caret-color:#585858;
    border-color: #04B4AE;
    width: 101.6%;
    height: 30px;
    outline: none;
    border-radius: 1px;
    margin:auto;
    background-color: transparent;
  }
</style>//#088A85