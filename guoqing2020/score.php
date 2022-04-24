<!DOCTYPE html>
<html>
<head>
<?php
$f_open = fopen("count.txt","r+"); //打开指定的文件
$count = fgets($f_open); //读取文件中的数据
if (isset($_COOKIE['name'])) {
  $ccount = $_COOKIE['name'];
}
else{ //判断COOKIE的是否存在
 setcookie('name',$count + 1,time()+300); //如果不存在,则创建COOKIE
 $ccount = $count + 1;
 $count = $count + 1; //将变量$count的值加1
 rewind($f_open); //打开指定的文件
 fwrite($f_open,$count); //向文件中写入新的数据
 fclose($f_open); //关闭文件
}
?>
  <title>国庆知识问答</title>
  <meta charset="utf-8">
  <link rel="stylesheet" type="text/css" href="css/index.css">
  <script type="text/javascript" src="./html2canvas.min.js"></script>
</head>
<body>
  <div id="content">
    <div id = "Home">
      <div id="back">
        <img id = "simg"src="img/red.png" style="width:100%">
      </div>
      <div id="num_txt"style="text-align: center;font-size: 55px;background:transparent;border-style:none;color: black">
      </div>
      <div id="name_txt"style="text-align: center;font-size: 55px;background:transparent;border-style:none;color: black">

      </div>
      
    </div>  
  </div>
  <div id="result" style="position:absolute;z-index:4;width: 100%">
    <img id="res_img" src="" style="width:100%;height:100%;">
  </div>
    
</body>
 <script type="text/javascript">
    function onload(){
      var sen = "Home";  
      var width = document.documentElement.clientWidth;
      var height = document.documentElement.clientHeight;
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
    }
    var payload;
  onload();
  choose();
  htmltocanvas();

  function back(){
    sessionStorage.clear();
    window.location.href = "index.html";
  }

  function choose(){
    var score = window.sessionStorage.getItem('score');
    var name = window.sessionStorage.getItem('name');
    var rank = "<?php echo "$ccount";?>";
    console.log(rank)
    console.log(name)
    console.log(score)
    document.getElementById('num_txt').innerHTML = rank;
    document.getElementById('name_txt').innerHTML = name;
    document.getElementById('simg').src ="img/score/6_"+score.toString()+'.png'

  }
  function htmltocanvas(){

    html2canvas(document.getElementById('Home'),{scale:1,scrollY:0,scrollX:0,}).then(canvas =>{
          document.getElementById('content').style.display =  'none';
          var url = canvas.toDataURL('image/png');
          console.log(url)
          var final_img = document.getElementById("res_img");
          final_img.src = url;
          final_img.onload = function(){
            alert('请长按保存图片，或点击右上角分享按钮分享至朋友圈');
          }
      });

  }
  </script>
</html>