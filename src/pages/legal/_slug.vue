<template>
  <v-container>
    <!-- <v-progress-linear v-if="loading"  indeterminate></v-progress-linear> -->
    <v-row>
      <v-col>
        <v-card
          :loading="loading"
          :error="error"
        >
          <div v-if="loading">
            <v-skeleton-loader type="heading"  />
            <v-skeleton-loader type="paragraph"  />
            <v-skeleton-loader type="heading"  />
            <v-skeleton-loader type="paragraph"  />
            <v-skeleton-loader type="heading"  />
            <v-skeleton-loader type="paragraph"  />
          </div>

            <v-card-text v-show="!loading">
              <div
                class="markdown-content"
                v-html="parseMarkdown(policyContent)"
              ></div>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { marked } from "marked";
export default {
  name: "LegalPage",
  data() {
    return {
      loading: true,
      policyContent: "",
      error: false,
      errorMessage: "",
    };
  },
  methods: {
    parseMarkdown(markdown) {
      // return pretty printed markdown as html
      return marked(markdown, {
        breaks: true,
        gfm: true,
        tables: true,
        smartLists: true,
        smartypants: true,
        xhtml: true,
        pedantic: true,
      });
    },
    async loadMarkdownFile() {
  this.loading = true;
  this.error = false;
  
      try {
        // Map known slugs to their corresponding files
        const fileMap = {
          'impressum': () => import('@/assets/policies/de/impressum.md'),
          'privacy': () => import('@/assets/policies/de/privacy.md'),
          'about': () => import('@/assets/policies/de/about.md'),
          'disclaimer': () => import('@/assets/policies/de/disclaimer.md'),
        }
        
        const loader = fileMap[this.$route.params.slug]
        if (!loader) throw new Error(`Unknown policy: ${this.$route.params.slug}`)
        
        const url = await loader()
        this.policyContent = url.default
  } catch (error) {
    console.error('Failed to load markdown file:', error);
    this.error = true;
    this.errorMessage = `Policy "${this.$route.params.slug}" not found`;
  } finally {
    this.loading = false;
  }
      // fetch(url)
      //   .then(async (response) => {
      //     if (!response.ok) {
      //       throw new Error("Network response was not ok");
      //     }
      //     const text = await response.text();
      //     return text;
      //   })
      //   .then((text) => {
      //     this.policyContent = text;
      //   })
      //   .catch(() => {
      //     this.error = true;
      //     this.errorMessage = `Error loading ${this.$route.params.slug} policy`;
      //   })
      //   .finally(() => {
      //     setTimeout(() => {
      //       this.loading = false;
      //     }, 1000);
      //   });
    },
  },
  watch: {
    "$route.params.slug": {
      handler() {
        this.loadMarkdownFile();
        // scroll to the top of the page
        window.scrollTo(0, 0);
      },
    },
  },
  mounted() {
    this.loadMarkdownFile();
  },
};
</script>

