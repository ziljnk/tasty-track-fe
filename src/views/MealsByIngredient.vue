<template>
  <div class="p-8 pb-0">
    <h1 class="text-4xl font-bold mb-4 text-orange-500">Meals for {{ route.params.ingredient }}</h1>
  </div>

  <div class="meal-grid">
    <div class="meal-item" v-for="(item, index) in meals" :key="index" @click="handleClickDetails(item)">
      <div class="meal-header">
        <img :src="item.image" :alt="item.title" class="rounded-t-xl w-full h-48 object-cover" />
      </div>
      <div class="meal-body">
        <h3 class="font-bold">{{ item.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import store from "../store";

const route = useRoute();
const ingredient = computed(() => store.state.ingredient)
const meals = ref([])

onMounted(() => {
  handleGetMealByIngredients();
})

function handleClickDetails(item) {
    window.location.href = `/meal/${item.id}`;
}

async function handleGetMealByIngredients() {
        const apiKey = "17ef7e7301384deba608e341f15a05a9";
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${route.params.ingredient}&apiKey=${apiKey}`
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            response.json().then(res => {
                meals.value = res;
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        } catch (error) {
            console.error("Error:", error);
        }
}

</script>

<style scoped>
.meal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}

.meal-item {
    padding: 1rem;
    cursor: pointer;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}
</style>
