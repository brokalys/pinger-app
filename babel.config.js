module.exports = {
  env: {
    dev: {
      presets: [
        ["@vue/app", {
          polyfills: [
            "es7.object.entries"
          ]
        }]
      ]
    },
    test: {
      presets: ["@babel/preset-env"]
    }
  }
};
