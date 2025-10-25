<template>
  <FeatureCard
    i18n-key="offers"
    :elevation="2"
  >
    <template #="{ parseMarkdownToHtml: parse, items }">
      <v-card-text>
        <v-row
          v-for="(offer, index) in items"
          :key="index"
          justify="space-around"
        >
          <v-col
            cols="12"
            md="8"
            xl="6"
            
          >
            <InfoCard
              variant="append"
              :flat="$vuetify.display.mobile"
              :switch-on-hover="!$vuetify.display.mobile"
              :switch-on-click="$vuetify.display.mobile"
            >
              <template #prepend>
                <v-card-title
                class="text-card-title-text"
                  ><span v-html="parse(offer.title)"
                /></v-card-title>
                <v-card-text class="pt-0 mt-0">
                  
                  <v-row >
                    <v-col cols="12" align="center">
                      <v-icon size="64" color="accent">{{ offer.icon }}</v-icon> 
                    </v-col>
                  </v-row>
                </v-card-text>
              </template>
              <template #front="">
                <v-card-text class="pb-0 mb-0" >
                  <v-row>
                    <v-col align="center">
                      <v-img
                        max-width="200px"
                        :src="offer.image"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </template>
              <template #back>
                <v-card-text class="pt-0 mt-0">
                  <v-row >
                    <v-col align="center">
                      <span v-html="parse(offer.description)" />
                    </v-col>
                  </v-row>
                </v-card-text>
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
  name: "OffersCard",
  components: {
    InfoCard,
    FeatureCard,
  },
 
};
</script>

<style lang="scss" scoped></style>
