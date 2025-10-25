<template>
  <FeatureCard i18nKey="benefits" class="pb-4">
    <template #="{ parseMarkdownToHtml: parse, items }">
      <v-card-text
        v-if="items"
        :class="{ 'pa-0 ma-0 pb-2': $vuetify.display.mobile }"
      >
        <v-row>
          <v-col
            v-for="(item, index) in items"
            :key="index"
            :cols="$vuetify.display.mobile ? '12' : 4"
          >
            <InfoCard
              :modelValue="$vuetify.display.mobile"
              :flat="$vuetify.display.mobile"
              :switch-on-hover="!$vuetify.display.mobile"
              :switch-on-click="$vuetify.display.mobile"
              :variant="$vuetify.display.mobile ? 'append' : 'fade'"
              style="width: 100% !important"
            >
              <template #prepend>
                <v-card-title class="text-card-title-text">
                  <span v-html="parse(item.title)" />
                </v-card-title>
              </template>
              <template #front>
                <v-container>
                  <v-row class="flex-grow-1">
                    <v-col
                      cols="12"
                      align="center"
                    >
                      <v-icon
                        size="100"
                        color="accent"
                        >{{ item.icon }}</v-icon
                      >
                    </v-col>
                  </v-row>
                </v-container>
                <!-- <v-img
                  v-if="item.image"
                  :src="item.image"
                ></v-img>
                <component
                  v-if="item.customComponentIcon"
                  :is="item.customComponentIcon"
                ></component>
                -->
              </template>
              <template #back>
                <div
                  class="text-center"
                  v-html="parse(item.description)"
                />
              </template>
            </InfoCard>
          </v-col>
        </v-row> </v-card-text
    ></template>
  </FeatureCard>
</template>

<script>
import InfoCard from "@/components/cards/utils/InfoCard.vue";
import FeatureCard from "../utils/FeatureCard.vue";
export default {
  name: "BenefitCard",
  components: {
    InfoCard,
    FeatureCard,
  },
};
</script>

<style lang="css" scoped>
.fill-height {
  height: 100%;
  max-width: 300px;
  margin: 0 20px;
}
.pointer-cursor {
  cursor: pointer;
}

.benefits-card .v-card-title {
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  overflow-wrap: break-word;
}
</style>
