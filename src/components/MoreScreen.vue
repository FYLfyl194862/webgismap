<template>
  <div class="morescreen-view">
    <div class="morescreen-top-view">
      <div id="top-left" class="map-item"></div>
      <div id="top-right" class="map-item"></div>
    </div>
    <div class="morescreen-bottom-view">
      <div id="buttom-left" class="map-item"></div>
      <div id="buttom-right" class="map-item"></div>
    </div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader';
const options = {
  url: 'https://js.arcgis.com/4.18/init.js',
  css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
};
export default {
  name: 'MoreScreen',
  mounted: function () {
    this._initMap();
  },
  methods: {
    async _initMap() {
      const [Map, MapView, Basemap, TileLayer, watchUtils] = await loadModules(
        ['esri/Map', 'esri/views/MapView', 'esri/Basemap', 'esri/layers/TileLayer', 'esri/core/watchUtils'],
        options,
      );
      const basemap = new Basemap({
        baseLayers: [
          new TileLayer({
            url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
            title: 'Basemap',
          }),
        ],
        title: 'basemap',
        id: 'basemap',
      });
      const map01 = new Map({
        basemap,
      });
      const mapView01 = new MapView({
        container: 'top-left',
        map: map01,
        zoom: 10,
        center: [119.299446, 26.077573],
      });
      const map02 = new Map({
        basemap,
      });
      const mapView02 = new MapView({
        container: 'top-right',
        map: map02,
        zoom: 10,
        center: [119.299446, 26.077573],
      });
      const map03 = new Map({
        basemap,
      });
      const mapView03 = new MapView({
        container: 'buttom-left',
        map: map03,
        zoom: 10,
        center: [119.299446, 26.077573],
      });
      const map04 = new Map({
        basemap,
      });
      const mapView04 = new MapView({
        container: 'buttom-right',
        map: map04,
        zoom: 10,
        center: [119.299446, 26.077573],
      });
      mapView01.ui.components = [];
      mapView02.ui.components = [];
      mapView03.ui.components = [];
      mapView04.ui.components = [];
      var extent = null;
      var flag1 = true,
        flag2 = true,
        flag3 = true,
        flag4 = true;
      mapView01.on('mouse-wheel', function () {
        if (flag1) {
          window.setTimeout(function () {
            extent = mapView01.extent;
            mapView02.extent = extent;
            mapView03.extent = extent;
            mapView04.extent = extent;
            flag2, flag3, (flag4 = false);
          }, 100);
        } else if (!flag1) {
          flag1 = true;
        }
      });
      mapView01.on('drag', function () {
        console.log(flag1);
        if (flag1) {
          extent = mapView01.extent;
          mapView02.extent = extent;
          mapView03.extent = extent;
          mapView04.extent = extent;
          flag2, flag3, (flag4 = false);
        } else if (!flag1) {
          flag1 = true;
        }
      });

      //view2
      mapView02.on('mouse-wheel', function () {
        if (flag2) {
          window.setTimeout(function () {
            extent = mapView02.extent;
            mapView01.extent = extent;
            mapView03.extent = extent;
            mapView04.extent = extent;
            flag1, flag3, (flag4 = false);
          }, 100);
        } else if (!flag2) {
          flag2 = true;
        }
      });
      mapView02.on('drag', function () {
        if (flag2) {
          extent = mapView02.extent;
          mapView01.extent = extent;
          mapView03.extent = extent;
          mapView04.extent = extent;
          flag1, flag3, (flag4 = false);
        } else if (!flag2) {
          flag2 = true;
        }
      });

      //view3
      mapView03.on('mouse-wheel', function () {
        if (flag3) {
          window.setTimeout(function () {
            extent = mapView03.extent;
            mapView01.extent = extent;
            mapView02.extent = extent;
            mapView04.extent = extent;
            flag1, flag2, (flag4 = false);
          }, 100);
        } else if (!flag3) {
          flag3 = true;
        }
      });
      mapView03.on('drag', function () {
        if (flag3) {
          extent = mapView03.extent;
          mapView01.extent = extent;
          mapView02.extent = extent;
          mapView04.extent = extent;
          flag1, flag2, (flag4 = false);
        } else if (!flag3) {
          flag3 = true;
        }
      });

      //view4
      mapView04.on('mouse-wheel', function () {
        if (flag4) {
          window.setTimeout(function () {
            extent = mapView04.extent;
            mapView01.extent = extent;
            mapView02.extent = extent;
            mapView03.extent = extent;
            flag1, flag2, (flag3 = false);
          }, 100);
        } else if (!flag4) {
          flag4 = true;
        }
      });
      mapView04.on('drag', function () {
        if (flag4) {
          extent = mapView04.extent;
          mapView01.extent = extent;
          mapView02.extent = extent;
          mapView03.extent = extent;
          flag1, flag2, (flag3 = false);
        } else if (!flag4) {
          flag4 = true;
        }
      });
      //鼠标监听事件
      // mapView01.on("mouse-wheel" ,function(){
      //     console.log(flag1)
      //     if(flag1){
      //         mapView02.center = mapView01.center;
      //         mapView02.zoom = mapView01.zoom;

      //         // mapView02.setExtent(vExtent);
      //         flag2=false;
      //     }else if(!flag1){
      //         flag1 = true;
      //     }
      // });
      // mapView02.on("drag",function(){
      //     if(flag2){
      //         // var vExtent=mapView02.extent;
      //         mapView01.center = mapView02.center;
      //         mapView01.zoom = mapView02.zoom;

      //         // mapView01.setExtent(vExtent);

      //         flag1=false;
      //     }else if(!flag2){
      //         flag2 = true;
      //     }
      // });
      // mapView01.on("extent-change",function(){
      //     if(flag1){

      //         var vExtent=mapView01.extent;

      //         mapView02.setExtent(vExtent);

      //         flag2=false;

      //     }else if(!flagV)
      //     {

      //         flagV=true;});

      //地图联动
      watchUtils.whenTrue(mapView01, 'stationary', function () {
        // Get the new center of the view only when view is stationary.
        if (mapView01.center) {
          mapView02.goTo({
            center: [mapView01.center.longitude, mapView01.center.latitude],
            zoom: mapView01.zoom,
          });
          mapView03.goTo({
            center: [mapView01.center.longitude, mapView01.center.latitude],
            zoom: mapView01.zoom,
          });
          mapView04.goTo({
            center: [mapView01.center.longitude, mapView01.center.latitude],
            zoom: mapView01.zoom,
          });
        }
        console.log('aaa,', mapView01.extent);
        // Get the new extent of the view only when view is stationary.
        if (mapView01.extent) {
          console.log(
            '2',
            mapView01.extent.xmin.toFixed(2),
            mapView01.extent.xmax.toFixed(2),
            mapView01.extent.ymin.toFixed(2),
            mapView01.extent.ymax.toFixed(2),
          );
        }
      });
    },
  },
};
</script>

<style>
.morescreen-view {
  width: 100%;
  height: 100%;
}
.map-item {
  width: calc(50% - 2.5px);
  height: 100%;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
}
.morescreen-top-view {
  width: 100%;
  height: calc(50% - 2.5px);
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5px;
}
.morescreen-bottom-view {
  width: 100%;
  height: calc(50% - 2.5px);
  display: flex;
  justify-content: space-between;
  margin-top: 2.5px;
}
#top-left {
  margin-right: 2.5px;
}
#top-right {
  margin-left: 2.5px;
}
#buttom-left {
  margin-right: 2.5px;
}
#buttom-right {
  margin-left: 2.5px;
}
</style>
