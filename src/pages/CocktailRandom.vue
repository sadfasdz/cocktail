<script setup>
import AppLayout from "../components/AppLayout.vue";
import { ref, computed } from "vue";
import { COCKTAIL_RANDOM, INGREDIENT_PIC } from "../constants/api.js";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const cocktail = ref(null);

const ingredients = computed(() => {
  const ingredients = [];

  for (let i = 1; i < 15; i++) {
    if (!cocktail.value[`strIngredient${i}`]) break;

    const ingredient = cocktail.value[`strIngredient${i}`];

    ingredients.push(ingredient);
  }

  return ingredients;
});

async function getCocktailRandom() {
  const data = await axios.get(`${COCKTAIL_RANDOM}`);
  cocktail.value = data?.data?.drinks[0];
}

getCocktailRandom();
</script>

<template>
  <div v-if="cocktail">
    <AppLayout :imgUrl="cocktail.strDrinkThumb">
      <div class="wrapper">
        <div class="info">
          <div class="title">{{ cocktail.strDrink }}</div>
          <div class="line"></div>
          <div class="slider">
            <swiper :slides-per-view="3" :space-between="50" class="swiper">
              <swiper-slide
                class="slid"
                v-for="(ingredient, key) in ingredients"
                :key="key"
              >
                <img :src="`${INGREDIENT_PIC}${ingredient}-Small.png`" />
                {{ ingredient }}
              </swiper-slide>
            </swiper>
          </div>
          <div class="text">
            {{ cocktail.strInstructions }}
          </div>
        </div>
      </div>
    </AppLayout>
  </div>
  <div v-else>
    <AppLayout />
  </div>
</template>

<style lang="sass" scoped>
@import '../assets/styles/main.sass'

.slider
  padding: 50px 0

.swiper
  width: 586px

.slid
  display: flex
  flex-direction: column
  gap: 20px
</style>
