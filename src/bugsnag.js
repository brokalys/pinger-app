import Vue from "vue";
import bugsnag from "@bugsnag/js";
import bugsnagVue from "@bugsnag/plugin-vue";

const bugsnagClient = bugsnag("3291a08204a007079100568b7fa44efc");
bugsnagClient.use(bugsnagVue, Vue);

export default bugsnagClient;
