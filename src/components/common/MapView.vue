<template>
  <div id="mapview"></div>
</template>

<script>
//引入loadModules
import { loadModules } from 'esri-loader';
const options = {
  //引入ArcGIS API
  url: 'https://js.arcgis.com/4.20/init.js',
  css: 'https://js.arcgis.com/4.20/esri/themes/light/main.css',
};
export default {
  name: 'MapView',
  components: {},
  mounted: function () {
    this._createMapView();
  },
  methods: {
    //   创建地图视图
    //async await是成对出现的，意思是把那些模块加载完成之后才可以执行后面的代码 解决异步的问题
    async _createMapView() {
      const [Map, MapView] = await loadModules(['esri/Map', 'esri/views/MapView'], options);
      const map = new Map({
        basemap: 'osm',
      });
      const view = new MapView({
        container: 'mapview',
        center: [108, 32],
        map: map,
        zoom: 5,
      });
      view.ui.components = [];
    },
  },
};
</script>

<style>
#mapview {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
