<template>
  <v-divider
    color="accent"
    opacity="1"
  />
  <v-footer
    class="text-center"
    id="the_footer"
  >
    <v-row justify="space-between">
      <v-col
        :cols="$vuetify.display.mobile ? 12 : 7"
        class="text-start"
      >
        <v-row
          ><v-col cols="12"
            ><span class="text-accent text-h5">{{
              $t("brandname")
            }}</span></v-col
          ></v-row
        >
        <v-divider
            class="my-1"
          color="accent"
          opacity=".6"
        ></v-divider>
        <v-row
          ><v-col cols="11"
            ><p>{{ $t("footer.description") }}</p></v-col
          ></v-row
        >
        <v-row
          align="end"
          justify="center"
          class="bottom-footer-buttons ma-2"
        >
          <v-col
            cols="auto"
          >
            <v-btn
              icon
              color="accent"
              @click="toggleTheme"
              variant="text"
              tile
              density="compact"
            >
              <v-icon>mdi-theme-light-dark</v-icon>
            </v-btn>
          </v-col>
          <v-divider
            v-if="false"
            vertical
            inset
            thickness="1"
            opacity=".6"
            color="accent"
            class="my-2"
          ></v-divider>
          <v-col cols="auto" v-if="false">
            <v-btn-toggle
              v-model="$i18n.locale"
              variant="elevated"
              tile
              rounded="lg"
              base-color="accent" 
              border="accent"
              density="compact"
            >
              <v-btn
                v-for="locale in $i18n.availableLocales"
                :key="locale"
                variant="outlined"
                :value="locale"
                color="accent"
              >
                {{ locale }}
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </v-col>
      <v-col :cols="$vuetify.display.mobile ? 12 : 5">
        <v-row
          class="text-start"
          justify="space-around"
        >
          <v-col cols="auto">
            <v-list
              density="compact"
              nav
            >
              <v-list-item
                class="text-center text-accent"
                :title="$t('footer.legal')"
              ></v-list-item>
              <v-divider color="accent" opacity=".6"></v-divider>
              <v-list-item
                nav
                density="compact"
                :to="'/legal/privacy'"
                :subtitle="$t('footer.privacy')"
              ></v-list-item>
              <v-list-item
                nav
                density="compact"
                :to="'/legal/disclaimer'"
                :subtitle="$t('footer.disclaimer')"
              ></v-list-item>
              <v-list-item
                nav
                density="compact"
                :to="'/legal/impressum'"
                :subtitle="$t('footer.impressum')"
              ></v-list-item>
            </v-list>
          </v-col>
          <v-col cols="auto">
            <v-list
              density="compact"
              nav
            >
              <v-list-item
                class="text-center text-accent"
                :title="$t('footer.menu')"
              ></v-list-item>
              <v-divider color="accent" opacity=".6"></v-divider>
              <v-list-item
                density="compact"
                :to="'/legal/about'"
                exact
                :subtitle="$t('footer.about')"
                base-color="onSurface"
              >
                <template #prepend>
                  <v-icon color="accent">mdi-information-outline</v-icon>
                </template>
              </v-list-item>
              <!-- <v-list-item
                class="highlightable"
                density="compact"
                :to="'/contact'"
                exact
                prepend-icon="mdi-file-document-outline"
                :subtitle="$t('footer.contact')"
              >
                <template #prepend>
                  <v-icon color="accent">mdi-file-document-outline</v-icon>
                </template>
              </v-list-item> -->
              <v-list-item
                class="highlightable"
                density="compact"
                prepend-icon="mdi-email-outline"
                :href="emailAddress"
                :subtitle="$t('footer.email_contact')"
              >
                <template #prepend>
                  <v-icon color="accent">mdi-email-outline</v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-col>
          <!-- <v-col
            align="start"
            cols="auto"
          >
            <v-list
              density="compact"
              class="highlightable"
              nav
            >
              <v-list-item
                class="text-center text-accent"
                :title="$t('footer.social')"
              ></v-list-item>
              <v-divider color="accent" opacity=".6"></v-divider>
              <v-list-item density="compact">
                <v-btn
                  icon
                  tile
                  variant="plain"
                  color="accent"
                >
                  <v-icon>mdi-facebook</v-icon>
                </v-btn>
                <v-btn
                  icon
                  tile
                  variant="plain"
                  color="accent"
                >
                  <v-icon>mdi-instagram</v-icon>
                </v-btn>
                <v-btn
                  icon
                  tile
                  variant="plain"
                  color="accent"
                >
                  <v-icon>mdi-twitter</v-icon>
                </v-btn>
                <v-btn
                  icon
                  tile
                  variant="plain"
                  color="accent"
                >
                  <v-icon>mdi-linkedin</v-icon>
                </v-btn>
              </v-list-item>
            </v-list>
          </v-col> -->
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "FooterComponent",
  computed: {
    emailAddress() {
      return "mailto:" + this.$t("contact.email_address");
    },
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.global.name =
        this.$vuetify.theme.global.name === "dark" ? "light" : "dark";
    },
  },
};
</script>

<style lang="css" scoped>
</style>
