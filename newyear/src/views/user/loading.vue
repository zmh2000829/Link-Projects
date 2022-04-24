<template>
  <div class="page-container" style="text-align: center;">
    <div id="loading-panel">
      <h1><strong>Loading...</strong></h1>
      <h2><strong>{{percent}}</strong></h2>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 0,
      percent: '',
    }
  },
  beforeCreate(){
	let count = 0;
	let imgs = [    	
		require("../../../server/public/static/1st/1.png"),
		require("../../../server/public/static/1st/2.png"),
		require("../../../server/public/static/1st/3.png"),
		require("../../../server/public/static/1st/4.png"),
		require("../../../server/public/static/1st/5.png"),
		require("../../../server/public/static/1st/6.png"),
		require("../../../server/public/static/1st/7.png")
	]
    for (let img of imgs) {
        let image = new Image();
        image.src = img;
        image.onload = () => {
            count++;
            //console.log(image.src)
        };

    }
},
  mounted: function() {
    this.out()
  },
  methods: {
  	out(){
  		console(image.src)
  	}
  },
  watch: {
    count: function(val) {
      console.log(val)
      if (val === 3) {
        // 图片加载完成后跳转页面
        this.$router.push({path: 'home'})
      }
    }
  }
}
</script>

