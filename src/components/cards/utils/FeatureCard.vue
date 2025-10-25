<template>
  <v-card flat>
    <slot
      name="title"
      v-bind="{ item: i18nItem, parseMarkdownToHtml }"
    >
      <v-card-title v-if="hasCardTitle"
        ><h1
          class="text-card-title-text"
          v-html="parseMarkdownToHtml(cardTitle)"
        />
      </v-card-title>
    </slot>
    <slot
      name="subtitle"
      v-bind="{ item: i18nItem, parseMarkdownToHtml }"
    >
      <v-card-subtitle
        v-if="hasCardSubtitle"
        :class="{ 'w-80': !$vuetify.display.mobile }"
        class="text-card-subtitle-text"
        ><div v-html="parseMarkdownToHtml(cardSubtitle)"
      /></v-card-subtitle>
    </slot>
    <slot
      name="default"
      v-bind="{ parseMarkdownToHtml, item: i18nItem, items: items }"
    >
      <slot
        name="prepend"
        v-bind="{ item: i18nItem, parseMarkdownToHtml }"
      >
      <v-row>
        <v-col cols="12" align="center">
          <v-icon size="64" color="accent">{{ cardIcon }}</v-icon> 
        </v-col>
      </v-row>
      </slot>
    </slot>
    <slot
      name="description"
      v-bind="{ parseMarkdownToHtml, item: i18nItem }"
    >
      <v-card-text
        v-if="hasCardDescription"
        :class="{ 'w-80': !$vuetify.display.mobile }"
        class="text-card-description-text"
      >
        <v-row>
          <v-col align="center">
            <div v-html="parseMarkdownToHtml(cardDescription)" />
          </v-col>
        </v-row>
      </v-card-text>
    </slot>

    <slot
      name="actions"
      v-bind="{ item: i18nItem, parseMarkdownToHtml }"
    />
  </v-card>
</template>

<script>
import { marked } from "marked";
const MARKED_SETTINGS = {
  breaks: true,
  gfm: true,
  tables: true,
  smartLists: true,
  smartypants: true,
  xhtml: true,
  pedantic: true,
};
export default {
  name: "FeatureCard",
  props: {
    i18nKey: {
      type: String,
      default: "methods",
    },
    prependIcon: {
      type: [String, Object],
      default: null,
    },
  },
  methods: {
    parseMarkdownToHtml(markdown, config) {
      const settings = {
        ...config,
        MARKED_SETTINGS,
      };
      return marked(`${markdown}`, settings);
    },
  },
  computed: {
    i18nItem() {
      return this.$tm(this.$props.i18nKey);
    },
    cardTitle() {
      return this.i18nItem.title || "";
    },
    hasCardTitle() {
      return this.cardTitle?.length > 0;
    },
    cardSubtitle() {
      return this.i18nItem.subtitle || "";
    },
    hasCardSubtitle() {
      return this.cardSubtitle?.length > 0;
    },
    cardDescription() {
      return this.i18nItem.description || "";
    },
    hasCardDescription() {
      return this.cardDescription?.length > 0;
    },
    cardIcon() {
      return this.i18nItem.icon || "";
    },
    hasCardIcon() {
      return this.cardIcon?.length > 0;
    },
    items() {
      return this.i18nItem.items?.filter(({ skip }) => !skip);
    },
  },
};
</script>

<style lang="css" scoped></style>
