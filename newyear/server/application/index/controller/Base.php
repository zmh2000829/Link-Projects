<?php
namespace app\index\controller;
use think\Request;
use think\Controller;
use think\Db;
use app\index\model\User;
use think\Cache;
class Base extends Controller
{
	public function _initialize()
    {
        parent::_initialize();
        // header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
        
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, sessionId, X-Requested-Token");
        $this->request = Request::instance();
        $this->param = $this->request->param();
        //dump($this->param);
    }
    # init
    public function index()
    {
        //return msg(300,null);
        return view('index');
    }
    # 这个index 控制器的调用是 http://localhost/ProjectAB/server/public/index.php/index
    public function luckDraw()
    {
        $gift1 = model('gift')->where('id',1)->find();
        $gift1 = $gift1['number'];
        $gift2 = model('gift')->where('id',2)->find();
        $gift2 = $gift2['number'];
        $rate = 100;    //中奖率设置，1表示中奖率1%
        if ($gift1<=0 && $gift2<=0) return msg(200,0);
            $roll=rand(1,100);
        if ($roll>$rate) return msg(200,0);
            $getGift = 0;
        //已中奖
        if ($gift1>0 && $gift2<=0){
            $getGift = 1;
        }else if($gift1<=0 && $gift2>0){

            $getGift = 2;
        }else if($gift1>0 && $gift2>0){
            $getGift = rand(1,2);
        }
        if ($getGift != 0){
            model('gift')->where('id', $getGift)->setDec('number');
            return msg(200,$getGift);
        }
        
        return msg(500,0);
        // $school = $this->param['school'];
    }
    public function addWinner()
    {
        $giftType = $this->param['giftType'];
        $phoneNumber = $this->param['phoneNumber'];
        $studentID = $this->param['studentID'];
        $name = $this->param['name'];
        $data = ['giftType' => $giftType, 'phoneNumber' => $phoneNumber,'studentID' => $studentID,'name' => $name];
        $res=model('winner')->insert($data);
        if ($res==1) return msg(200,null);
        return msg(404,'该学号已存在');
    }
    // public function getMajor()
    // {
    //     $ret = model('major')->group('name')->order('id asc')->select();
    // 	return msg(1,$ret);
    // }


}
