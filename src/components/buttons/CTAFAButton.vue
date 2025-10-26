<template>
  <v-fab
    fab
    app
    icon
    location="right bottom"
    variant="outlined"
    size="x-large"
    color="mobile_cta_fab_color"
  >
    <v-icon size="x-large">mdi-message-text-outline</v-icon>
    <v-speed-dial
      direction="up"
      activator="parent"
      location="right bottom"
      transition="slide-y-transition"

    >
      <v-list base-color="accent">
        <v-list-item
          prepend-icon="mdi-email"
          :to="'/contact'"
          key="email"
        >
          {{ $t("cta_button_text") }}
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-phone"
          @click="handlePhoneClick"
          key="phone"
        >
          {{ $t("contact.phone_button_text") }}
        </v-list-item>
        <!-- <v-list-item
          prepend-icon="mdi-whatsapp"
          @click="handleWhatsappClick"
          key="whatsapp"
        >
          {{ $t("contact.whatsapp_button_text") }}
        </v-list-item> -->
        </v-list
      >
    </v-speed-dial>
  </v-fab>
</template>

<script>
export default {
  name: "CTAFAButton",
  methods: {
    handlePhoneClick() {

      window.open(`tel:${this.phoneNumber}`, "_blank");
    },
    handleWhatsappClick() {
      window.open(`https://wa.me/${this.whatsappNumber}`, "_blank");
    },
  },
  computed: {
    phoneNumber() {
      return this.$t("contact.phone_number");
    },
    whatsappNumber() {
      return this.$t("contact.whatsapp_number");
    },
  }
};
</script>

<style lang="scss" scoped></style>
