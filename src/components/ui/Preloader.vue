<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    required: false
  }
})
</script>

<template>
 <transition name="fade">
   <div class="abz-loader" v-if="isLoading">
     <div class="lds-ring">
       <div></div>
       <div></div>
       <div></div>
       <div></div>
     </div>
   </div>
 </transition>
</template>

<style>
.abz-loader{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: var(--preloader-background-color);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 70px;
  height: 70px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 60px;
  height: 60px;
  margin: 5px;
  border: 5px solid var(--secondary-color);
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--secondary-color) transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>