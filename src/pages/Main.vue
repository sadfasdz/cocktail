<script setup>
import { ref } from "vue";

import AppLayout from "../components/AppLayout.vue";
import CocktailThumb from "../components/CocktailThumb.vue";

import { useRootStore } from "../stores/root.js";
import { storeToRefs } from "pinia";

const rootStore = useRootStore();
rootStore.getIngredients();

const { ingredients, cocktails, ingredient } = storeToRefs(rootStore);

function getCocktails() {
  rootStore.getCocktails(rootStore.ingredient);
}

function removeIngredient() {
  rootStore.setIngredient(null);
}
</script>

<template>
  <AppLayout
    imgUrl="src/assets/images/bg-1.jpg"
    :goBack="removeIngredient"
    :isBackButtonVisible="!!ingredient"
  >
    <div class="wrapper">
      <div v-if="!ingredient || !cocktails" class="info">
        <div class="title">Choose your dink</div>
        <div class="line"></div>
        <div class="select-wrapper">
          <el-select
            v-model="rootStore.ingredient"
            placeholder="Choose your ingredient"
            size="large"
            filterable
            allow-create
            class="select"
            @change="getCocktails()"
          >
            <el-option
              v-for="item in ingredients"
              :key="item.strIngredient1"
              :label="item.strIngredient1"
              :value="item.strIngredient1"
            ></el-option>
          </el-select>
        </div>
        <div class="text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae
          excepturi nostrum, totam pariatur quo quasi tempora obcaecati
          consequatur doloremque saepe, reprehenderit vitae? Accusamus esse
          necessitatibus veniam in rem vitae sapiente?
        </div>
        <img class="img" src="/src/assets/images/166586588.png" />
      </div>

      <div v-else class="info">
        <div class="title">COCKTAILS WITH {{ ingredient }}</div>
        <div class="line"></div>
        <div class="cocktails">
          <CocktailThumb
            v-for="cocktail in cocktails"
            :key="cocktail.idDrink"
            :cocktail="cocktail"
            class="cocktail"
          />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<style lang="sass" scoped>
@import '../assets/styles/main.sass'


.select-wrapper
  padding-top: 50px

.select
  width: 220px
  color: #fff
  transition: all .3s ease

  &:focus-within
    transform: scale(1.3)
    transition: all .3s ease


.img
  margin-top: 60px

.cocktails
  display: flex
  flex-wrap: wrap
  align-items: center
  gap: 40px

  max-height: 700px
  overflow-y: auto
  overflow-x: hidden

  margin-top: 30px
  padding: 30px

  &::-webkit-scrollbar
      width: 0.3125rem

      &-button
        background-color: #fff
        height: 0.3125rem

      &-thumb
        border-radius: 10px
        background-color: #ff0f82

      &-track
        background-color: #d3d3d3
        border: 0.0625rem solid #d3d3d3
        border-radius: 0.125rem


.cocktail
  transition: all .3s ease
  overflow-x: visible
  z-index: 1


  &:hover
    transform: scale(1.3)
    transition: all .3s ease
</style>
