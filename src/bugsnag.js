import Vue from "vue";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginVue from "@bugsnag/plugin-vue";

Bugsnag.start({
  apiKey: '3291a08204a007079100568b7fa44efc',
  plugins: [new BugsnagPluginVue(Vue)],
});

export default Bugsnag;
