<template>
  <div class="datavisual-page">
    <MapDataVisual />
  </div>
</template>
<script>
import MapDataVisual from '../components/MapDataVisual.vue';
export default {
  name: 'DataVisual',
  components: { MapDataVisual },
  methods: {},
};
</script>
<style>
.datavisual-page {
  height: 100%;
  width: 100%;
  background-color: bisque;
}
</style>
