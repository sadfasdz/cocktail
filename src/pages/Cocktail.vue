<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { COCKTAILS_BY_ID } from "../constants/api.js";
import axios from "axios";

import AppLayout from "../components/AppLayout.vue";

const route = useRoute();

const cocktailId = computed(() => route.path.split("/").pop());
const cocktail = ref(null);
const ingredients = computed(() => {
  const ingredients = [];

  for (let i = 1; i < 15; i++) {
    if (!cocktail.value[`strIngredient${i}`]) break;

    const ingredient = {};

    ingredient.name = cocktail.value[`strIngredient${i}`];
    ingredient.measure = cocktail.value[`strMeasure${i}`];

    ingredients.push(ingredient);
  }

  return ingredients;
});

async function getCocktailById() {
  const data = await axios.get(`${COCKTAILS_BY_ID}${cocktailId.value}`);
  cocktail.value = data?.data?.drinks[0];
}

getCocktailById();
</script>

<template>
  <div v-if="cocktail">
    <AppLayout :imgUrl="cocktail.strDrinkThumb">
      <div class="wrapper">
        <div class="info">
          <div class="title">{{ cocktail.strDrink }}</div>
          <div class="line"></div>
          <div class="list">
            <div
              v-for="(ingredient, key) in ingredients"
              :key="key"
              class="list-item"
            >
              {{ ingredient.name }}
              <template v-if="ingredient.measure">
                | {{ ingredient.measure }}
              </template>
            </div>
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
</style>
