<template>
  <div id="app">
    <div style="width: 100%" class="flex-container column">
            <audio id="bgmusic" src="https://www.link-studio.cn/2021newyear/server/public/static/1st/back.mp3"  autoplay preload loop ></audio>



    </div>
      <v-app>
        <!-- <div id="back">
        </div> -->
        <!-- 纯色背景 -->
        <router-view/>
      </v-app>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  async mounted() {
    var element = document.createElement("script");
    element.src = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
    document.body.appendChild(element);    console.log(Vue.wechat)

    Vue.wechat.config({
        // 配置信息, 即使不正确也能使用 wx.ready
        debug: false,
        appId: '',
        timestamp: 1,
        nonceStr: '',
        signature: '',
        jsApiList: []
    });
    Vue.wechat.ready(function() {
        document.getElementById('bgmusic').play();
    });
  },
  methods: {
    reload (){
       this.isRouterAlive = false
       this.$nextTick(function(){
          this.isRouterAlive = true
       })
    },

  }
}
</script>

<style>
  *{
      margin: 0px;
      padding: 0px;
    }
  #app {
    width:100%; 
    height: 100%;
  } 

</style>
