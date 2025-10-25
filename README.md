# Walk-Man Frontend

A Vue 3 frontend application built with Vuetify, featuring internationalization and modern web technologies.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run serve
```

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run serve` | Start development server with hot-reload |
| `npm run build` | Build for production |
| `npm run lint` | Lint and fix code issues |
| `npm run deploy` | Deploy to GitHub Pages |
| `npm run i18n:report` | Generate i18n usage report |

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vuetify 3** - Material Design component framework
- **Vue Router** - Official router for Vue.js
- **Vuex** - State management
- **Vue i18n** - Internationalization
- **Sass** - CSS preprocessor
- **EmailJS** - Email service integration (deactivated for now)

## 📁 Project Structure

```
src/
├── components/     # Reusable Vue components
├── pages/         # Route-based page components
├── plugins/       # Vue plugins (i18n, router, vuetify)
├── store/         # Vuex store
└── styles/        # Global styles
```

## 🌐 Internationalization

The project supports multiple languages with Vue i18n. Language files are located in `src/plugins/i18n/locales/`.
