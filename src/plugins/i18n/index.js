import { createI18n } from 'vue-i18n'

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
  const locales = require.context('./locales', true, /\.(json|js)$/i)
  const messages = {}
  
  
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\.(json|js)$/i)
    if (matched && matched.length > 2) {
      const locale = matched[1]
      const fileType = matched[2].toLowerCase()
      const localeData = locales(key)
      
      // Handle different file types
      if (fileType === 'json') {
        // JSON files are loaded directly
        messages[locale] = localeData.default || localeData
      } else if (fileType === 'js') {
        // JS files might have default export or be the direct object
        messages[locale] = localeData.default || localeData
      }
      
    }
  })
  
  return messages
}

export default createI18n({
  legacy: false,
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
