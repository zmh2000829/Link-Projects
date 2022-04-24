// export function drawPoster(data) {
//     return new Promise(function(resolve) {
//         resolve(drawBasePoster(data))

//     })
// }

// function drawBasePoster(data) {
//     // let devratio = window.devicePixelRatio
//     // let backingStore = 
//     // console.log(data.province.length)
//     if(data.province.length + data.city.length > 10){
//         data.city = '';
//     }
//     const scale = 16
//     const wratio= scale* data.width  / 900
//     const hratio= scale* data.width  * 1.35 / 1300
//     const startTop = 30 * hratio
//     const startLeft = 20 * wratio
//     const gapSize = 80 * hratio
//     const line = 70 * hratio

//     const common = {
//         fontFamily:'宋体',
//         left: `${startLeft}px`,
//         fontSize: `${50*wratio}px`,
//         fontWeight: "bold",
//         lineHeight: `${70*hratio}px`,

//     }
//     if(data.blessWord.length == 12 || data.blessWord.length == 14){
//         let num = data.blessWord.length / 2
//         console.log("half",data.blessWord.substring(0,num))
//         console.log("half1",data.blessWord.substring(num))
//         var texta =  {
//             type: 'text',
//                 text: data.blessWord.substring(0,num),
//                 css: [
//                     {
//                         top: `${startTop + 7 * gapSize}px`,
//                         width: `${380*wratio}px`,

//                     },    
//                     common,
//                     { left: `${250*wratio}px` },
//                 ],
//         }
//         var textb = {
//             type: 'text',
//                 text: data.blessWord.substring(num),
//                 css: [
//                     {
//                         top: `${startTop + 7 * gapSize + 1.5 * line}px`,
//                         width: `${380*wratio}px`,

//                     },    
//                     common,
//                     { left: `${250*wratio}px` },
//                 ],
//         }
//     }
//     else if(data.blessWord.length < 20 || data.blessWord.length == 20){
//         var texta =  {
//             type: 'text',
//                 text: data.blessWord,
//                 css: [
//                     {
//                         top: `${startTop + 7 * gapSize}px`,
//                         width: `${520*wratio}px`,

//                     },    
//                     common,
//                     { left: `${150*wratio}px`,
//                       lineHeight: `${1.5 * line}px`,
//                     },
//                 ],
//         }
//         var textb = {}
//     }else{
//         var texta =  {
//             type: 'text',
//                 text: data.blessWord,
//                 css: [
//                     {
//                         top: `${startTop + 7 * gapSize}px`,
//                         width: `${520*wratio}px`,

//                     },    
//                     common,
//                     { left: `${150*wratio}px` },
//                 ],
//         }
//         var textb = {}
//     }
//     return {
//         width: `${scale*data.width}px`,
//         height: `${scale*data.width * 27 / 20}px`,
//         background:'rgba(255, 255, 255, 0)',
//         views: [
//             {
//                 type: 'image',
//                 url: require('./assets/png/页面3分享卡片背景.png'),
//                 css: {
//                     position:'absolute',
//                     top: "0px",
//                     left: "0px",
//                     width: `${scale*data.width}px`,
//                     height: `${scale*data.width * 27 / 20}px`,
//                     mode:'scaleToFill'
//                 },
//             },
//             {
//                 id: 'text-id-2',
//                 type: 'text',
//                 text:'送上“五四”祝福：',                       
//                 css: [                    
//                     common,

//                     {
//                         top: `${startTop + 5.0 * gapSize}px`,
//                         width: `${500*wratio}px`,
//                         // padding: '20px',                    
//                         left: `${150*wratio}px` ,

//                     },
//                 ],
//             },
//             {
//                 type: 'text',
//                 text:data.username+"在",                       
//                 css: [
//                     {
//                         top: `${startTop + 2 * gapSize}px`,
//                         width: `${400*wratio}px`,
//                         // padding: '20px',
//                     },
//                     common,
//                     { left: `${150*wratio}px` },
//                 ],
//             },
//             {
//                 type: 'image',
//                 url: require('./assets/png/定位.png'),
//                 css:[
//                     common,
//                     { left: `${150*wratio}px` },
//                     {
//                     top: `${startTop + 3.55 * gapSize}px`,
//                         width: `${50*wratio}px`,
//                     },
//                 ]
//             },
//             {
//                 type: 'text',
//                 text:data.province+data.city,                       
//                 css: [
//                     {
//                         top: `${startTop + 3.5 * gapSize}px`,
//                         width: `${500*wratio}px`,
//                         // padding: '20px',
//                     },
//                     common,
//                     { left: `${220*wratio}px` },
//                 ],
//             },
//             // {
//             //     type: 'text',
//             //     text: data.blessWord,
//             //     css: [
//             //         {
//             //             top: `${startTop + 7 * gapSize}px`,
//             //             width: `${520*wratio}px`,

//             //         },    
//             //         common,
//             //         { left: `${150*wratio}px` },
//             //     ],
//             // },
//             texta,
//             textb,
//             {
//                 type: 'text',
//                 text: "TA是第"+data.id+"个",
//                 css: [
//                     {
//                         top: `${startTop + 7 * gapSize + 4 * line}px`,
//                         width: `${450*wratio}px`,

//                     },    
//                     common,
//                     { left: `${150*wratio}px` },
//                 ],
//             },
//             {
//                 type: 'text',
//                 text: "点亮地图的复旦人",
//                 css: [
//                     {
//                         top: `${startTop + 7 * gapSize + 5 * line}px`,
//                         width: `${450*wratio}px`,

//                     },    
//                     common,
//                     { left: `${150*wratio}px` },
//                 ],
//             },
//             {
//                 type: 'image',
//                 url: require('./assets/png/页面三长按保存图片.png'),
//                 css:{
//                     position:'absolute',
//                     top: `${startTop + 1 * gapSize}px`,
//                     right: `${101*wratio}px`,
//                     width: `${225*wratio}px`,
//                     height: `${34.12*wratio}px`,
//                 }
//             },
//             {
//                 type: 'image',
//                 url: require('./assets/png/页面三扫描二维码.png'),
//                 css:{
//                     position:'absolute',
//                     top: `${1120*wratio}px`,
//                     right: `${101*wratio}px`,
//                     width: `${600*wratio}px`,
//                     height: `${34.5*wratio}px`,
//                     // mode:'scaleToFill'
//                 }
//             },
//             {
//                 type: 'qrcode',
//                 content: 'https://www.link-studio.cn/lightup/dist/#/start',
//                 css: {
//                     top: `${950*wratio}px`,
//                     right: `${101*wratio}px`,
//                     color: 'black',
//                     width: `${150*wratio}px`,
//                     height: `${150*wratio}px`,
//                 },
//             },
//         ],
//     }
// }