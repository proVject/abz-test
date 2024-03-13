<script setup>
import * as Popper from "@popperjs/core";
import {onMounted, ref, nextTick, onUnmounted} from "vue";
import vClickOutside from '@/directives/click-outside';

const props = defineProps({
  // hover | click
  isOpen: {
    default: false,
    type: Boolean,
    required: false,
  },
  trigger: {
    type: String,
    required: false,
    default: 'hover',
  },
  /* todo handle too and add validator */
  /* "top" | "bottom" | "right" | "left" */
  /*"top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end";*/
  placement: {
    type: String,
    required: false,
    default: 'top'
  }
})

const isOpenLoc = ref(props.isOpen)
const trigger = ref(null)
const content = ref(null)
const popper = ref(null)
const isOpen = ref(false)

onMounted(() => {
  popper.value = Popper.createPopper(trigger.value, content.value, {
    placement: props.placement,
  });
})

onUnmounted(() => {
  popper.value.destroy()
})

const onClick = (value) => {
  if (props.trigger !== 'click') return
  if (typeof value !== 'boolean') {
    isOpenLoc.value = !isOpenLoc.value

  } else {
    isOpenLoc.value = value
  }
  nextTick(() => {
    popper.value.forceUpdate()
  })
}

const onMouseOver = () => {
  if (props.trigger !== 'hover') return

  isOpenLoc.value = true
  nextTick(() => {
    popper.value.forceUpdate()
  })
}
const onMouseOut = () => {
  if (props.trigger !== 'hover') return
  isOpenLoc.value = false
  nextTick(() => {
    popper.value.forceUpdate()
  })
}

</script>

<template>
  <div
      class="abz-tooltip" ref="trigger"
      @click="onClick"
      @mouseover="onMouseOver"
      @mouseout="onMouseOut"
      v-click-outside="() => onClick(false)"
  >
    <div class="abz-tooltip__trigger">
      <slot></slot>
    </div>
    <div class="abz-tooltip__content-container" ref="content">
      <transition name="fade">
        <div class="abz-tooltip__content-wrapper" v-if="isOpenLoc">
          <div class="abz-tooltip__content">
            <slot name="content"></slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.abz-tooltip {
  display: inline-flex;
}
.abz-tooltip__content-container{
  z-index: 10;
}

/* todo handle too */
/*"top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end";*/
.abz-tooltip__content-container[data-popper-placement="top"] {
  padding-bottom: 20px;
}

.abz-tooltip__content-container[data-popper-placement="bottom"] {
  padding-top: 20px;
}

.abz-tooltip__content-container[data-popper-placement="right"] {
  padding-left: 20px;
}

.abz-tooltip__content-container[data-popper-placement="left"] {
  padding-right: 20px;
}

.abz-tooltip__content-wrapper {
  z-index: 10;
}

.abz-tooltip__content {
  border-radius: 3px;
  padding: 3px 16px;
  background-color: var(--black-86-color);
  color: #ffffff;
}
</style>