<template>
  <TheNavbar @dialog:show="toggleDialog" />
  <v-main>
    <v-container v-if="!$vuetify.display.mobile" class="pt-0 mt-0 fill-height fluid text-generic">
      <router-view />
    </v-container>
      <router-view v-else />
  </v-main>
  <TheFooter />
  <BackToTopButton />
  <ContactDialog :modelValue="dialog" @update:modelValue="dialog = $event" /> <!-- gets activated via the store -->
</template>

<script>
import TheNavbar from "@/components/special/TheNavBar.vue";
import TheFooter from "@/components/special/TheFooter.vue";
import BackToTopButton from "@/components/buttons/BackToTopButton.vue";
import ContactDialog from "@/components/cards/contact/ContactDialog.vue";
export default {
  name: "DefaultLayout",
  components: {
    TheNavbar,
    TheFooter,
    BackToTopButton,
    ContactDialog,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style scoped>
.page_background {
  background-color: var(--v-page_background);
}
.custom-padding {
  padding: 0px 8px 0px 8px !important;
}
</style>
