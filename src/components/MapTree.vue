<template>
  <div class="maptree-pannel" v-show="this.$store.getters._getDefaultMapTreeVisible">
    <div class="maptree-header">
      <span>图层管理</span>
      <i class="el-icon-close" @click="closeMapTreePannel"></i>
    </div>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader';
const options = {
  url: 'https://js.arcgis.com/4.18/init.js',
  css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
};

export default {
  name: 'MapTree',
  components: {},
  data() {
    return {
      data: [
        {
          label: '底图数据',
          children: [
            {
              label: '暖色系图层',
              layerid: 'layerid',
              layerurl: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
            },
            {
              label: '灰色系图层',
              layerid: 'layerid',
              layerurl: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer',
            },
          ],
        },
        {
          label: '行政区划数据',
          children: [
            {
              label: '省数据',
              layerid: 'layerid',
              layerurl: 'http://localhost:6080/arcgis/rest/services/MyMapService/FeatureServer/0',
            },
            {
              label: '市数据',
              layerid: 'layerid',
              layerurl: 'http://localhost:6080/arcgis/rest/services/MyMapService/FeatureServer/1',
            },
            {
              label: '县数据',
              layerid: 'layerid',
              layerurl: 'http://localhost:6080/arcgis/rest/services/MyMapService/FeatureServer/2',
            },
          ],
        },
        {
          label: '业务数据',
          children: [
            {
              label: '火车站数据 84',
              layerid: 'layerid',
              layerurl: 'http://localhost:6080/arcgis/rest/services/MyMapService/FeatureServer/0',
            },
            {
              label: '火车站数据 Mekatuo',
              layerid: 'layerid',
              layerurl: 'http://localhost:6080/arcgis/rest/services/MyMapService/FeatureServer/0',
            },
            {
              label: '省数据-卷帘',
              layerid: 'swipeLayerTop',
              layerurl: 'http://localhost:6080/arcgis/rest/services/MyMapService/FeatureServer/0',
            },
            {
              label: '市数据-卷帘',
              layerid: 'swipeLayerBottom',
              layerurl: 'http://localhost:6080/arcgis/rest/services/MyMapService/FeatureServer/1',
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  // mounted: function () {},
  methods: {
    async handleNodeClick(data) {
      if (data.layerurl) {
        //如果url存在
        // console.log('MapTree.vue data.layerurl: ',data.layerurl);
        //删除已添加的图层
        const view = this.$store.getters._getDefaultView;
        // console.log('MapTree.vue  view: ',view);
        const resultLayer = view.map.findLayerById('layerid');
        // console.log('MapTree.vue  resultLayer: ',resultLayer);
        if (resultLayer) view.map.remove(resultLayer);
        //处理不同服务类型
        const [TileLayer, FeatureLayer] = await loadModules(
          ['esri/layers/TileLayer', 'esri/layers/FeatureLayer'],
          options,
        );
        //实例化layer
        const serverType = data.layerurl.split('/').filter((i) => i.includes('Server'))[0];
        // console.log(serverType);
        let layer = '';
        switch (serverType) {
          case 'MapServer':
            layer = new TileLayer({ url: data.layerurl, id: data.layerid });
            break;
          case 'FeatureServer':
            layer = new FeatureLayer({ url: data.layerurl, id: data.layerid });
            break;
          default:
            break;
        }
        // const layer = new TileLayer({url:data.layerurl, id:data.layerid});
        console.log('MapTree.vuelayer: ', layer);
        view.map.add(layer);
        // view.map.addMany(layer);
      }
    },
    closeMapTreePannel() {
      const currentVisible = this.$store.getters._getDefaultMapTreeVisible;
      this.$store.commit('_setDefaultMapTreeVisible', !currentVisible);
    },
  },
};
</script>

<style>
.maptree-pannel {
  position: absolute;
  top: 90px;
  left: 80px;
  width: 200px;
  height: 300px;
  background-color: #fff;
}
.maptree-header {
  width: 100%;
  height: 35px;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.maptree-header > span {
  line-height: 35px;
  font-size: 16px;
  font-weight: 600;
}
.maptree-header > i {
  line-height: 35px;
  cursor: pointer;
}
</style>
