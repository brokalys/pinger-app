import Vue from "vue";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginVue from "@bugsnag/plugin-vue";

if (process.env.VUA_BUGSNAG_KEY) {
  Bugsnag.start({
    apiKey: process.env.VUA_BUGSNAG_KEY,
    plugins: [new BugsnagPluginVue(Vue)],
  });
}

export default Bugsnag;
