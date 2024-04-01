import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { INGREDIENTS_URL, COCKTAILS_BY_INGR_URL } from "../constants";

export const useRootStore = defineStore("root", () => {
  const ingredient = ref(null);
  const ingredients = ref([]);
  const cocktails = ref([]);

  async function getIngredients() {
    const data = await axios.get(INGREDIENTS_URL);
    ingredients.value = data?.data?.drinks;
  }

  async function getCocktails(ingredient) {
    console.log(ingredient);
    const data = await axios.get(`${COCKTAILS_BY_INGR_URL}${ingredient}`);
    cocktails.value = data?.data?.drinks;
  }

  function setIngredient(val) {
    ingredient.value = val;
    cocktails.value = [];
  }

  return {
    ingredients,
    cocktails,
    ingredient,
    getIngredients,
    getCocktails,
    setIngredient,
  };
});
