import "element-ui/lib/theme-chalk/index.css";

import Vue from "vue";
import ElementUI from "element-ui";
import VueResource from "vue-resource";
import * as VueGoogleMaps from "vue2-google-maps";
import App from "./App";
import "./bugsnag";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAPS_KEY,
  },
});

/* eslint-disable no-new */
new Vue({
  render: (h) => h(App),
  components: { App },
}).$mount("#app");
