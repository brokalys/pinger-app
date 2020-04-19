module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'index.html',
    },
  },
  pluginOptions: {
    apollo: {
      lintGQL: true,
    },
  },
}
