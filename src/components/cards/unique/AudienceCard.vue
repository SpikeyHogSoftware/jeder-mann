<template>
  <FeatureCard i18n-key="target_audiences">
    <template #default="{ parseMarkdownToHtml, items }">
      <v-card-actions v-if="!$vuetify.display.mobile"  class="pb-0 mb-0">
      <v-row justify="space-around" v-if="!$vuetify.display.mobile" class="pb-0 mb-0" align="end">
          <v-col cols="auto" class="pb-0 mb-0">            <v-btn
              icon="mdi-chevron-left"
              color="primary"
              variant="outlined"
              class="bg-surface"
              :disabled="window === 0"
              @click="window = window > 0 ? window-1 : Math.floor(items.length/2)-1"
            />
          </v-col>
          <v-col cols="auto" class="pb-0 mb-0">
            <v-btn
              icon="mdi-chevron-right"
              color="primary"
              variant="outlined"
              class="bg-surface"
              :disabled="window === Math.floor(items.length/2)-1"
              @click="window = window < Math.floor(items.length/2)-1 ? window+1 : 0"
            />
          </v-col>
        </v-row>
      </v-card-actions>
      <v-card-text >
      
        <v-window
          v-model="window"
          v-if="!$vuetify.display.mobile"
        >
          <v-window-item
            v-for="(group, groupIndex) in groupBy(items, 2)"
            :key="`group-${groupIndex}`"
            class="pa-3 mt-0"
          >
            <v-row class="fill-height">
              <v-col
                :cols="$vuetify.display.mobile ? 12 : 6"
                v-for="(item, index) in group"
                :key="`group-${groupIndex}-item-${index}`"
                class="fill-height pb-6"
              >
                <InfoCard
                  variant="append"
                  :display-show-more-button="false"
                  :switch-on-hover="!$vuetify.display.mobile"
                  :switch-on-click="$vuetify.display.mobile"
                >
                  <template #prepend>
                    <v-card-title class="text-card-title-text">
                      <span v-html="parseMarkdownToHtml(item.title)" />
                    </v-card-title>
                  </template>
                  <template #front="{flipped}"
                    ><v-card-text class="pt-0 mt-0" :class="{'mb-4': !$vuetify.display.mobile && !flipped}">
                      <v-row>
                        <v-col
                          cols="12"
                          align="center"
                        >
                          <v-icon
                            size="64"
                            color="accent"
                            >{{ item.icon }}</v-icon
                          >
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </template>
                  <template #back>
                    <v-card-text class="pt-0 mt-0">
                      <v-row>
                        <v-col align="center">
                          <div v-html="parseMarkdownToHtml(item.description)" />
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </template>
                </InfoCard>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
        <div v-if="$vuetify.display.mobile">
          <v-row
            v-for="(item, index) in items"
            :key="index"
          >
            <v-col :cols="12">
              <InfoCard
                :flat="$vuetify.display.mobile"
                variant="append"
                :display-show-more-button="false"
                :switch-on-hover="!$vuetify.display.mobile"
                :switch-on-click="$vuetify.display.mobile"
              >
                <template #prepend>
                  <v-card-title class="text-card-title-text">
                    <span v-html="parseMarkdownToHtml(item.title)" />
                  </v-card-title>
                </template>
                <template #front>
                  <v-card-text>
                    <v-row>
                      <v-col
                        cols="12"
                        align="center"
                      >
                        <v-icon
                          size="64"
                          color="accent"
                          >{{ item.icon }}</v-icon
                        >
                      </v-col>
                    </v-row>
                  </v-card-text>
                </template>
                <template #back>
                  <v-card-text>
                    <v-row>
                      <v-col align="center">
                        <div v-html="parseMarkdownToHtml(item.description)" />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </template>
              </InfoCard>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </template>
  </FeatureCard>
</template>

<script>
import FeatureCard from "@/components/cards/utils/FeatureCard.vue";
import InfoCard from "@/components/cards/utils/InfoCard.vue";
export default {
  name: "TargetAudienceCard",
  components: {
    FeatureCard,
    InfoCard,
  },
  data: function () {
    return {
      window: 0,
      items : [],
    };
  },
  methods: {
    *groupBy(items, amount) {
      for (let i = 0; i < items.length; i += amount) {
        yield items.slice(i, i + amount);
      }
    },
  },
};
</script>
