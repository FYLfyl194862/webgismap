<template>
  <div class="mapview-pannel">
    <div id="mapview"></div>
    <div id="basemapToggle"></div>
    <div id="scaleBar"></div>
    <div id="zoom"></div>
    <div class="view-change" @click="handleViewChale">
      <span>{{ viewModel }}</span>
    </div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader';
//第一步 引入gis api
const options = {
  url: 'https://js.arcgis.com/4.18/init.js',
  css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
};
export default {
  name: 'MapView',
  components: {},
  data() {
    return {
      viewModel: '3D',
    };
  },
  mounted: function () {
    // console.log(this.$store.state._defaultView);
    this._createMapView();
  },
  methods: {
    async _createMapView() {
      //es6数组解构的语法
      document.getElementById('basemapToggle').innerHTML = '';
      document.getElementById('scaleBar').innerHTML = '';
      document.getElementById('zoom').innerHTML = '';
      const [Map, MapView, Basemap, TileLayer, BasemapToggle, ScaleBar, Zoom] = await loadModules(
        [
          'esri/Map',
          'esri/views/MapView',
          'esri/Basemap',
          'esri/layers/TileLayer',
          'esri/widgets/BasemapToggle',
          'esri/widgets/ScaleBar',
          'esri/widgets/Zoom',
        ],
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
      const view = new MapView({
        container: 'mapview',
        map: map,
        zoom: 5,
        center: [108.321905, 32.832938],
      });
      //1.实例化底图切换控件
      this.basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: 'hybrid',
        container: 'basemapToggle',
      });
      view.ui.add(this.basemapToggle);
      //2.实例化比例尺
      this.scaleBar = new ScaleBar({
        view: view,
        container: 'scaleBar',
        unit: 'metric',
      });
      //
      view.ui.add(this.scaleBar);
      //3.实例化缩放控件
      this.zoom = new Zoom({
        view: view,
        container: 'zoom',
      });
      view.ui.add(this.zoom);
      //去除ui
      view.ui.components = [];
      this.$store.commit('_setDefaultView', view);
    },
    async _createSceneView() {
      document.getElementById('basemapToggle').innerHTML = '';
      document.getElementById('scaleBar').innerHTML = '';
      document.getElementById('zoom').innerHTML = '';
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
        basemap,
      });

      const sceneView = new SceneView({
        container: 'mapview',
        map: map,
      });
      setTimeout(() => {
        sceneView.goTo({
          zoom: 10,
          center: [119.299446, 26.077573],
        });
      }, 3000);

      sceneView.ui.components = [];

      this.$store.commit('_setDefaultView', SceneView);
    },
    //二三维切换
    handleViewChale() {
      if (this.viewModel === '3D') {
        this._createSceneView();
        this.viewModel = '2D';
      } else {
        this._createMapView();
        this.viewModel = '3D';
      }
    },
  },
};
</script>

<style>
.mapview-pannel,
#mapview {
  position: relative;
  height: 100%;
  width: 100%;
}
.esri-view-surface–inset-outline:focus::after {
  outline: auto 0px Highlight !important;
  outline: auto 0px -webkit-focus-ring-color !important;
}
#basemapToggle {
  position: absolute;
  right: 15px;
  bottom: 15px;
}
#scaleBar {
  position: absolute;
  left: 15px;
  bottom: 15px;
}
#zoom {
  position: absolute;
  right: 15px;
  bottom: 100px;
}
.view-change {
  position: absolute;
  width: 32px;
  height: 32px;
  right: 15px;
  bottom: 180px;
  background-color: #fff;
  cursor: pointer;
  text-align: center;
}
.view-change span {
  line-height: 32px;
}
</style>