<style lang="scss" scoped>
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  color: rgb(var(--v-theme-accent)) !important;
  margin:5px 0px 5px 0 !important;
}
.markdown-content {
  // Base typography
  font-size: 16px;
  
  line-height: 1.7;
  color: rgb(var(--v-theme-on-surface));
  font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  // Spacing and layout
  padding: 24px;
  max-width: 100%;

  // Smooth transitions for theme changes
  transition: color 0.3s ease, background-color 0.3s ease;

  // Headings hierarchy
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    color: rgb(var(--v-theme-accent));
    position: relative;

    &:first-child {
      margin-top: 0;
    }

    //   // Add subtle underline for visual separation
    //   &::after {
    //     content: '';
    //     position: absolute;
    //     bottom: -8px;
    //     left: 0;
    //     width: 60px;
    //     height: 3px;
    //     background: linear-gradient(90deg, rgb(var(--v-theme-primary)), transparent);
    //     border-radius: 2px;
    //   }
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;

    &::after {
      width: 100px;
      height: 4px;
    }
  }

  h2 {
    font-size: 2rem;

    &::after {
      width: 80px;
    }
  }

  h3 {
    font-size: 1.5rem;

    &::after {
      width: 60px;
    }
  }

  h4 {
    font-size: 1.25rem;
    font-weight: 500;
    color: rgb(var(--v-theme-on-surface-variant));

    &::after {
      width: 40px;
      height: 2px;
    }
  }

  h5,
  h6 {
    font-size: 1.1rem;
    font-weight: 500;
    color: rgb(var(--v-theme-on-surface-variant));

    &::after {
      display: none;
    }
  }

  // Paragraphs
  p {
    margin-bottom: 1.5em;
    text-align: justify;
    hyphens: auto;

    &:last-child {
      margin-bottom: 0;
    }
  }

  // Links
  a {
    color: rgb(var(--v-theme-primary));
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.3s ease;
    font-weight: 500;

    &:hover {
      color: rgb(var(--v-theme-accent));
      border-bottom-color: rgb(var(--v-theme-accent));
      text-decoration: none;
    }

    &:focus {
      outline: 2px solid rgb(var(--v-theme-primary));
      outline-offset: 2px;
      border-radius: 4px;
    }
  }

  // Lists
  ul,
  ol {
    margin: 1.5em 0;
    padding-left: 2em;

    li {
      margin-bottom: 0.75em;
      line-height: 1.6;

      &:last-child {
        margin-bottom: 0;
      }

      // Nested lists
      ul,
      ol {
        margin: 0.75em 0;
        padding-left: 1.5em;
      }
    }
  }

  ul {
    list-style-type: none;

    li {
      position: relative;
      padding-left: 1.5em;

      &::before {
        content: "•";
        position: absolute;
        left: 0;
        color: rgb(var(--v-theme-primary));
        font-weight: bold;
        font-size: 1.2em;
      }
    }
  }

  ol {
    counter-reset: item;

    li {
      counter-increment: item;
      position: relative;
      padding-left: 2em;

      &::before {
        content: counter(item) ".";
        position: absolute;
        left: 0;
        color: rgb(var(--v-theme-primary));
        font-weight: 600;
        min-width: 1.5em;
      }
    }
  }

  // Blockquotes
  blockquote {
    margin: 2em 0;
    padding: 1.5em 2em;
    border-left: 4px solid rgb(var(--v-theme-primary));
    background: rgba(var(--v-theme-primary), 0.05);
    border-radius: 0 8px 8px 0;
    font-style: italic;
    position: relative;

    &::before {
      content: '"';
      position: absolute;
      top: -10px;
      left: 20px;
      font-size: 3rem;
      color: rgba(var(--v-theme-primary), 0.3);
      font-family: serif;
    }

    p {
      margin: 0;
      text-align: left;
    }

    cite {
      display: block;
      margin-top: 1em;
      font-size: 0.9em;
      color: rgb(var(--v-theme-on-surface-variant));
      font-style: normal;

      &::before {
        content: "— ";
      }
    }
  }

  // Code blocks
  pre {
    background: rgb(var(--v-theme-surface-variant));
    border: 1px solid rgba(var(--v-theme-outline), 0.2);
    border-radius: 8px;
    padding: 1.5em;
    margin: 2em 0;
    overflow-x: auto;
    font-family: "Fira Code", "Consolas", "Monaco", monospace;
    font-size: 0.9em;
    line-height: 1.5;

    code {
      background: transparent;
      padding: 0;
      border-radius: 0;
      color: rgb(var(--v-theme-on-surface));
    }
  }

  // Inline code
  code {
    background: rgba(var(--v-theme-primary), 0.1);
    color: rgb(var(--v-theme-primary));
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: "Fira Code", "Consolas", "Monaco", monospace;
    font-size: 0.9em;
    font-weight: 500;
  }

  // Tables
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2em 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    th,
    td {
      padding: 1em;
      text-align: left;
      border-bottom: 1px solid rgba(var(--v-theme-outline), 0.2);
    }

    th {
      background: rgb(var(--v-theme-primary));
      color: rgb(var(--v-theme-on-primary));
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.9em;
      letter-spacing: 0.5px;
    }

    tr {
      transition: background-color 0.3s ease;

      &:hover {
        background: rgba(var(--v-theme-primary), 0.05);
      }

      &:last-child td {
        border-bottom: none;
      }
    }

    td {
      background: rgb(var(--v-theme-surface));
    }
  }

  // Horizontal rules
  hr {
    border: none;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgb(var(--v-theme-primary)),
      transparent
    );
    margin: 3em 0;
    border-radius: 1px;
  }

  // Images
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    margin: 2em 0;
    display: block;

    &:hover {
      transform: scale(1.02);
      transition: transform 0.3s ease;
    }
  }

  // Strong and emphasis
  strong {
    font-weight: 700;
    color: rgb(var(--v-theme-on-surface));
  }

  em {
    font-style: italic;
    color: rgb(var(--v-theme-on-surface-variant));
  }

  // Definition lists
  dl {
    margin: 2em 0;

    dt {
      font-weight: 600;
      color: rgb(var(--v-theme-primary));
      margin-top: 1.5em;
      margin-bottom: 0.5em;
    }

    dd {
      margin-left: 2em;
      margin-bottom: 1em;
      padding-left: 1em;
      border-left: 2px solid rgba(var(--v-theme-primary), 0.3);
    }
  }

  // Responsive design
  @media (max-width: 768px) {
    padding: 16px;
    font-size: 15px;

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.75rem;
    }

    h3 {
      font-size: 1.4rem;
    }

    blockquote {
      padding: 1em 1.5em;
      margin: 1.5em 0;
    }

    pre {
      padding: 1em;
      font-size: 0.85em;
    }

    table {
      font-size: 0.9em;

      th,
      td {
        padding: 0.75em;
      }
    }
  }

  // Print styles
  @media print {
    color: #000;
    background: #fff;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: #000;
      page-break-after: avoid;
    }

    a {
      color: #000;
      text-decoration: underline;
    }

    blockquote {
      background: #f5f5f5;
      border-left-color: #000;
    }

    pre {
      background: #f5f5f5;
      border: 1px solid #ccc;
    }
  }
}
</style>
