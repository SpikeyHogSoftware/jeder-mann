<template>
  <v-btn
    variant="elevated"
    
    :rounded="rounded"
    :class="{'px-5' : rounded}"
    color="cta_button"
    class="text-cta_button_text"
    size="large"
    :href="emailAddress"
  >
    {{ $t("cta_button_text") }}
  
  </v-btn>
</template>

<script>
export default {
  name: "CTAButton",
  props: {
    rounded: {
      type: [Boolean, String],
      default: true,
    },
  },
  computed: {
    emailAddress() {
      return "mailto:" + this.$t("contact.email_address");
    },
  },
};
</script>

<style lang="scss" scoped></style>
