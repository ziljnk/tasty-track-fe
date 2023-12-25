<template>
  <header class="bg-white shadow flex justify-start items-center"
    style="flex-direction: column; height: 100vh; width: 200px; position: absolute; left: 0; top: 0;">
    <router-link :to="{ name: 'home' }" class="inline-flex items-center px-5 text-orange-500 font-bold">
      <img src="/tasty-track-logo-without-bg.png" width="90" height="90" />
    </router-link>
    <div class="flex items-start gap-1" style="flex-direction: column;">
      <router-link :to="{ name: 'mealPlanner' }"
        class="inline-flex items-center px-2 transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
        Meal Planner
      </router-link>

      <router-link :to="{ name: 'instructionsAnalyzer' }"
        class="inline-flex items-center px-2 transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
        Food Detection
      </router-link>

      <router-link :to="{ name: 'exerciesRoom' }"
        class="inline-flex items-center px-2 transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
        Exercises Room
      </router-link>

      <router-link :to="{ name: 'chatRoom' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
        Chat Room
      </router-link>

      <router-link :to="{ name: 'byName' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
        Search Meals
      </router-link>

      <router-link :to="{ name: 'byLetter' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
        Meals By Letter
      </router-link>

      <router-link :to="{ name: 'ingredients' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
        Meals By Ingredients
      </router-link>

      <router-link v-if="!uid" :to="{ path: 'login' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
        Login
      </router-link>

      <router-link v-if="uid" :to="{ name: 'profile' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
        Profile
      </router-link>

      <button v-if="uid" @click="logOut"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
        Log Out
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { logout } from '@/store/auth';
import { useRouter } from 'vue-router';

const auth = getAuth();
const uid = ref(''); // Initialize with a default value
const router = useRouter();

onAuthStateChanged(auth, (user) => {
  uid.value = user ? user.uid : '';
});

const logOut = async () => {
  try {
    await logout();
    router.push('/');
    console.log('User logged out!');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
</script>