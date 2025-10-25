<template>
    <FeatureCard i18n-key="testimonials">
      <template #default="{ parseMarkdownToHtml: parse, items }">
        <v-card-text :class="{'pa-0 ma-0': $vuetify.display.mobile}">
          <v-container :class="{'pa-0 ma-0': $vuetify.display.mobile}">
            <v-row justify="center">
              <v-col cols="auto">
                <v-slide-group
                  v-model="currentIndex"
                  show-arrows
                  center-active
                >
                  <v-slide-group-item
                    v-for="(testimonial, index) in items"
                    :key="`testimonial-${index}`"
                  >
                    <v-card class="testimonial-card">
                      <v-card-title class="text-card-title-text">
                        <v-avatar >
                          <v-img
                            v-if="testimonial.avatar"
                            :src="testimonial.avatar"
                          />
                          <v-icon color="card-title-text" v-else>mdi-account-circle-outline</v-icon>
                        </v-avatar>
                        {{ testimonial.name }}
                      </v-card-title>
                      <v-card-text>
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
              </v-col>
            </v-row>
          </v-container>
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

<style lang="css" scoped></style>
