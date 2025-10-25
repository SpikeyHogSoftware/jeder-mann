<template>
  <FeatureCard i18n-key="faq">
    <template #default="{ items, parseMarkdownToHtml: parse }">
      <v-card-text>
        <v-container :class="{'pa-0 ma-0': $vuetify.display.mobile}">
          <v-data-iterator
            :search="search"
            :items="items"
            :items-per-page="-1"
            hide-default-footer
          >
            <template #header>
              <v-row justify="center">
                <v-col cols="12">
                  <v-text-field
                    v-model="search"
                    :label="$t('faq.search_textfield_title')"
                    base-color="accent"
                    color="accent"
                    icon-color="accent"
                    variant="outlined"
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                  >
                    <template #append-inner>
                      <v-fade-transition  >
                        <v-btn
                          v-show="search.length > 0"
                          icon
                          tile
                          color="accent"
                          variant="plain"
                          @click="search = ''"
                        >
                          <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                      </v-fade-transition>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </template>
            <template v-slot:default="{ items }">
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="(item, index) in items"
                  :key="item.title"
                  elevation="2"
                  class="my-2 panel-border"
                  v-show="
                    showAll || index < amountVisibleQuestionsWhenCollapsed
                  "
                >
                  <v-expansion-panel-title
                    disable-icon-rotate
                    expand-icon="mdi-plus-circle-outline"
                    collapse-icon="mdi-minus-circle-outline"
                  >
                    <span
                      class="text-subtitle-1 text-faq_expansion_panel_title_color"
                      >{{ item.raw.title }}</span
                    >
                    <template
                      v-slot:actions="{ expandIcon, collapseIcon, expanded }"
                    >
                      <v-icon color="faq_expansion_panel_icon_color">
                        {{ expanded ? collapseIcon : expandIcon }}
                      </v-icon>
                    </template>
                  </v-expansion-panel-title>
                  <v-divider color="faq_expansion_panel_border_color" opacity="1"></v-divider>
                  <v-expansion-panel-text>
                    <v-card flat>
                      <v-card-text class="markdown-wrapper">
                        <p v-html="parse(item.raw.description)"></p>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
              <v-col
                v-if="items.length > amountVisibleQuestionsWhenCollapsed"
                class="d-flex justify-center pb-0 mb-0"
              >
                <v-btn
                  color="faq_expansion_panel_show_all_button_color"
                  variant="outlined"
                  rounded="pill"
                  size="large"
                  :append-icon="showAll ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  @click="showAll = !showAll"
                >
                  {{ showAll ? $t("faq.show_less") : $t("faq.show_all") }}
                </v-btn>
              </v-col>
            </template>
          </v-data-iterator>
        </v-container>
      </v-card-text>
    </template>
  </FeatureCard>
</template>

<script>
import FeatureCard from "../utils/FeatureCard.vue";
export default {
  name: "FAQCard",
  props: {
    amountVisibleQuestionsWhenCollapsed: {
      type: Number,
      default: 3,
    },
  },
  components: {
    FeatureCard,
  },
  data() {
    return {
      search: "",
      showAll: false,
    };
  },
  computed: {
    borderColor() {
      return this.$vuetify.theme.current.colors
        .faq_expansion_panel_border_color;
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-border {
  // border: 1px solid v-bind(faq_expansion_panel_border_color) !important;
  border: 1px solid v-bind(borderColor) !important;
  border-bottom:none !important;
}
.markdown-wrapper :deep(h3) {
  color: rgb(var(--v-theme-accent)) !important;
}
</style>
