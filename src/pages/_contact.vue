<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <ContactForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ContactForm from "@/components/cards/contact/ContactFormCard.vue";
export default {
  name: "ContactPage",
  components: {
    ContactForm,
  },
};
</script>

<style lang="scss" scoped>
.contact-page {
  height: 100vh;
}
.contact-card {
  height: 100%;
}
</style>
