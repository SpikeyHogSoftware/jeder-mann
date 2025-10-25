<template>
  <FeatureCard i18nKey="methods">
    <template #default="{ parseMarkdownToHtml: parse, items }">
      <v-card-text>
        <v-row
          v-for="(method, index) in items"
          :key="index"
          justify="space-around"
        >
          <v-col
            cols="12"
            md="8"
            class="my-4"
          >
            <InfoCard
              variant="append"
              :flat="$vuetify.display.mobile"
              :switch-on-hover="!$vuetify.display.mobile"
              :switch-on-click="$vuetify.display.mobile"
            >
              <template #prepend>
                <v-card-title class="text-card-title-text"
                  ><span v-html="parse(method.title)"
                /></v-card-title>
              </template>
              <template #front="{flipped}">
                <v-card-text class="pt-0 mt-0" :class="{'mb-4': !$vuetify.display.mobile && !flipped}">
                <v-row >
                  <v-col
                    cols="12"
                    align="center"
                  >
                    <v-icon
                      size="64"
                      color="accent"
                      >{{ method.icon }}</v-icon
                    >
                  </v-col>
                </v-row></v-card-text>
              </template>
              <template #back>
                <div class="text-center ma-2 mb-4">
                  <span v-html="parse(method.description)" />
                </div>
              </template>
            </InfoCard>
          </v-col>
        </v-row>
      </v-card-text>
    </template>
  </FeatureCard>
</template>

<script>
import InfoCard from "@/components/cards/utils/InfoCard.vue";
import FeatureCard from "../utils/FeatureCard.vue";

export default {
  name: "MethodsCard",
  props: {
    i18nKey: {
      type: String,
      default: "methods",
    },
  },
  components: {
    InfoCard,
    FeatureCard,
  },
  computed: {
    // i18nItem () {
    //   return this.$tm(this.$props.i18nKey)
    // },
    // cardTitle() {
    //   return this.i18nItem.title
    // },
    // cardSubtitle() {
    //   return this.i18nItem.subtitle
    // },
    // cardDescription() {
    //   return this.i18nItem.description
    // },
    // items() {
    //   return this.i18nItem.items?.filter(({ skip }) => !skip);
    // },
  },
};
</script>
<style lang="scss"></style>
