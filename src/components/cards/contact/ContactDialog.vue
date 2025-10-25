<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    height="100vh"
    class="fill-height"
  >
    <ContactForm
      @dismiss="handleFormDismiss"
      @reset="handleFormDismiss"
      @submit:success="handleFormSuccess"
    />
    <template #activator="{props}">
      <slot name="activator" v-bind="props" />
    </template>
  </v-dialog>
  
</template>

<script>
import ContactForm from "./ContactFormCard.vue";
export default {
  name: "ContactDialog",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ContactForm,
  },
  data() {
    return {
      dialog: this.modelValue,
    };
  },
  methods: {
    handleFormDismiss() {
      this.dialog = false;
    },
    handleFormSuccess() {
      setTimeout(() => {
        this.dialog = false;
      }, 1500);
    },
  },
  watch: {
    modelValue(value) {
      this.dialog = value;
    },
    dialog(value) {
      this.$emit("update:modelValue", value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
