<template>
  <div class="p-8 pb-0 text-green-500">
    <h1 class="text-4xl font-bold mb-4">Random Meals</h1>
  </div>

  <div class="input-group">
    <input v-model="desiredCalories" tyle="number" placeholder="Enter your desired calories..." class="input-calories"/>
    <button class="btn-generate" @click="handleGenerate">Generate</button>
  </div>
  <Meals :meals="meals" />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import store from "../store";
import Meals from "../components/meals.vue";
import axiosClient from "../axiosClient.js";
import { createToaster } from "@meforma/vue-toaster";

const meals = ref([]);
const desiredCalories = ref(0);
const toaster = createToaster({
        position: "top-right",
        duration: 3000,
        singleton: true,
});

// onMounted(async () => {
//     handleGetRandomMeal();
// });

function handleGenerate() {
    if (!desiredCalories.value) {
        toaster.error("Please enter your desired calories");
    } else {
        handleGetRandomMeal();
    }

    console.log(desiredCalories.value);
}

async function handleGetRandomMeal() {
        const apiKey = "17ef7e7301384deba608e341f15a05a9";
        const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            response.json().then(res => {
                meals.value = [];
                meals.value.push(res.recipes[0]);
                console.log(res.recipes[0]);
            }).catch(err => {
                console.log(err);
            })
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>

<style scoped>
    .input-calories {
        width: 300px;
        height: 50px;
        border-radius: 12px;
        padding: 5px 20px;
        margin-left: 2rem;
    }

    .input-group {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 2rem;
    }

    .btn-generate {
        width: 100px;
        height: 50px;
        border-radius: 12px;
        background-color: green;
        border: none;
        cursor: pointer;
        color: white;
    }
</style>
