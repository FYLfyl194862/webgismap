<template>
  <div class="mapdata-visual-view">
    <div id="sceneview"></div>
    <div id="echarts01"></div>
  </div>
</template>
<script>
import { loadModules } from 'esri-loader';
import * as echarts from 'echarts';
//第一步 引入gis api
const options = {
  url: 'https://js.arcgis.com/4.18/init.js',
  css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
};
export default {
  name: 'MapDataVisual',
  components: {},
  data() {
    return {
      data: '',
    };
  },
  mounted() {
    this.initMap();
    this.initEcharts01();
  },
  methods: {
    //实例化三维底图
    async initMap() {
      const [Map, SceneView, Basemap, TileLayer] = await loadModules(
        ['esri/Map', 'esri/views/SceneView', 'esri/Basemap', 'esri/layers/TileLayer'],
        options,
      );
      let basemap = new Basemap({
        baseLayers: [
          new TileLayer({
            url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
            title: 'Basemap',
          }),
        ],
        title: 'basemap',
        id: 'basemap',
      });
      const map = new Map({
        basemap: basemap,
      });
      const mapview = new SceneView({
        container: 'sceneview',
        map: map,
        // zoom: 4,
        // center: [108.321905, 32.832938],
      });
      //去除ui
      mapview.ui.components = [];
    },
    //实例化图表
    initEcharts01() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('echarts01'));

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: '柱状图',
        },
        tooltip: {},
        legend: {
          data: ['销量'],
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>
<style>
.mapdata-visual-view {
  position: relative;
  height: 100%;
  width: 100%;
}
#sceneview {
  height: 100%;
  width: 100%;
}
#echarts01 {
  position: absolute;
  top: 20px;
  left: 15px;
  width: 300px;
  height: 200px;
  background-color: antiquewhite;
}
</style>
