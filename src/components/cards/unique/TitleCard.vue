<template>
  <FeatureCard
    i18n-key="title"
    max-height="90vh"
  >
  <template #title><span/></template>
  <template #description><span/></template>
     <!-- <v-card-title class="title-card-title text-card-title-text">
       <div :class="{'text-h5': !isMobile, 'text-h5': isMobile}">{{ $t("title_card_title") }}</div>
     </v-card-title> -->
     <template #default="{parseMarkdownToHtml : parse, item : i18nItem}">
    <v-card-text class="w-80 text-center ">
      <v-row class="mb-4">
        <v-col class="">
          <div class="image-container">
            <v-img
              src="@/assets/title-card-image.png"
              contain
              height="100%"
              width="100%"
            />
          </div>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col>
          <p class="text-card-description-text" v-html="parse(i18nItem.description)"></p>
        </v-col>
      </v-row>
    </v-card-text>
  </template>
  <template #actions>
    <v-card-actions class="d-flex justify-center">
      <ContactDialog :modelValue="showDialog" @update:modelValue="showDialog = $event" />
      <CTAButton
        size="x-large"
        class="mb-4"
        >
      </CTAButton>
    </v-card-actions>
  </template>
  </FeatureCard>
</template>

<script>
import CTAButton from "@/components/buttons/CTAButton.vue";
import FeatureCard from "../utils/FeatureCard.vue";
import ContactDialog from "../contact/ContactDialog.vue";
export default {
  name: "TitleCard",
  components: {
    CTAButton,
    FeatureCard,
    ContactDialog,
  },
  data() {
    return {
      showDialog: false,
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify?.display?.mobile;
    },
  },
};
</script>

<style lang="css" scoped>
.image-container {
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-card {
  /* max-height: calc(100vh - 120px); */
  display: flex;
  flex-direction: column;
}
.title-card-title {
  word-wrap: break-word;
  height: auto;
  line-height: 1.2;
  overflow-wrap: break-word;
  hyphens: auto;
}
</style>
