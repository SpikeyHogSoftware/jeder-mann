<template>
  <FeatureCard i18n-key="testimonials">
    <template #default="{ parseMarkdownToHtml: parse, items }">
      <v-card-text class="px-0 justify-center d-flex">
        <v-slide-group
          v-model="currentIndex"
          show-arrows
          center-active
          
        >
          <template #prev="{ prev }">
            <v-btn
              icon="mdi-chevron-left"
              color="accent"
              variant="plain"
              class="bg-surface"
              :disabled="currentIndex === 0"
              
              size="large"
              tile
              @click="prev"
            />
          </template>
          <template #next="{ next }">
            <v-btn
              icon="mdi-chevron-right"
              color="accent"
              variant="plain"
              class="bg-surface"
              :disabled="currentIndex === items.length - 1"
              size="large"
              tile
              @click="next"
            />
          </template>
          <v-slide-group-item
            v-for="(testimonial, index) in items"
            :key="`testimonial-${index}`"
          >
            <v-card
              class="testimonial-card ma-2"
              :class="{ 'testimonial-card-multiple': items.length > 1 }"
            >
              <v-card-title class="text-card-title-text">
                <v-avatar>
                  <v-img
                    v-if="testimonial.avatar"
                    :src="testimonial.avatar"
                  />
                  <v-icon
                    color="card-title-text"
                    v-else
                    >mdi-account-circle-outline</v-icon
                  >
                </v-avatar>
                {{ testimonial.name }}
              </v-card-title>
              <v-card-text v-if="testimonial.text?.length > 0">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <span v-html="parse(testimonial.text)" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-card-text>
    </template>
  </FeatureCard>
</template>

<script>
import FeatureCard from "../utils/FeatureCard.vue";
export default {
  name: "TestimonialGallery",
  components: {
    FeatureCard,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    testimonials() {
      return this.$tm("testimonials.items").filter(({ skip }) => !skip);
    },
  },
};
</script>

<style lang="css" scoped>
.testimonial-card {
  max-width: 80vw;
}
.testimonial-card-multiple {
  max-width: 60vw;
}
</style>
