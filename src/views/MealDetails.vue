<template>
<div class="max-w-[800px] mx-auto p-8" v-if="Object.keys(meal).length > 0">
    <h1 class="text-4xl font-bold mb-5 text-green-500">{{ meal?.title }}</h1>
    <img :src="meal?.image" :alt="meal?.title" class="max-w-[100%] details-image">
    <div class="grid grid-cols-1 sm:grid-cols-3 text-lg py-2">
      <div>
        <strong class="font-bold">Category:</strong> {{ meal.dishTypes.join(", ") }}
      </div>
      <div>
        <strong class="font-bold">Cuisines:</strong> {{ meal.cuisines.join(", ") }}
      </div>
      <div>
        <strong class="font-bold">Occasions:</strong> {{ meal.occasions.join(", ") }}
      </div>
    </div>

    

    <div class="grid grid-cols-1 sm:grid-cols-2">
        <div>
            <h2 class="text-2xl font-semibold mb-2">Ingredients</h2>
            <ul>
                <li v-for="(item, index) in meal?.extendedIngredients" :key="index">
                    {{ item.original }}
                </li>
            </ul>
        </div>

        <div>
            <h2 class="text-2xl font-semibold mb-2">Instructions</h2>
            <div class="my-3" v-html="meal.instructions"></div>
        </div>
        <!-- <div>
            <h2 class="text-2xl font-semibold mb-2">Measures</h2>
            <ul>
                <template v-for="(el, ind) of new Array(20)">
                    <li v-if="meal[`strMeasure${ind + 1}`]">
                        {{ ind + 1 }}. {{ meal[`strMeasure${ind + 1}`] }}
                    </li>
                </template>
            </ul>
        </div> -->
        <div class="mt-4">
            <YouTubeButton :href="meal?.spoonacularSourceUrl" />
            <a :href="meal?.sourceUrl" target="_blank" class="ml-3 px-3 py-2 rounded border-2 border-transparent text-indigo-600 transition-colors source-button">
                View Original Source
            </a>
        </div>
    </div>

</div>
</template>

<script setup>
import {
    onMounted,
    ref
} from 'vue'
import {
    useRoute
} from 'vue-router';
import axiosClient from '../axiosClient';
import YouTubeButton from '../components/YouTubeButton.vue';

const route = useRoute();
const meal = ref({})

onMounted(async () => {
    await getDetailsMeal();
    console.log(meal.value);
    console.log(route.params.id)
    //   axiosClient.get(`lookup.php?i=${route.params.id}`)
    //     .then(({ data }) => {
    //       meal.value = data.meals[0] || {}
    //     })
})

async function getDetailsMeal() {
    const apiKey = "17ef7e7301384deba608e341f15a05a9";
    const url = `https://api.spoonacular.com/recipes/${route.params.id}/information?includeNutrition=false&apiKey=${apiKey}`
    console.log(url);
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        response.json().then(res => {
            console.log(res);
            meal.value = res;
        }).catch(err => {
            console.log(err);
        })
    } catch (error) {
        console.error("Error:", error);
    }
}
</script>

<style scoped>
.details-image {
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.source-button {
    background-color: bisque;
    color: #222;
}
</style>
