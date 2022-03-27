const path = require('path')
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@axios': path.resolve(__dirname, 'src/plugins/axios.js'),
        '@config': path.resolve(__dirname, 'src/config.js'),
      },
    },
  },
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
          args[0].title = 'TestVinixcode'
          return args
        })
  }
}
