<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ROUTER_PATH } from "../constants";

import { Back } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();

const routeName = computed(() => route.name);

function goForCocktailRandom() {
  router.push(ROUTER_PATH.COCKTAIL_RANDOM);
  if (routeName.value === ROUTER_PATH.COCKTAIL_RANDOM) router.go();
}

const props = defineProps({
  imgUrl: {
    type: String,
    required: true,
  },
  goBack: {
    type: Function,
  },
  isBackButtonVisible: {
    type: Boolean,
    default: true,
  },
});

function goBack() {
  props.goBack ? props.goBack() : router.go(-1);
}
</script>

<template lang="">
  <div class="root">
    <div :style="`background-image: url(${imgUrl})`" class="img"></div>
    <div class="main">
      <div class="btns">
        <el-button
          type="primary"
          :icon="Back"
          circle
          class="back"
          @click="goBack()"
          v-if="isBackButtonVisible"
        />

        <el-button class="btn" @click="goForCocktailRandom"
          >get rundom cocktail</el-button
        >
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../assets/styles/main.sass'

.root
  display: flex
  min-height: 100vh
  background-color: $background

.img
  width:50%
  background-repeat: no-repeat
  background-position: center
  background-size: cover

.main
  position: relative
  width: 50%
  padding: 32px 40px

.btns
  display: flex
  justify-content: space-between
  align-items: center

.btn
  position: absolute
  top: 32px
  right:40px
  font-size: 16px
  font-family: 'Raleway'
  background-color: $accent
  border-color: $accent
  color: $text
  transition: all .3s ease

  &:hover
    transform: scale(1.1)
    background-color:(darken($accent, 10%))
    border-color:(darken($accent, 10%))
    transition: all .3s ease

.back
  background-color: transparent
  border-color: #fff
  transition: all .3s ease

  &:hover
    transform: scale(1.3)
    background-color:(darken($accent, 10%))
    border-color:(darken($accent, 10%))
    transition: all .3s ease
</style>
