]<template>
<div id="content">
  <div id=Loader  v-show='hasLoad==0'>
         <div id="wait">正在加载，请稍等...
           <br>
         </div>
         <div id=Loading>
          <div id=dong class="loader-inner ball-beat">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
  <div id="Home" v-show='hasLoad==1'>
    <!-- 16:9背景位置 -->
    <div id="background">
      <img src="../../assets/png/底色.png" style="width:100%">
    </div>
    
    <div id="tip">
      <img src="../../assets/png/我的新年签标题.png" style="width:100%">
    </div>
    <div id="btn" @click="shake()">
      <img  src="../../assets/png/按钮.png" alt="进入抽签" style="width:100%">
    </div>
    <div id="box" >
      <img src="../../assets/png/抽签盒子.png" style="width:100%">
    </div>
  </div>
</div>

</template>

<script>
export default {
  beforeCreate(){
      
    },
  data () {
    return {
      seed: '',
      hasLoad:0,
    }
  },
  async mounted() {
    let count = 0
      let imgs = [
        require("../../../server/public/static/1st/egg1.jpg"),
        require("../../../server/public/static/1st/egg2.jpg"),
        require("../../../server/public/static/1st/1.png"),
        require("../../../server/public/static/1st/2.png"),
        require("../../../server/public/static/1st/3.png"),
        require("../../../server/public/static/1st/4.png"),
        require("../../../server/public/static/1st/5.png"),
        require("../../../server/public/static/1st/6.png"),
        require("../../../server/public/static/1st/7.png"),
        require("../../../server/public/static/1st/8.png"),
        require("../../../server/public/static/1st/9.png"),
        require("../../../server/public/static/1st/10.png"),
        // require("../../../server/public/static/1st/11.png"),
        // require("../../../server/public/static/1st/12.png"),
        // require("../../../server/public/static/1st/13.png"),
        // require("../../../server/public/static/1st/14.png"),
        // require("../../../server/public/static/1st/15.png"),
        // require("../../../server/public/static/1st/16.png"),
        // require("../../../server/public/static/1st/17.png"),
        // require("../../../server/public/static/1st/18.png"),
        // require("../../../server/public/static/1st/19.png"),
        // require("../../../server/public/static/1st/20.png"),
        // require("../../../server/public/static/1st/21.png"),
        // require("../../../server/public/static/1st/22.png"), 
        // require("../../../server/public/static/1st/23.png"),
        // require("../../../server/public/static/1st/24.png"),
        // require("../../../server/public/static/1st/25.png"),
        // require("../../../server/public/static/1st/26.png"), 
        // require("../../../server/public/static/1st/27.png"),
        // require("../../../server/public/static/1st/28.png"),
        // require("../../../server/public/static/1st/29.png"),
        // require("../../../server/public/static/1st/30.png"),
        // require("../../../server/public/static/1st/31.png"), 
        // require("../../../server/public/static/1st/32.png"),
        // require("../../../server/public/static/1st/33.png"),
        // require("../../../server/public/static/1st/34.png"),
        // require("../../../server/public/static/1st/35.png"),
        // require("../../../server/public/static/1st/36.png"),
        // require("../../../server/public/static/1st/37.png"),
        // require("../../../server/public/static/1st/38.png"),
        // require("../../../server/public/static/1st/39.png"),
        // require("../../../server/public/static/1st/40.png"),
        // require("../../../server/public/static/1st/41.png"),
        // require("../../../server/public/static/1st/42.png"),
        // require("../../../server/public/static/1st/43.png"),
        // require("../../../server/public/static/1st/44.png"),
        // require("../../../server/public/static/1st/45.png"),
        // require("../../../server/public/static/1st/46.png"),
        // require("../../../server/public/static/1st/47.png"),
        // require("../../../server/public/static/1st/48.png")
      ] 
      for (let img of imgs) {
          let image = new Image();
          image.onload = () => {
              count++;
              console.log(count)
              if (count == imgs.length){
                this.hasLoad=1;
              }
          };
          image.src = img;
      }
    this.getWd()
    this.rand()
  },
  methods:{
    
    rand() {
      this.seed = Math.floor(Math.random() * 48) + 1;
      console.log(this.seed)
      let img = require("../../../server/public/static/1st/"+(this.seed).toString()+".png")
      let image = new Image();
      image.onload = () => {}
      image.src = img;
    },
    getWd(){
      var sen = "Home";
      var width = document.body.clientWidth;
      var height = document.body.clientHeight;
      var ratio = width / height;
      if (ratio > (9 / 16)) {
        var bodywidth = height * 9 / 16;
        var margin = (width - bodywidth) / 2;
        document.getElementById(sen).style.height= height + 'px';
        document.getElementById(sen).style.width= bodywidth + 'px';
        document.getElementById(sen).style.marginLeft= margin + 'px';
        document.getElementById(sen).style.marginRight= margin + 'px';
      }else if(ratio < (9 / 16)){
        var bodyheight = width * 16 / 9;
        var margin = (height - bodyheight) / 2;
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
    shake(elemId) {
      let elem = document.getElementById("box")
      if (elem) {
        elem.classList.add('shake')
        setTimeout(
          ()=>{ 
            elem.classList.remove('shake') 
          }, 1000)
      }
      setTimeout(()=>{this.$router.push({name:'home',params:{seed:this.seed}})},1500)
      //this.$router.push({name:'home'})
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #Loader{
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      margin: 0;
      position: absolute;
      background-color:rgb(211, 211, 211);
    }
    #Loading {
      top:50%;
      left:50%;
      position: absolute;
      -webkit-transform: translateY(-50%) translateX(-50%);
      transform: translateY(-50%) translateX(-50%);
      z-index:100;
      background-color: rgb(211, 211, 211);
      }
      @-webkit-keyframes ball-beat {
      50% {
        opacity: 0.2;
        -webkit-transform: scale(0.75);
        transform: scale(0.75); }

      100% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1); } }

      @keyframes ball-beat {
      50% {
        opacity: 0.2;
        -webkit-transform: scale(0.75);
        transform: scale(0.75); }

      100% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1); } }

      .ball-beat > div {
      background-color: #279fcf;
      width: 15px;
      height: 15px;
      border-radius: 100% !important;
      margin: 2px;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      display: inline-block;
      -webkit-animation: ball-beat 0.7s 0s infinite linear;
      animation: ball-beat 0.7s 0s infinite linear; }
      .ball-beat > div:nth-child(2n-1) {
      -webkit-animation-delay: 0.35s !important;
      animation-delay: 0.35s !important; 
      }
      .no-js #Loading {
        display: none;
      }
        .no-js h1 {
          color: #222222;
      }
      #wait{
        position: absolute;
        width: 100%;
        font-size: 1.15em;
        font-family: 'Open Sans';
        color: #279fcf;
        bottom: 30%;
        opacity: 1;
        text-align: center;
        letter-spacing:0.1em;
      }
      #waitspan{
        font-weight: normal;
        font-size: 0.85em;
        color: #279fcf;
        opacity:0.5;
      }
  #Home{
    font-family:"宋体";
    font-size: 20px;
    position:absolute;
  }
  #content{
    font-weight:bold;
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
  #box{
    position: absolute;
    width: 75%;
    left:14%;
    top:29.6%;
    z-index: 3;
  }
  #tip{
    position: absolute;
    width: 79%;
    left:10.1%;
    top: 5.8%;
    z-index: 3;
  }
  .shake{
    animation: shake 900ms ease-in-out;
  }
  @keyframes shake {
      10%, 90% { transform: translate3d(-2px, 0, 0); }
      20%, 80% { transform: translate3d(+3px, 0, 0); }
      30%, 70% { transform: translate3d(-5px, 0, 0); }
      40%, 60% { transform: translate3d(+7px, 0, 0); }
      50% { transform: translate3d(-9px, 0, 0); }
  }
  #btn{
    position: absolute;
    width: 54%;
    left: 21.5%;
    top: 82%;
    z-index: 5;
  }
  #btn:active{
    opacity: 0.7;
  } 
  @keyframes myfirst
  {
    0%   {background:red; left:0%; top:0%;}
    25%  {background:yellow; left:10%; top:0%;}
    50%  {background:blue; left:20%; top:0%;}
    75%  {background:green; left:30%; top:0%;}
    100% {background:red; left:40%; top:0%;}
  }
</style>