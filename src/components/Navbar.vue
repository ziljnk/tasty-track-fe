<template>
<header class="bg-white shadow flex justify-start items-center" style="flex-direction: column; height: 100vh; width: 200px; position: absolute; left: 0; top: 0;">
    <router-link :to="{ name: 'home' }" class="inline-flex items-center px-5 text-orange-500 font-bold">
        <img src="../assets/Homepage/png/tasty-track-logo-without-bg.png" width="90" height="90" />
    </router-link>
    <div class="flex items-start gap-1" style="flex-direction: column;">
        <router-link :to="{ name: 'mealPlanner' }" class="inline-flex items-center px-2 transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
            Meal Planner
        </router-link>

        <router-link :to="{ name: 'instructionsAnalyzer' }" class="inline-flex items-center px-2 transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
            Food Detection
        </router-link>

        <router-link :to="{ name: 'exerciesRoom' }" class="inline-flex items-center px-2 transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
            Exercises Room
        </router-link>

        <router-link :to="{ name: 'chatRoom' }" class="inline-flex items-center px-2 h-full transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
            Chat Room
        </router-link>

        <router-link :to="{ name: 'byName' }" class="inline-flex items-center px-2 h-full transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
            Search Meals
        </router-link>

        <router-link :to="{ name: 'byLetter' }" class="inline-flex items-center px-2 h-full transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
            Meals By Letter
        </router-link>

        <router-link :to="{ name: 'ingredients' }" class="inline-flex items-center px-2 h-full transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
            Meals By Ingredients
        </router-link>

    </div>
    <!-- <router-link
      :to="{ name: 'ingredients' }"
      style="width: 50px; height: 50px; border-radius: 50%; overflow: hidden; border: 2px solid #7bcb0b; padding: 2px;"
    >
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcW3CxpH756b-Vus8HxhXV05IDg01sLFENaAYOadIJvz2y1ZgNdNPV57q8-oxNKtB5VfE&usqp=CAU"/>
    </router-link> -->
</header>
</template>
