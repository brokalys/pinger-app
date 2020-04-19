import "element-ui/lib/theme-chalk/index.css";

import Vue from "vue";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormItem,
  Input,
  Loading,
  Main,
  Option,
  Progress,
  Row,
  Select,
} from "element-ui";
import * as VueGoogleMaps from "vue2-google-maps";
import App from "./App";
import "./bugsnag";
import { createProvider } from "./vue-apollo";

Vue.config.productionTip = false;

// Element UI
Vue.use(Alert);
Vue.use(Button);
Vue.use(Col);
Vue.use(Container);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Loading);
Vue.use(Main);
Vue.use(Option);
Vue.use(Progress);
Vue.use(Row);
Vue.use(Select);

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAPS_KEY,
  },
});

/* eslint-disable no-new */
new Vue({
  render: (h) => h(App),
  apolloProvider: createProvider(),
  components: { App },
}).$mount("#app");
