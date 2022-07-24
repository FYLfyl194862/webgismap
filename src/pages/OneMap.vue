<template>
  <div class="onemap-page">
    <MapView />
    <MapTools />
    <MapTree />
    <XZQHComponent />
    <ResultTable />
  </div>
</template>
<script>
import MapView from '../components/common/MapView';
import MapTools from '../components/MapTools.vue';
import MapTree from '../components/MapTree.vue';
import XZQHComponent from '../components/XZQHComponent.vue';
import ResultTable from '../components/ResultTable.vue';
export default {
  name: 'OneMap',
  components: {
    MapView,
    MapTools,
    MapTree,
    XZQHComponent,
    ResultTable,
  },
};
</script>
<style>
.onemap-page {
  height: 100%;
  width: 100%;
  background-color: cadetblue;
}
</style>
