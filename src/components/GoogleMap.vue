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
function closeLoop(path) {
  return path.concat(path.slice(0, 1));
}

export default {
  name: "GoogleMap",
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
      mvcPaths: null,
    };
  },

  watch: {
    polygonPaths: function (paths) {
      if (paths) {
        this.paths = paths;
        this.polygonGeojson = JSON.stringify(
          {
            type: "Polygon",
            coordinates: this.paths.map((path) =>
              closeLoop(path.map(({ lat, lng }) => [lng, lat]))
            ),
          },
          null,
          2
        );
      }
    },

    paths: {
      handler() {
        const region = this.paths[0]
          .map((row) => `${row.lat.toFixed(6)} ${row.lng.toFixed(6)}`)
          .join(", ");

        this.$emit("update:region", region);
      },
      immediate: true,
    },
  },

  computed: {
    polygonPaths: function () {
      if (!this.mvcPaths) return null;
      let paths = [];
      for (let i = 0; i < this.mvcPaths.getLength(); i++) {
        let path = [];
        for (let j = 0; j < this.mvcPaths.getAt(i).getLength(); j++) {
          let point = this.mvcPaths.getAt(i).getAt(j);
          path.push({ lat: point.lat(), lng: point.lng() });
        }
        paths.push(path);
      }
      return paths;
    },
  },

  methods: {
    updateEdited(mvcPaths) {
      this.mvcPaths = mvcPaths;
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
