<template>
  <v-app-bar
    ref="the_navbar"
    flat
    color="the_navbar_background_color"
  >
    <v-row
     v-if="!$vuetify.display.mobile"
      class="ma-5 ml-0 py-0 my-0"
      align="center"
      justify="space-between"
    >
      <v-col
        cols="2"
        v-show="!$vuetify?.display?.mobile"
        class="py-0 my-0 fill-height"
      >
        <v-btn
          @click="handleBrandClick"
          variant="text"
          color="brand_button"
          icon
          tile
          height="100%"
          width="auto"
          class="border-t-0 border-s-0 border-e-0"
        >
          <v-img
            v-if="$vuetify.theme.current.name === 'dark'"
            src="@/assets/logo-wide-dark.png"
            height="64px"
            aspect-ratio
            width="auto"
          />
          <v-img
            v-else
            src="@/assets/logo-wide.png"
            height="64px"
            aspect-ratio
            width="auto"
          />
          <!-- <h3 v="">{{ $t("brandname") }}</h3> -->
        </v-btn>
      </v-col>
      <v-col
        cols="auto"
        align="center"
      >
        <v-tabs
          :model-value="$store.getters.currentSectionId"
          class="text-the_navbar_inactive_text_color"
          color="the_navbar_active_text_color"
          selected-class="was-selected"
          slider-color="the_navbar_slider_color"
        >
          <v-tab
            value="benefits-card"
            @click="scrollTo('benefits-card')"
            >{{ $t("benefits.title") }}</v-tab
          >
          <v-tab
            value="audience-card"
            @click="scrollTo('audience-card')"
            >{{ $t("target_audiences.title") }}</v-tab
          >
          <v-tab
            value="offers-card"
            @click="scrollTo('offers-card')"
            >{{ $t("offers.title") }}</v-tab
          >
          <v-tab
            value="methods-card"
            @click="scrollTo('methods-card')"
            >{{ $t("methods.title") }}</v-tab
          >
          <v-tab
            value="pricing-card"
            @click="scrollTo('pricing-card')"
            >{{ $t("pricing.title") }}</v-tab
          >
          <v-tab
            value="contact"
            @click="handleContactClick"
            >{{ $t("contact.literal") }}</v-tab
          >
        </v-tabs>
      </v-col>
      <v-col
        v-show="!$vuetify?.display?.mobile "
        cols="2"
        align="end"
      >
        <CTAButton
          v-show="!$route.path.endsWith('/contact')"
          :rounded="false"
        />
      </v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-col cols="auto">
        <v-btn
          variant="text"
          color="accent"
          icon
          tile
          width="auto"
          class="px-5"
        >
        <v-icon class="mr-2">mdi-menu</v-icon>
        {{ $t("brandname") }}
        <v-menu activator="parent"  location="bottom center" >
          <v-list density="compact" nav base-color="accent" >
            <v-list-item key="home"   @click="scrollTo('title-card')" prepend-icon="mdi-home">
              {{ $t("brandname") }}
            </v-list-item>
            <v-list-item v-for="item in menuItems.slice(0, -1)" :key="item.value" icon @click="scrollTo(item.value)" :prepend-icon="item.icon">
              {{ item.title }}
            </v-list-item>
            <v-list-item key="contact"  @click="handleContactClick" prepend-icon="mdi-message-text">
              {{ $t("contact.literal") }}
            </v-list-item>
          </v-list>
        </v-menu></v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import CTAButton from "@/components/buttons/CTAButton.vue";
// import BrandIcon from "@/components/icons/BrandIcon.vue";
// import MountainIcon from "@/components/icons/MountainIcon.vue";
export default {
  name: "TheNavBar",
  components: {
    CTAButton,
    // BrandIcon,
    // MountainIcon,
  },
  computed: {
    color() {
      return this.$vuetify.theme.current.colors.primary;
    },
    menuItems() {
      return [
        {
          title: this.$t("benefits.title"),
          value: "benefits-card",
          icon: "mdi-gift-outline",
        },
        {
          title: this.$t("target_audiences.title"),
          value: "audience-card",
          icon: "mdi-account-group-outline",
        },
        {
          title: this.$t("offers.title"),
          value: "offers-card",
          icon: "mdi-star-outline",
        }, 
        {
          title: this.$t("methods.title"),
          value: "methods-card",
          icon: "mdi-lightbulb-outline",
        },
        {
          title: this.$t("pricing.title"),
          value: "pricing-card",
          icon: "mdi-currency-usd-circle-outline",
        },
        {
          title: this.$t("contact.literal"),
          value: "contact",
        },
      ];
    },
    logo() {
      return this.$vuetify.theme.current.name === "dark" ? "logo-wide-dark.png" : "logo-wide.png";
    },
    publicPath() {
      return process.env.NODE_ENV === 'production' ? '/jeder-mann/' : '/';
    },
  },
  methods: {
    scrollTo(section) {
      const element = document.getElementById(section);
      if (element) {
        // get the element's offsetTop
        const offsetTop = element.offsetTop;
        // subtract the navbar height
        const navbarHeight = this.$refs.the_navbar.$el.offsetHeight;
        const scrollTo = offsetTop - navbarHeight;
        // console.log("", { offsetTop, scrollTo, navbarHeight });
        // scroll to the element
        window.scrollTo({ top: scrollTo, behavior: "smooth" });
      } else {
        // if we're already on the home page, do nothing
        if (window.location.pathname === this.publicPath) {
          return;
        }
        // if the element is not found, got to home page
        // then try again to scroll to the element
        this.$router.push(this.publicPath).then(() => {
          this.scrollTo(section);
        });
      }
    },
    handleContactClick() {
      window.scrollTo({ bottom: 0, behavior: "smooth" });
      const footer = document.getElementById("the_footer");
      footer.scrollIntoView({ behavior: "smooth" });
      const elements = footer.getElementsByClassName("highlightable");
      // console.log("elements", elements);
      for (const element of elements) {
        // console.log("element", element);
        element.classList.add("highlighted");
      }
      setTimeout(() => {
        for (const element of elements) {
          element.classList.remove("highlighted");
        }
      }, 6000);
    },
    handleBrandClick() {
      // if on home page, scroll to top
      if (window.location.pathname === this.publicPath) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        this.$router.push(this.publicPath);
      }
    },
  },
};
</script>

<style lang="scss">
@use "@/styles/settings" as *;
.was-selected {
  filter: brightness(1.5);
}
.highlightable {
  border: 2px solid transparent;
  border-radius: 10px;
  transition: border-color 0.5s ease;
}
.highlighted {
  border-color: var(--v-theme-accent); // using Vuetify's success color
  animation: borderPulse 4s infinite;
}

@keyframes borderPulse {
  0% {
    border-color: rgba(var(--v-theme-accent), 0); // using Vuetify's success color
  }
  25% {
    border-color: rgba(var(--v-theme-accent), 1); // full opacity
  }
  50% {
    border-color: rgba(var(--v-theme-accent), 0); // using Vuetify's success color
  }
  75% {
    border-color: rgba(var(--v-theme-accent), 1); // full opacity
  }
  100% {
    border-color: rgba(var(--v-theme-accent), 0); // using Vuetify's success color
  }
}
.brand-icon {
  margin-right: -25px;
  transform: translateX(-15px);
}
.mountain_icon {
  margin-right: -15px;
}
</style>
