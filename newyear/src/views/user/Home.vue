<template>
<div id="content">
  <div id="Home">
    <!-- 16:9背景位置 -->
    <div id="pic" >
      <img id="image" loading="lazy" alt="长按保存你的新年签" style="width:100%">
    </div>
  </div>
    <div id="myModal" class="modal">
      <span class="close" @click="go_egg">&times;</span>
      <div id = "hh">
        <img class="modal-content" id="img01">
        
        <div id="caption"></div>
      </div>
    </div>
</div>
</template>

<script>
import Base from "@/api/Base.js"
import {Loading} from 'element-ui'
export default {
  data () {
    return {
      arr: [],
      egg: [],
      i: 0,
      rand: 5000,
      currenttime: new Date(),
      lucky_or_not: 0,
      seed: 0,
      //msg: "<br>点击右上角x可跳转领奖界面哦~"
    }
  },
  mounted() {
    this.seed = this.$route.params.seed 
    console.log(this.seed)
    this.getwg("Home");
    //this.getwg("hh"); 
    this.image();
  },
  async created(){
    this.random()
    this.currenttime = new Date().getTime()
    this.rand = Math.floor(Math.random() * 2000) + 2500
    this.getlucky()
  },
  methods:{
    async getlucky () {
      let res = await Base.luckDraw() //接口here
      console.log(res)
      this.lucky_or_not = res.data //测试效果
      sessionStorage.setItem('user', JSON.stringify(this.lucky_or_not))
    },
    getwg(sen){
      var width = document.body.clientWidth;
      var height = document.body.clientHeight;
      var ratio = width / height;
      if (ratio < (9 / 16)) {
        document.body.style.overflow='hidden';
        var bodywidth = height * 9 / 16;
        var margin = (width - bodywidth) / 2;
        document.getElementById(sen).style.height= height + 'px';
        document.getElementById(sen).style.width= bodywidth + 'px';
        document.getElementById(sen).style.marginLeft= margin + 'px';
        document.getElementById(sen).style.marginRight= margin + 'px';
        this.Width = bodywidth*0.9;
        this.Height = height*0.9;
      }else if(ratio > (9 / 16)){
        var bodyheight = width * 16 / 9;
        var margin = 0;
        document.getElementById(sen).style.height = bodyheight + 'px';
        document.getElementById(sen).style.width = width + 'px';
        document.getElementById(sen).style.marginTop = margin + 'px';
        document.getElementById(sen).style.marginBottom = margin + 'px';
        this.Width = width*0.9;
        this.Height = bodyheight*0.9;
      }else{
        document.getElementById(sen).style.height = height + 'px';
        document.getElementById(sen).style.width = width + 'px';
        document.getElementById(sen).style.marginTop = 0 + 'px';
        document.getElementById(sen).style.marginBottom = 0 + 'px';
        this.Width = width*0.9;
        this.Height = height*0.9;
      }
    },
    random(){
      console.log(this.seed)
      this.egg = new Array();
      for(var i = 0;i < 2;i++){
        this.egg[i] = require("../../../server/public/static/1st/egg"+(i+1).toString()+".jpg");
      } 
      this.arr = new Array();
      for(var i = 0;i < 10;i++){
        this.arr[i] = require("../../../server/public/static/1st/"+(i+1).toString()+".png");
      }
    },
    image(){
        var img = document.getElementById("image");
        var time = new Date().getTime()
        if((time - this.currenttime) > this.rand){
          if(this.lucky_or_not == 0){
            img.src = require("../../../server/public/static/1st/"+(this.seed).toString()+".png")
            this.myalert(img.src,this.lucky_or_not);
            return;
          }
          else{
            img.src = this.egg[this.lucky_or_not - 1];
            this.myalert(img.src,this.lucky_or_not);
            return;
          }
        } 
        img.src = this.arr[(this.i++)%10];
        console.log(this.i)
        setTimeout(()=>this.image(),80) //60ms一闪
    },
    myalert(srcc,lucky){
      var modal = document.getElementById('myModal');
      var img = document.getElementById('image');
      img.src = srcc;
      var modalImg = document.getElementById("img01");
      modalImg.src = srcc;  
      var captionText = document.getElementById("caption");
      img.onclick = function(obj){
          modal.style.display = "block";
          modalImg.src = this.src;
          console.log(lucky)
          if(lucky != 0){  
            captionText.innerHTML = this.alt + "<br>点击右上角x可跳转至领奖界面哦~"
          }
          else{
            captionText.innerHTML = this.alt;
          }
        }
      img.onload = function(obj){
          modal.style.display = "block";
          modalImg.src = this.src;
          if(lucky != 0){
            captionText.innerHTML = this.alt + "<br>点击右上角x可跳转至领奖界面哦~"
          }
          else{
            captionText.innerHTML = this.alt;
          }
      }
      var span = document.getElementsByClassName("close")[0];
      span.onclick = function() { 
          modal.style.display = "none"; 
      }     
    },
    go_egg(obj){
        document.getElementById('myModal').style.display='none'
        if(this.lucky_or_not != 0){
          setTimeout(()=>{this.$router.push({name:'egg',params:{type:this.lucky_or_not}})},700)
        }
    }
  }
}
</script>
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
  #pic{
    position:absolute;
    width:100%;
    height:100%;
  }
  #image {
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
  }
  #image:hover {
    opacity: 0.9;
  }
  .modal {
    display: none; 
    position: fixed;
    padding: 50px 35px 10px 35px;
    width: 100%; 
    height: 100%;
    overflow: auto; 
    background-color: rgba(0,0,0,0.8); 
  }
  .modal-content {
      position:relative;
      align-items: center;
      display: block;
      margin: auto;
      width: 70%;
      max-width: 700px;
  }
  #hh{
    position: relative;
    top: 50%;
    transform: translateY(-50%)
  }
  #caption {
      position:relative;
      margin: auto;
      font-family:"微软雅黑";
      font-size: 16px;
      display: block;
      width: 80%;
      text-align: center;
      color: #f8e6b1;
      padding: 10px 0;
  }
  .modal-content, #caption { 
      -webkit-animation-name: zoom;
      -webkit-animation-duration: 0.8s;
      animation-name: zoom;
      animation-duration: 0.8s;
  }
  @-webkit-keyframes zoom {
      from {-webkit-transform:scale(0)} 
      to {-webkit-transform:scale(1)}
  }
  @keyframes zoom {
      from {transform:scale(0)} 
      to {transform:scale(1)}
  }
  .close {
      position: absolute;
      top: 1.8%;
      right: 4%;
      color: #f1f1f1;
      font-size: 25px;
      font-weight: bold;
      transition: 0.4s;
  }
  .close:hover,
  .close:focus {
      color: #bbb;
      text-decoration: none;
      cursor: pointer;
  }
  @media only screen and (max-width: 700px){
      .modal-content {
          width: 100%;
      }
  }
</style>