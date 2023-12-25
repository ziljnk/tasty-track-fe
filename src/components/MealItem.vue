<template>
  <div
    class="bg-white shadow rounded-xl hover:scale-105 transition-all"
  >
    <router-link :to="{ name: 'mealDetails', params: { id: meal.id } }">
      <img
        :src="meal.image"
        :alt="meal.title"
        class="rounded-t-xl w-full h-48 object-cover"
      />
    </router-link>
    <div class="p-3">
      <h3 class="font-bold">{{ meal.title }}</h3>
      <p class="mb-4" v-html="$filters.truncateWords(meal.summary, 20)"></p>
      <div class="flex items-center justify-between">
        <YouTubeButton :href="meal.spoonacularSourceUrl" />
      </div>
    </div>
  </div>
</template>

<script setup>
import YouTubeButton from './YouTubeButton.vue';

const { meal } = defineProps({
  meal: {
    required: true,
    type: Object
  }
})

</script>
