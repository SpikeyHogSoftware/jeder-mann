const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath : "jeder-mann-frontend",
  devServer: {
    host: '0.0.0.0',
    allowedHosts: 'all',
    client: { webSocketURL: 'auto://0.0.0.0:0/ws' }
  },
  chainWebpack: config => {
    
    config.module
    .rule('markdown')
    .test(/\.md$/)
    .use('html-loader')
    .loader('html-loader')
    .end()
    .use('markdown-loader')
    .loader('markdown-loader')
    .end();
  },
  pluginOptions: {
    vuetify: {},
    i18n: {
      locale: 'de',
      fallbackLocale: 'de',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    },
    autoRouting: {
      chunkNamePrefix: 'page-'
    }
  }
})
