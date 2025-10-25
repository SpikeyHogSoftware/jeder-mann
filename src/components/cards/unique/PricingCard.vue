<template>
  <v-card flat>
    
    <v-card-text>
      <v-window
        v-model="window"
        center-active
      >

        <v-window-item>
          <v-container>
            <v-row>
              <v-col :cols="$vuetify.display.mobile ? 12 : 6">
                <FeatureCard
                  i18n-key="pricing.items[0]"
                  hover
                  height="100%"
                  :flat="false"
                >
                
                </FeatureCard>
              </v-col>
              <v-col
                v-if="!$vuetify.display.mobile"
                cols="6"
              >
                <FeatureCard
                  i18n-key="pricing.items[1]"
                  hover
                  height="100%"
                  :flat="false"
                >
                </FeatureCard>
              </v-col> </v-row
          ></v-container>
        </v-window-item>
        <!-- on mobile the second tab is addeed t odisplay what is usually in the first tab side by side -->
        <v-window-item v-if="$vuetify.display.mobile">
          <FeatureCard i18n-key="pricing.items[1]" :flat="false">
          </FeatureCard>
        </v-window-item>

        <v-window-item>
          <v-container :width="$vuetify.display.mobile ? '100%' : '80%'">
            <FeatureCard
              i18n-key="pricing.items[2]"
              :flat="false"
            >
              <template #default="{ item }">
                <!-- {{ item }}asd -->
                <v-data-table
                  v-if="!$vuetify.display.mobile"
                  v-bind="item.table"
                  hide-default-footer
                >
                </v-data-table>
                <v-list
                  v-else
                  lines="three"
                  align="center"
                >
                  <v-list-item
                    v-for="(item, index) in item.table.items"
                    :key="index"
                  >
                    <v-list-item-title>
                      {{ item.text }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.price }} - {{$t("pricing.per_hour")}}
                    </v-list-item-subtitle>
                    {{ item.description }}
                  </v-list-item>
                </v-list>
              </template>
            </FeatureCard>
          </v-container>
        </v-window-item>
      </v-window>
    </v-card-text>
    <v-card-actions class="mb-4">
        <v-row justify="space-around">
          <v-col cols="auto">
            <v-btn
              icon="mdi-chevron-left"
              color="primary"
              variant="outlined"
              class="bg-surface"
              :disabled="window === 0"
              @click="window = window > 0 ? window-1 : items.length-1"
            />
          </v-col>
          <v-col cols="auto">
            <v-btn
              icon="mdi-chevron-right"
              color="primary"
              variant="outlined"
              class="bg-surface"
              :disabled="$vuetify.display.mobile ? window === items.length-1 : window === items.length-2"
              @click="window = window < items.length-1 ? window+1 : 0"
            />
          </v-col>
        </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import FeatureCard from "../utils/FeatureCard.vue";
export default {
  name: "PricingGalleryCard",
  components: {
    FeatureCard,
  },
  data: function () {
    return {
      window: 0,
    };
  },
  computed: {
    pricing() {
      return this.$tm("pricing");
    },
    items() {
      return this.pricing.items || [];
    },
    title() {
      return this.pricing.title || "";
    },
    description() {
      return this.pricing.description || "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
