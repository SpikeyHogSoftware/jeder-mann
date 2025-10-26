<template>
  <v-card
    height="100%"
    class="d-flex flex-column justify-space-around mx-1 pb-5"
    @click="if (switchOnClick) toggleFlipState();"
    @mouseenter="if (switchOnHover) toggleFlipState();"
    @mouseleave="if (switchOnHover) toggleFlipState();"
    
  > <div class="mt-2">
    <slot name="prepend" v-bind="{toggleFlipState, flipped}"/>
  </div>
    <template v-if="isFlipStyle">
      <div
        class="flip-container flipper"
        :class="{ flipped: flipped }"
      >
        <v-card-text class="front">
          <slot name="front" v-bind="{toggleFlipState, flipped}"/>
        </v-card-text>
        <v-card-text class="back">
          <slot name="back" v-bind="{toggleFlipState, flipped}" />
        </v-card-text>
      </div>
    </template>
    <template v-if="isFadeStyle">
      <!-- on fade turn down opacity of front slot 
       and overly the back slot -->

      <v-card-text >
        <div class="fade-content fill-height">
          <div
            class="fade-front d-flex flex-row align-center justify-center"
            :class="{ faded: flipped }"
          >
            <slot name="front" v-bind="{toggleFlipState, flipped}" />
          </div>
          <!-- Overlay back content -->
          <div
            class="fade-back"
            :class="{ visible: flipped }"
          >
            <slot name="back" v-bind="{toggleFlipState, flipped}" />
          </div>
        </div>
      </v-card-text>
    </template>
    <template v-if="isAppendStyle" >
      <v-card-text>
        <v-row>
          <slot name="front" v-bind="{toggleFlipState, flipped}"/>
        </v-row>
        <v-expand-transition >
        <v-row v-show="flipped">
            <slot name="back"  v-bind="{toggleFlipState, flipped}" />
          </v-row>
        </v-expand-transition>
      </v-card-text>
    </template>
    <slot name="append" v-bind="{toggleFlipState, flipped}">
      
    </slot>
    <slot name="actions" v-bind="{toggleFlipState, flipped}">
    <v-card-actions class="pb-0 mb-0" v-if="displayShowMoreButton">
                <v-row
                  class="pb-0 mb-0"
                  justify="center"
                >
                  <v-col
                    cols="auto"
                    class="pb-0 mb-0"
                  >
                    <v-btn
                      :icon="flipped ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                      color="accent"
                      size="x-small"
                      @click.stop="toggleFlipState()"
                      variant="outlined"
                    ></v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
    </slot>
  </v-card>
</template>

<script>
export default {
  name: "InfoCard",
  props: {
    modelValue : {
      type : Boolean,
      default : false,
    },
    switchOnHover: {
      type: Boolean,
      default: false,
    },
    switchOnClick: {
      type: Boolean,
      default: false,
    },
    displayShowMoreButton: {
      type: Boolean,
      default: false,
    },
    variant: {
      default: "flip",
      validator: (value) => {
        return ["flip", "fade", "append"].includes(value);
      },
    },
  },
  data: function () {
    return {
      flipped: this.$props.modelValue,
    };
  },
  computed: {
    isFlipStyle() {
      return this.variant.toLowerCase() == "flip";
    },
    isFadeStyle() {
      return this.variant.toLowerCase() == "fade";
    },
    isAppendStyle() {
      return this.variant.toLowerCase() == "append";
    },
  },
  methods: {
    toggleFlipState() {
      this.flipped = !this.flipped;
    },
  },
  watch : {
    flipped(newVal){this.$emit('update:modelValue',newVal)}
  }
};
</script>

<style type="text/css" scoped>
.flip-container {
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -o-perspective: 1000;
  perspective: 1000;
}
.flip-container {
  min-height: 120px;
}
.flipper {
  -moz-transform: perspective(1000px);
  -moz-transform-style: preserve-3d;
  transform: perspective(1000px);
  transform-style: preserve-3d;
  position: relative;
}
.front,
.back {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.6s;
  -webkit-transform-style: preserve-3d;
  -moz-transition: 0.6s;
  -moz-transform-style: preserve-3d;
  -o-transition: 0.6s;
  -o-transform-style: preserve-3d;
  -ms-transition: 0.6s;
  -ms-transform-style: preserve-3d;
  transition: 0.6s;
  transform-style: preserve-3d;
  top: 0;
  left: 0;
  width: 100%;
}
.back {
  -webkit-transform: rotateY(-180deg);
  -moz-transform: rotateY(-180deg);
  -o-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  position: absolute;
}
.flip-container.flipped .back {
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  transform: rotateY(0deg);
}
.flip-container.flipped .front {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
.front {
  z-index: 2;
}

/* Fade style animations */
.fade-content {
  position: relative;
}

.fade-front {
  transition: opacity 0.6s ease-in-out;
  opacity: 1;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.fade-front.faded {
  opacity: 0.1;
}

.fade-back {
  width: 100%;
  height: fit-content;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  padding: 16px;
  border-radius: 4px;
  z-index: 10;
}

.fade-back.visible {
  opacity: 1;
}
</style>
