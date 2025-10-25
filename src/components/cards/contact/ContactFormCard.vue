<template>
  <v-form
    @submit.prevent="submitForm"
    @reset="resetForm"
    ref="form"
    validate-on="submit"
  >
  <v-card
    class="bg-surface pt-2"
    :disabled="isLoading"
    :loading="isLoading"
    flat
    
  >
    <v-card-title class="text-center text-card-title-text">
      <v-row justify="center" align="center" >
        <v-col cols="11" align="center" >
          <span class="text-h3 text-card-title-text">{{ $t("contact.title") }}</span>
        </v-col>
        <v-col cols="11" align="center" >
          <v-divider color="primary" opacity="0.5" thickness="2"></v-divider>
        </v-col>
      </v-row>
    </v-card-title>
    <v-expand-transition>
    <v-card-text v-show="showErrorMessage">
      <v-row
        justify="center"
        align="center"
      >
        <v-col cols="12" align="center">
          <b class="text-error" v-show="error === true">{{ $t("contact.contact_form_error_messages.error") }}</b>
          <b class="text-success" v-show="error === false">{{ $t("contact.contact_form_success_message") }}</b>
        </v-col>
      </v-row>
    </v-card-text>
    </v-expand-transition>
    <v-card-text class="py-0 my-0">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="form.name"
              :label="$t('contact.name')"
              :rules="[...rules.name]"
              variant="outlined"
              rounded="lg"
              name="name"
              base-color="accent"
              color="accent"
              icon-color="accent"
              prepend-inner-icon="mdi-account"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="8"
          >
            <v-text-field
              v-model="form.email"
              :label="$t('contact.email')"
              :rules="[...rules.email]"
              variant="outlined"
              rounded="lg"
              name="email"
              base-color="accent"
              color="accent"
              icon-color="accent"
              prepend-inner-icon="mdi-email"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="form.message"
              :label="$t('contact.message')"
              :rules="[...rules.message]"
              variant="outlined"
              rounded="lg"
              name="message"
              base-color="accent"
              color="accent"
              icon-color="accent"
              prepend-inner-icon="mdi-message"
              :counter="-50"
            >
              <template #counter>
                <span
                  class="text-caption"
                  :class="{
                    'text-error': form.message.length < rules.minLengthMessage,
                    'text-success': form.message.length >= rules.minLengthMessage,
                  }"
                >
                  {{ form.message.length }} / {{ rules.minLengthMessage }}
                </span>
              </template>
            </v-textarea>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          class="mt-0 pt-0"
        >
          <v-col cols="10" align="center" class="mt-0 pt-0">
            <v-divider color="primary" opacity="0.5" thickness="2"></v-divider>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions class="pb-2 mb-2">
      <v-row
        class="flex-row-reverse"
        justify="space-around"
      >
        <v-col cols="auto">
          <v-btn
            variant="text"
            :color="error ? 'error' : 'send_contact_button'"
            type="submit"
            v-show="!isLoading || error === null"
            :loading="isLoading"

            :disabled="isLoading"
            >
            
            <span v-show="error === null">{{ $t("contact.submit") }}</span>
            <v-icon v-show="error === null" class="ml-2">mdi-send</v-icon>
            </v-btn
            >
            <v-icon color="success" v-show="isLoading && error === false" size="36px">mdi-check-circle</v-icon>
            <v-icon color="warning" v-show="isLoading && error === true" size="36px">mdi-alert-circle</v-icon>
        </v-col>
        <v-col cols="auto">
          <v-btn
            variant="text"
            color="reset_button"
            @click="resetForm"
            >
            {{ $t("contact.reset") }}</v-btn
          >
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
  <!-- <v-card v-show="loading">
    <v-card-text>
      <v-row
        justify="center"
        align="center"
        class="fill-height"
      >
        <v-col
          cols="auto"
          class="text-center pb-0 mb-0"
        >
          <v-icon
            size="100px"
            v-show="querying"
            class="mdi-spin"
            >mdi-loading</v-icon
          >
          <v-icon
            color="success"
            size="100px"
            v-show="!querying"
            >mdi-check-circle-outline</v-icon
          >
        </v-col>
        <v-col
          cols="12"
          class="text-center pt-0 mt-0"
          v-show="!querying"
        >
          {{ $t("contact.contact_form_success_message") }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card> -->
</v-form>
</template>

<script>
import emailjs from '@emailjs/browser';
export default {
  name: "ContactForm",
  emits: ["dismiss", "reset", "submit:success", "submit:error"],
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        name: "",
        email: "",
        message: "",
      }),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    
  },
  data() {
    return {
      isLoading: this.loading,
      error: null,
      stateIcon: 'mdi-send',
      form: {
        name: "",
        email: "",
        message: "",
        ...this.modelValue,
      },
      showErrorMessage: false,
    };
  },
  computed: {
    rules() {
      const min_length_name = 2;
      const min_length_message = 1;
      return {
        minLengthName: min_length_name,
        minLengthMessage: min_length_message,
        required: (value) =>
          !!value || this.$t("contact.contact_form_error_messages.required"),
        minLength: (size) => (value) =>
          value.length >= size ||
          this.$t("contact.contact_form_error_messages.minLength", { size }),
        email: [
          (v) => !!v || this.$t("contact.contact_form_error_messages.email"),
          (v) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return (
              emailRegex.test(v) ||
              this.$t("contact.contact_form_error_messages.email")
            );
          },
        ],
        name: [
          (value) =>
            value.length > 0 ||
            this.$t("contact.contact_form_error_messages.name"),
          (value) =>
            value.length >= min_length_name ||
            this.$t("contact.contact_form_error_messages.name"),
        ],
        message: [
          (value) =>
            value.length > 0 ||
            this.$t("contact.contact_form_error_messages.message"),
          (value) =>
            value.length >= min_length_message ||
            this.$t("contact.contact_form_error_messages.message"),
        ],
      };
    },
  },
  methods: {
    resetForm() {
      this.form = {
        name: "",
        email: "",
        message: "",
      };
      this.$emit("reset");
    },
    dismissForm() {
      this.form = {
        name: "",
        email: "",
        message: "",
      };
      this.$emit("dismiss");
    },
    submitForm() {
      this.$refs.form.validate().then(({ valid }) => {
        if (valid) {
          this.isLoading = true;
          const payload = {
            name: this.form.name,
            email: this.form.email,
            message: this.form.message,
          };
          this.sendEmail(payload).then(() => {
            this.error = false;
            this.$emit("submit:success");
            this.form = {
              name: "",
              email: "",
              message: "",
            };
            this.showErrorMessage = true
          }).catch(() => {
            this.error = true;
            this.showErrorMessage = true;
            this.$emit("submit:error");
            this.isLoading = false;
          }).finally(() => {
            setTimeout(() => {
              this.isLoading = false;
              this.error = null;
            }, 2500);
          });
        } 
      });
    },
    
    async sendEmail({name = "", email = "", message = ""}) {
      return emailjs
        .send(process.env.VUE_APP_EMAILJS_SERVICE_ID, process.env.VUE_APP_EMAILJS_TEMPLATE_ID, {
          name: name,
          email: email,
          message: message,
        }, {
          publicKey: process.env.VUE_APP_EMAILJS_PUBLIC_KEY,
        })
    },
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
