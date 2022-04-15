<template>
  <div id="app" style = "width:100%;height:100%;">
       <div style = "display:inline-block;height:100%;width:80%;float:left;" id="mapDiv"></div>
      <div style = "display:inline-block;height:100%;width:19%;float:left">
  <el-input style = "width:90%;padding:15px;height:80%" v-model="adddatatext"></el-input>
  <el-button type="primary" style="width:90% ;padding:15px;margin-left:13px;" @click="doaddmarker()">添加</el-button>

</div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
export default {
  name: 'App',
  components: {
      Sidebar
  },
  data(){
   return {
    zoom:15,
    adddatatext:"",
    data_info : [[116.417854,39.921988,"地址：北京市东城区王府井大街88号乐天银泰百货八层"],
                [116.406605,39.921585,"地址：北京市东城区东华门大街"],
                [116.412222,39.912345,"地址：北京市东城区正义路甲5号"]
            ],
    centerj:116.41593,
    centerw:39.92313

    
   }
  },
  created(){
  },
  mounted(){
   loadJS("http://api.tianditu.gov.cn/api?v=4.0&tk=0e8083ec5808ed15392114371fd5b032",tiandituload) 
            //调用需要执行的方法
  },
  updated(){
  },
  methods:{
   doaddmarker(){
      console.log(this.adddatatext);
      var markerjson = JSON.parse(this.adddatatext);
      console.log(markerjson);
      
      var resultdata = []
      for (let i in markerjson){
      
      console.log(markerjson[i]);
      var sidata = []
      sidata.push(markerjson[i]['lng'])
      sidata.push(markerjson[i]['lat'])
      sidata.push(markerjson[i]['label'])
      resultdata.push(sidata)
      }
      console.log(resultdata);
      tianditureload(resultdata);
      this.adddatatext = "";
   }
  }
}

function loadJS(src, callback) {
    var script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = src;
    if (script.addEventListener) {
        script.addEventListener('load', function () {
            callback();
        }, false);
    } else if (script.attachEvent) {
        script.attachEvent('onreadystatechange', function () {
            var target = window.event.srcElement;
            if (target.readyState == 'loaded') {
                callback();
            }
        });
    }
    head.appendChild(script);
}

function  tiandituload(){

             var zoom = 15;
            var data_info = [[116.417854,39.921988,"地址：北京市东城区王府井大街88号乐天银泰百货八层"],
                [116.406605,39.921585,"地址：北京市东城区东华门大街"],
                [116.412222,39.912345,"地址：北京市东城区正义路甲5号"]
            ]
            tianditureload(data_info);
  }
  
function  tianditureload(data_info){
      var map
            //初始化地图对象
            map = new T.Map("mapDiv");

            var minj = data_info[0][0]
            var maxj = data_info[0][0]
            var minw = data_info[0][1]
            var maxw = data_info[0][1]
            for(var i=0;i<data_info.length;i++){
                var marker = new T.Marker(new T.LngLat(data_info[i][0],data_info[i][1]));  // 创建标注
                data_info[i][0] < minj ? minj = data_info[i][0]:null;
                data_info[i][1] < minw ? minw = data_info[i][1]:null;
                data_info[i][0] > maxj ? minj = data_info[i][0]:null;
                data_info[i][1] > maxw ? maxw = data_info[i][1]:null;
                var content = data_info[i][2];
                map.addOverLay(marker);               // 将标注添加到地图中
                addClickHandler(content,marker);
            }
      console.log(minj);
      console.log(maxj);
      console.log(minw);
      console.log(maxw);
                            
                var cenj =(parseFloat(maxj)+parseFloat(minj))/2;
		var cenw= (parseFloat(maxw)+parseFloat(minw))/2;
      console.log(cenw);
      console.log(cenj);
       var zoom2 = getZoom(maxj, minj, maxw, minw)
      console.log(zoom2);
            //设置显示地图的中心点和级别
            map.centerAndZoom(new T.LngLat(cenj, cenw), zoom2);
            function addClickHandler(content,marker){
                marker.addEventListener("click",function(e){
                    openInfo(content,e)}
                );
            }
            function openInfo(content,e){
                var point = e.lnglat;
                marker = new T.Marker(point);// 创建标注
                var markerInfoWin = new T.InfoWindow(content,{offset:new T.Point(0,-30)}); // 创建信息窗口对象
                map.openInfoWindow(markerInfoWin,point); //开启信息窗口
            }

  }
function getZoom(maxJ, minJ, maxW, minW) {
			if (maxJ == minJ && maxW == minW) return 13;
			var diff = maxJ - minJ;
			if (diff < (maxW - minW) * 2.1) diff = (maxW - minW) * 2.1;
			diff = parseInt(10000 * diff) / 10000;
 
			var zoomArr = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
			var diffArr = new Array(180, 90, 45, 22, 11, 5.5, 2.75, 1.37, 0.68, 0.34, 0.17, 0.08, 0.04);
 
			for (var i = 0; i < diffArr.length; i++) {
				if ((diff - diffArr[i]) >= 0) {
					return zoomArr[i];
				}
			}
			return 14;
		}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
        body, html{width: 100%;height: 100%;margin:0;font-family:"微软雅黑";}
        input,p { margin-top: 10px; margin-left: 5px; font-size: 14px;  }
       
       .tdt-marker-icon.tdt-zoom-animated.tdt-interactive{margin-left: -5px!important; margin-top: -20px!important; width: 10px!important; height: 20px!important; transform: translate3d(769px, 437px, 0px); z-index: 437;}
.el-input__inner {
  height:100%!important;
}
</style>
