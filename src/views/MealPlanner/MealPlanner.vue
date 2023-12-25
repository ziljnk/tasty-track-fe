<style scoped src="./MealPlanner.css"></style>
<template>
    <div class="p-8 pb-0 text-green-500">
        <h1 class="text-4xl font-bold mb-4">Meal Planner</h1>
    </div>

    <div class="tabs-container">
        <div class="tab-item" @click="handleSelectTab(0)">Generate with AI</div>
        <div class="tab-item" @click="handleSelectTab(1)">Add manually</div>
        <div class="class-indicator"></div>
    </div>

    <div v-if="selectedTab === 0">
        <div style="width: 100%; display: flex; justify-content: flex-start; align-items: center; gap: 20px; height: 50px;">
            <button @click="handleFetchMealPlan" class="button-generate">Generate meal planner</button>
            <select @change="handleChangeTimeFrame" class="time-frame-select">
                <option value="day">Day</option>
                <option value="week">Week</option>
            </select>
        </div>
    
        <table class="table-week-meals" v-if="timeFrame === 'week' && Object.keys(weekMeals).length > 0 && !isLoading">
            <tr>
                <th>Day</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
                <th>Nutritions</th>
            </tr>
            <tr v-for="(item, index) in Object.values(weekMeals)" :key="index">
                <td class="day-cell">{{ weekDays[index] }}</td>
                <td class="image-cell">
                    <img class="food-image" :src="`https://spoonacular.com/recipeImages/${item.meals[0].id}-556x370.${item.meals[0].imageType}`" />
                    <div class="image-overlay">
                        <p class="image-overlay-title">{{ item.meals[0].title }}</p>
                        <p class="image-overlay-ready-in-minutes">🕒 {{ item.meals[0].readyInMinutes }} minutes</p>
                        <p class="image-overlay-servings">🍽️ {{ item.meals[0].servings }} servings</p>
                        <a class="image-recipe" :href="item.meals[0].sourceUrl">Recipe</a>
                    </div>
                </td>
    
                <td class="image-cell">
                    <img class="food-image" :src="`https://spoonacular.com/recipeImages/${item.meals[1].id}-556x370.${item.meals[1].imageType}`" />
                    <div class="image-overlay">
                        <p class="image-overlay-title">{{ item.meals[1].title }}</p>
                        <p class="image-overlay-ready-in-minutes">🕒 {{ item.meals[1].readyInMinutes }} minutes</p>
                        <p class="image-overlay-servings">🍽️ {{ item.meals[1].servings }} servings</p>
                        <a class="image-recipe" :href="item.meals[1].sourceUrl">Recipe</a>
                    </div>
                </td>
    
                <td class="image-cell">
                    <img class="food-image" :src="`https://spoonacular.com/recipeImages/${item.meals[2].id}-556x370.${item.meals[2].imageType}`" />
                    <div class="image-overlay">
                        <p class="image-overlay-title">{{ item.meals[2].title }}</p>
                        <p class="image-overlay-ready-in-minutes">🕒 {{ item.meals[2].readyInMinutes }} minutes</p>
                        <p class="image-overlay-servings">🍽️ {{ item.meals[2].servings }} servings</p>
                        <p style="cursor: pointer;" @click="handleShowRecipeSummarize(item.id)">Recipe Summarize</p>
                        <a target="_blank" class="image-recipe" :href="item.meals[2].sourceUrl">Recipe</a>
                    </div>
                </td>
                
                <td>
                    <p><span class="bold-title">Calories</span>: {{ item.nutrients.calories }}</p>
                    <p><span class="bold-title">Carbohydrates</span>: {{ item.nutrients.carbohydrates }}</p>
                    <p><span class="bold-title">Fat</span>: {{ item.nutrients.fat }}</p>
                    <p><span class="bold-title">Protein</span>: {{ item.nutrients.protein }}</p>
                </td>
            </tr>
        </table>
    
        <table class="table-week-meals" v-if="timeFrame === 'day' && Object.keys(dayMeal).length > 0 && !isLoading">
            <tr>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
                <th>Nutritions</th>
            </tr>
            <tr>
                <td class="image-cell" v-for="(item, index) in dayMeal.meals" :key="index">
                    <img class="food-image" :src="`https://spoonacular.com/recipeImages/${item.id}-556x370.${item.imageType}`" />
                    <div class="image-overlay">
                        <p class="image-overlay-title">{{ item.title }}</p>
                        <p class="image-overlay-ready-in-minutes">🕒 {{ item.readyInMinutes }} minutes</p>
                        <p class="image-overlay-servings">🍽️ {{ item.servings }} servings</p>
                        <p style="cursor: pointer;" @click="handleShowRecipeSummarize(item.id)">Recipe Summarize</p>
                        <a target="_blank" class="image-recipe" :href="item.sourceUrl">Recipe</a>
                    </div>
                </td>
    
                <td>
                    <p><span class="bold-title">Calories</span>: {{ dayMeal.nutrients.calories }}</p>
                    <p><span class="bold-title">Carbohydrates</span>: {{ dayMeal.nutrients.carbohydrates }}</p>
                    <p><span class="bold-title">Fat</span>: {{ dayMeal.nutrients.fat }}</p>
                    <p><span class="bold-title">Protein</span>: {{ dayMeal.nutrients.protein }}</p>
                </td>
            </tr>
        </table>
    
        <Loading v-if="isLoading"/>
    </div>

    <div v-else>
        <div style="display: flex; align-items: flex-start; justify-content: flex-start; gap: 100px;">
            <div>
                <label v-if="!uploadedImage" class="label-input-image" for="image-upload"></label>
                <img v-else :src="uploadedImage" class="label-input-image"/>
                <input id="image-upload" @change="handleUploadFile" type="file"/>
            </div>
    
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <div class="input-group">
                    <label class="label-input" for="meal-name">Meal name</label>
                    <input v-model="mealName" class="input" id="meal-name" type="text" placeholder="Enter your meal name..."/>
                </div>
    
                <div class="input-group">
                    <label class="label-input" for="meal-calories">Calories</label>
                    <input v-model="mealCalories" class="input" id="meal-calories" type="text" placeholder="Enter your meal's calories..."/>
                </div>

                <button class="button-generate" @click="handleAddMeal">Add meal</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import Loading from '../../components/Loading.vue';
    import { STORAGE, FIRESTORE_DB } from '../../store/firebaseConfig'
    import { ref as refStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
    import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
    import { createToaster } from "@meforma/vue-toaster";

    const timeFrame = ref('day');
    const weekDays = ref(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
    const weekMeals = ref({});
    const dayMeal = ref({});
    const isLoading = ref(false);
    const selectedTab = ref(0);
    const uploadedImage = ref(null);
    const mealName = ref('');
    const mealCalories = ref('');
    const selectedFile = ref(null);
    const userId = ref(null);
    const toaster = createToaster({
        position: "top-right",
        duration: 3000,
        singleton: true,
    });

    function handleChangeTimeFrame(e) {
        timeFrame.value = e.target.value;
    }

    async function handleFetchMealPlan() {
        isLoading.value = true;
        const apiKey = "17ef7e7301384deba608e341f15a05a9";
        const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=${timeFrame.value}&apiKey=${apiKey}`;
        console.log(url);
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (timeFrame.value === 'day') {
                    dayMeal.value = data;
                    isLoading.value = false;
                } else {
                    weekMeals.value = data.week;
                    isLoading.value = false;
                }
                console.log(dayMeal.value);
            } else {
                console.error("Failed to fetch data. Status:", response.status);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function handleShowRecipeSummarize(mealId) {
        const apiKey = "17ef7e7301384deba608e341f15a05a9";
        const url = `https://api.spoonacular.com/recipes/${mealId}/card?apiKey=${apiKey}`
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
                window.open(res.url, '_blank');
            }).catch(err => {
                alert("Error", err)
                console.log(err);
            })
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function handleSelectTab(index) {
        selectedTab.value = index;
        let indicator = document.querySelector('.class-indicator');
        indicator.style.left = `${index * 50}%`;
    }

    async function handleUploadFile(e) {
        selectedFile.value = e.target.files[0];
        uploadedImage.value = URL.createObjectURL(selectedFile.value);
    }

    function handleAddMeal() {
        if (mealName.value.length === 0 || mealCalories.value.length === 0 || !selectedFile.value) {
            toaster.error("Please fill all fields !");
            return;
        }

        let timestamp = new Date().getTime();
        userId.value = localStorage.getItem('userId');
        const storageRef = refStorage(STORAGE, `images/${userId.value}/${timestamp}`);
        uploadBytes(storageRef, selectedFile.value).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async url => {
                const mealRef = doc(collection(FIRESTORE_DB, "meals"));
                await setDoc(mealRef, {
                    name: mealName.value,
                    calories: mealCalories.value,
                    image: url,
                    timestamp: timestamp,
                    userId: userId.value
                });
                mealName.value = '';
                mealCalories.value = '';
                await toaster.success(`Add meal successfully !`);
            })
        });
    }
</script>