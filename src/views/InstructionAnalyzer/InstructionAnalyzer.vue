<style src="./InstructionAnalyzer.css"></style>
<template>
    <div class="p-8 pb-0 text-green-500">
        <h1 class="text-4xl font-bold mb-4">Food Detection</h1>
        <p>Just upload your food, our food detection function swiftly identifies a wide array of food items, providing users with instant information about the dishes they encounter.</p>
    </div>

    <div v-if="uploadedImage" style="display: flex; justify-content: flex-start; align-items: center; gap: 50px; width: 100%;">
        <img :src="uploadedImage" alt="Uploaded Food" id="uploaded-image"/>
        <p v-if="foodCategory" class="text-upload">{{ `<- I think this is ` }}<span class="detected-food">{{foodCategory.category.name}}</span> with the probability of <span class="detected-probability">{{ foodCategory.category.probability.toFixed(2) * 100 }}%</span>.</p>
        <Loading v-else/>

    </div>

    <div v-else style="display: flex; justify-content: flex-start; align-items: center; gap: 20px; width: 100%;">
        <label class="food-upload-label" for="food-upload">Upload Image</label>
        <input @change="handleUploadFile" type="file" id="food-upload" style="display: none;"/>

        <p class="text-upload">{{ '<- Upload your food image here !' }}</p>
    </div>

    <div class="nutrition-info" v-if="foodCategory">
        <p class="nutrition-info-title">{{`Nutrition profile of the average ${foodCategory.category.name}`}}</p>
        <div class="calories-container">
            <div :style="`width: ${calculatePercentile(foodCategory.nutrition.calories.value, foodCategory.nutrition.calories.confidenceRange95Percent.min, foodCategory.nutrition.calories.standardDeviation)}px !important;`" class="calories-percent"></div>
            <p class="calories-text">{{ `${foodCategory.nutrition.calories.value} calories` }}</p>
        </div>

        <div class="calories-container">
            <div :style="`width: ${calculatePercentile(foodCategory.nutrition.fat.value, foodCategory.nutrition.fat.confidenceRange95Percent.min, foodCategory.nutrition.fat.standardDeviation)}px !important;`" class="fat-percent"></div>
            <p class="calories-text">{{ `${foodCategory.nutrition.fat.value}g fat` }}</p>
        </div>

        <div class="calories-container">
            <div :style="`width: ${calculatePercentile(foodCategory.nutrition.protein.value, foodCategory.nutrition.protein.confidenceRange95Percent.min, foodCategory.nutrition.protein.standardDeviation)}px !important;`" class="protein-percent"></div>
            <p class="calories-text">{{ `${foodCategory.nutrition.protein.value}g protein` }}</p>
        </div>

        <div class="calories-container">
            <div :style="`width: ${calculatePercentile(foodCategory.nutrition.carbs.value, foodCategory.nutrition.carbs.confidenceRange95Percent.min, foodCategory.nutrition.carbs.standardDeviation)}px !important;`" class="carbs-percent"></div>
            <p class="calories-text">{{ `${foodCategory.nutrition.carbs.value}g carbs` }}</p>
        </div>
    </div>

    <p v-if="foodCategory" class="nutrition-info-title">Hungry now? Try one of these</p>
    <div v-if="foodCategory" class="related-food">
        <div @click="handleClickFoodItem(item.url)" class="food-item" v-for="(item, index) in foodCategory.recipes" :key="index">
            <img :src="`https://spoonacular.com/recipeImages/${item.id}-556x370.${item.imageType}`" width="300" height="200"/>
            <p class="title-food">{{ item.title }}</p>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import Loading from '../../components/Loading.vue';

    const uploadedImage = ref(null);
    const apiKey = "17ef7e7301384deba608e341f15a05a9";
    const foodCategory = ref('');
    async function handleUploadFile(e) {
        const file = e.target.files[0];

        if (file) {
            uploadedImage.value = URL.createObjectURL(file);
            const formData = new FormData();
            formData.append('file', file);

            try {
                // Send form data to your server
                const response = await fetch(`https://api.spoonacular.com/food/images/analyze?apiKey=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });

                response.json().then(res => {
                    foodCategory.value = res;
                    console.log("res", res)
                }).catch(err => {
                    console.log(err);
                });
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
    }

    function calculatePercentile(value, min, standardDeviation) {
        const zScore = (value - min) / 10;
        const percentile = (zScore * 100 + 100) / 2;

        return percentile.toFixed(2);
    }

    function handleClickFoodItem(url) {
        window.open(url, '_blank');
    }
</script>