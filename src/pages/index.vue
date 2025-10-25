<template>
  <v-container :class="{'pa-0 ma-0': $vuetify.display.mobile}">
        <v-row><v-col><TitleCard id="title-card" /></v-col></v-row>
        <v-row><v-col><BenefitsCard id="benefits-card"/></v-col></v-row>
        <v-row><v-col><AudienceCard id="audience-card"/></v-col></v-row>
        <v-row><v-col><OffersCard id="offers-card"/></v-col></v-row>
        <v-row><v-col><MethodsCard id="methods-card"/></v-col></v-row>
        <v-row><v-col><TestimonialsCarousel id="testimonials-card"/></v-col></v-row>
        <v-row><v-col><PricingCard id="pricing-card"/></v-col></v-row>
        <v-row><v-col><FAQCard id="faq-card"/></v-col></v-row>
  </v-container>
  
  <CTAFAButton 
  v-if="$vuetify?.display?.mobile"
  />
</template>

<script>
import TitleCard from "@/components/cards/unique/TitleCard.vue";
import BenefitsCard from "@/components/cards/unique/BenefitsCard.vue";
import AudienceCard from "@/components/cards/unique/AudienceCard.vue";
import OffersCard from "@/components/cards/unique/OffersCard.vue";
import MethodsCard from "@/components/cards/unique/MethodsCard.vue";
import TestimonialsCarousel from "@/components/cards/unique/TestimonialsCarousel.vue";
import PricingCard from "@/components/cards/unique/PricingCard.vue";
import FAQCard from "@/components/cards/unique/FAQCard.vue";
import CTAFAButton from "@/components/buttons/CTAFAButton.vue";
export default {
  name: "App",

  components: {
    TitleCard,
    BenefitsCard,
    AudienceCard,
    OffersCard,
    MethodsCard,
    PricingCard,
    FAQCard,
    // FeatureGallery,
    TestimonialsCarousel,
    CTAFAButton,
    // SectionCard,
  },
  data() {
    return {
      tab1: null,
    };
  },
  mounted() {
    const options = { root: null, rootMargin: '0px', threshold: [0.25, 0.5, 0.75, 1] };
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible && visible.target && visible.target.id) {
        this.$store.commit('setCurrentSectionId', visible.target.id);
      }
    }, options);
    const sectionIds = [
      'title-card',
      'benefits-card',
      'audience-card',
      'offers-card',
      'methods-card',
      'testimonials-card',
      'pricing-card',
      'faq-card',
    ];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    this._sectionObserver = observer;
  },
  beforeUnmount() {
    if (this._sectionObserver) this._sectionObserver.disconnect();
  },
};
</script>
