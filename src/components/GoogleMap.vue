<template>
  <gmap-map
    :options="{
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    }"
    :center="center"
    :zoom="10"
    style="width: 100%; height: 300px;"
    ref="map"
  >
    <gmap-polygon
      :paths="paths"
      :editable="true"
      @paths_changed="updateEdited($event)"
      @rightclick="handleClickForDelete"
      ref="polygon"
    >
    </gmap-polygon>
  </gmap-map>
</template>

<script>
import { loadGmapApi } from "vue2-google-maps";

export default {
  name: "GoogleMap",
  created() {
    try {
      loadGmapApi({ key: process.env.VUE_APP_GMAPS_KEY });
    } catch (e) {}

    const region = this.paths[0].map((row) =>
      [row.lat.toFixed(6), row.lng.toFixed(6)].join(" ")
    );
    region.push(region[0]);
    this.$emit("update:region", region.join(", "));
  },
  data() {
    return {
      center: {
        lat: 56.98,
        lng: 24.105078,
      },
      paths: [
        [
          { lng: 24.1366192486729, lat: 56.9922942350075 },
          { lng: 23.995789971634395, lat: 56.976393666616254 },
          { lng: 24.005336060806712, lat: 56.92490408641493 },
          { lng: 24.108466782852588, lat: 56.889287904181955 },
          { lng: 24.291935029312526, lat: 56.93221057479092 },
          { lng: 24.24517618684422, lat: 56.99650208638349 },
        ],
      ],
    };
  },

  methods: {
    updateEdited(mvcPaths) {
      const region = mvcPaths
        .getAt(0)
        .getArray()
        .map((row) => [row.lat().toFixed(6), row.lng().toFixed(6)].join(" "));
      region.push(region[0]);

      this.$emit("update:region", region.join(", "));
    },

    handleClickForDelete($event) {
      if ($event.vertex) {
        this.$refs.polygon.$polygonObject
          .getPaths()
          .getAt($event.path)
          .removeAt($event.vertex);
      }
    },
  },
};
</script>
