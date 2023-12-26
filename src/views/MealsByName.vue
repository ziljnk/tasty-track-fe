<template>
  <div class="p-8 pb-0">
    <h1 class="text-4xl font-bold mb-4 text-green-500">Search Meals by Name</h1>
  </div>
  <div class="px-8 pb-3">
    <input
      type="text"
      v-model="keyword"
      class="rounded border-2 bg-white border-gray-200 focus:ring-orange-500 focus:border-orange-500 w-full"
      placeholder="Search for Meals"
      @keypress.enter.prevent="searchMeals"
    />

    <div class="advanced-options">
        <div class="btn-activate" @click="handleOpenAdvancedOptions">
            <p>Advanced Options</p>
        </div>
        <div v-if="isOpenAdvancedOptions">
            <div class="input-container">
                <div class="input-group">
                    <label>Min Calories: </label>
                    <input v-model="minCalories" id="min-calories" type="number" placeholder="Enter min calories..."/>
                </div>
        
                <div class="input-group">
                    <label>Max Calories: </label>
                    <input v-model="maxCalories" id="max-calories" type="number" placeholder="Enter max calories..."/>
                </div>
            </div>
    
            <div class="input-container">
                <div class="input-group">
                    <label>Min Fat: </label>
                    <input v-model="minFat" id="min-fat" type="number" placeholder="Enter min fat..."/>
                </div>
        
                <div class="input-group">
                    <label>Max Fat: </label>
                    <input v-model="maxFat" id="max-fat" type="number" placeholder="Enter max fat..."/>
                </div>
            </div>
    
            <div class="input-container">
                <div class="input-group">
                    <label>Min Cholesterol: </label>
                    <input v-model="minCholesterol" id="min-cholesterol" type="number" placeholder="Enter min cholesterol..."/>
                </div>
        
                <div class="input-group">
                    <label>Max Cholesterol: </label>
                    <input v-model="maxCholesterol" id="max-cholesterol" type="number" placeholder="Enter max cholesterol..."/>
                </div>
            </div>
        </div>
    </div>
  </div>

  <div class="meal-grid" v-if="meals.length > 0">
    <div @click="handleGoDetails(item)" class="meal-item" v-for="(item, index) in meals" :key="index">
        <div class="meal-header">
            <img :src="item.image" alt="meal" />
        </div>
        <div class="meal-body">
            <h1>{{ item.title }}</h1>
        </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const keyword = ref("");
const meals = ref([]);
const isOpenAdvancedOptions = ref(false);
const minCalories = ref(0);
const maxCalories = ref(0);
const minFat = ref(0);
const maxFat = ref(0);
const minCholesterol = ref(0);
const maxCholesterol = ref(0);
const params = [];

function searchMeals(e) {
    if (e.key === "Enter") {
        handleSearchMeal();
    }
}

onMounted(() => {
  keyword.value = route.params.name
  if (keyword.value) {
    searchMeals()
  }
})

function handleOpenAdvancedOptions() {
    isOpenAdvancedOptions.value = !isOpenAdvancedOptions.value;
}

async function handleSearchMeal() {
    if (minCalories.value > 0) {
        params.push(`minCalories=${encodeURIComponent(minCalories.value)}`);
    }

    if (maxCalories.value > 0) {
        params.push(`maxCalories=${encodeURIComponent(maxCalories.value)}`);
    }

    if (minFat.value > 0) {
        params.push(`minFat=${encodeURIComponent(minFat.value)}`);
    }

    if (maxFat.value > 0) {
        params.push(`maxFat=${encodeURIComponent(maxFat.value)}`);
    }

    if (minCholesterol.value > 0) {
        params.push(`minCholesterol=${encodeURIComponent(minCholesterol.value)}`);
    }

    if (maxCholesterol.value > 0) {
        params.push(`maxCholesterol=${encodeURIComponent(maxCholesterol.value)}`);
    }

    const apiKey = "17ef7e7301384deba608e341f15a05a9";
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${keyword.value}&apiKey=${apiKey}&${params.join('&')}`
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        response.json().then(res => {
            meals.value = [];
            meals.value = [...res.results]
        }).catch(err => {
            console.log(err);
        })
    } catch (error) {
        console.error("Error:", error);
    }
}

function handleGoDetails(item) {
    window.location.href = `/meal/${item.id}`;
}
</script>

<style scoped>
.input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 1rem 0;
}

.input-group {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 0 1rem 0;
    width: 50%;
    gap: 20px;
}

.input-group input {
    border-radius: 12px;
    padding: 5px 20px;
    border: none;
}

.advanced-options {
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 2rem;
    margin: 1rem 0;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.btn-activate {
    width: 100%;
    margin-bottom: 2rem;
    cursor: pointer;
}

.btn-activate p {
    font-weight: bold;
    font-size: 1.2rem;
}

.meal-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-left: 2rem;
}

.meal-item {
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: pointer;
}
</style>