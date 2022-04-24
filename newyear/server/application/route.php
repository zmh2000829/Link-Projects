<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

return [
    // 定义资源路由
    '__rest__'=>[
    //     // menu
    //     'menu'      =>  'admin/menu',
    //     'position'  =>  'admin/position',
    //     'department'=>  'admin/department',
    //     'dinner'=>  'admin/dinner',
        'user'      =>  'index/Users'
    //     'rule'      =>  'admin/rule',
    //     'setting'   =>  'admin/sysConfig',
    ],
    '[base]'      => [
        'index'       => ['index/base/index', ['method' => 'get']],
        'luckDraw'       => ['index/base/luckDraw', ['method' => 'post']],   
        // 'getSchoolList'       => ['index/base/getSchoolList', ['method' => 'post']],   
        'addWinner'       => ['index/base/addWinner', ['method' => 'post']],   
        // 'getMajor'       => ['index/base/getMajor', ['method' => 'post']],
        
    ],
    '[comm]'      => [
        'logout'  => ['index/comm/logout', ['method' => 'post']],
    ],
    // MISS路由
    '__miss__'    => 'index/base/index',
];
