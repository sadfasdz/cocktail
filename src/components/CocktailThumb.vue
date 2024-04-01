<script setup>
const props = defineProps({
  cocktail: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <RouterLink :to="`/cocktail/${cocktail.idDrink}`">
    <div class="root">
      <div
        :style="`background-image: url(${cocktail.strDrinkThumb}) `"
        class="pic"
      ></div>
      <div class="name">{{ cocktail.strDrink }}</div>
    </div>
  </RouterLink>
</template>

<style lang="sass" scoped>
@import '../assets/styles/main.sass'

.root
  display: flex
  flex-direction: column
  align-items: center

.pic
  width: 120px
  height: 120px
  margin: 0 ato
  background-repeat: no-repeat
  background-position: center
  background-size: 100%

.name
  width: 156px
  text-align: center
  padding-top:15px
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
</style>
