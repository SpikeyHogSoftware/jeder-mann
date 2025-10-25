<template>
  <v-card>
    <v-row class="my-2"  :class="{'flex-row-reverse': !$vuetify.display.mobile}" justify="center" align="center">
      <v-col
        :cols="$vuetify.display.mobile ? 12 : 7"
        align="start"
        ><v-card-title class="text-h4">{{ $t("legal.about.title") }}</v-card-title
        ><v-card-text
          ><div class="markdown-content" v-html="parseMarkdown(policyContent)"></div></v-card-text
      ></v-col>
      <v-col
          :cols="$vuetify.display.mobile ? 12 : 4"
        ><v-img  max-height="60vh" :src="require('@/assets/images/Henrik Weiss.png')"
      /></v-col>
    </v-row>
  </v-card>
</template>

<script>
import { marked } from "marked";
export default {
  name: "AboutPage",
  data() {
    return {
      policyContent: "",
    };
  },
  methods: {
    parseMarkdown(markdown) {
      return marked(markdown, {
        breaks: true,
        gfm: true,
        tables: true,
        smartLists: true,
        smartypants: true,
        xhtml: true,
        pedantic: false,
      });
    },
    async loadMarkdownFile() {
      const url = await import("@/assets/policies/de/about.md");
      this.policyContent = url.default;
    },
  },
  mounted() {
    this.loadMarkdownFile();
  },
};
</script>

<style lang="scss" scoped>

.markdown-content :deep(p) {
  margin-top: 5pt;
  margin-bottom: 5pt;
}
</style>
