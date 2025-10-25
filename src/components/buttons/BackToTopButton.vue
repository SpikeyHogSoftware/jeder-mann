<template>
  <v-fade-transition>
  <v-fab
    v-show="visible"
    fixed
    bottom
    right
    color="back_to_top_button_color"
    app
    variant="outlined"
    icon
    size="x-large"
    location="bottom right"
    @click="scrollToTop"
    :class="{'shift' : $vuetify.display.mobile}"
  >
    <v-icon size="x-large">{{ icon }}</v-icon>
  </v-fab></v-fade-transition>
</template>

<script>
  export default {
    name: "BackToTopButton",
    data() {
      return {
        visible: false,
        alternate : false,
        icon : "mdi-chevron-up",
      };
    },
    methods: {
      scrollToTop($event) {
        // if alt key pressed, scroll to bottom
        if ($event.altKey) {
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },
      handleScroll() {
        this.visible = window.scrollY > 100;
      },
      handleKeyDown($event) {
        if ($event.altKey) {
          this.icon = "mdi-chevron-down";
          this.alternate = true;
          this.visible = true;
        }
      },
      handleKeyUp($event) {
        if (!$event.altKey && this.alternate) {
          this.icon = "mdi-chevron-up";
          this.alternate = false;
          this.handleScroll();

        }
      },
    },
    mounted() {
      window.addEventListener("scroll", this.handleScroll);
      window.addEventListener("keydown", this.handleKeyDown);
      window.addEventListener("keyup", this.handleKeyUp);
    },
    beforeUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
      window.removeEventListener("keydown", this.handleKeyDown);
      window.removeEventListener("keyup", this.handleKeyUp);
    },
  };
</script>

<style lang="scss" scoped>
.shift {
  transform: translateY(-72px) !important;
}
</style>