import 'element-ui/lib/theme-chalk/index.css';

import Vue from 'vue';
import ElementUI from 'element-ui';
import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueGoogleMaps, {
  load: {
    key: '', // @todo
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
