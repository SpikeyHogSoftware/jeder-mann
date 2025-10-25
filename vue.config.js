const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  
  publicPath: process.env.NODE_ENV === 'production' ? '/jeder-mann/' : '/',
  pages: {
    index: {
      title: 'Walk-Man',
      entry: 'src/main.js',
    }
  },
  devServer: {
    host: '0.0.0.0',
    allowedHosts: 'all'
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
