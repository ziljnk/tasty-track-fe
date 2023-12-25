<style scoped src="./Profile.css"></style>
<template>
    <div class="p-5 pb-0 text-green-500">
        <h1 class="text-4xl font-bold mb-4">Profile</h1>

        <div class="tab-container">
            <div id="tab-info" :class="{ 'active-tab': currentTab === 'information' }" @click="changeTab('information')">
                Information</div>
            <div id="tab-manage" :class="{ 'active-tab': currentTab === 'manageMeal' }" @click="changeTab('manageMeal')">
                Manage Meal</div>
        </div>

        <div class="information-tab" v-if="currentTab === 'information'">
            <div class="left-column">
                <div class="avatar-container" @click="openFileUpload">
                    <img :src="result.image" alt="" />
                    <input id="image-upload" ref="fileInput" @change="handleUploadFile" type="file" style="display: none" />
                </div>
                <p style="color: rgb(5, 178, 5);">{{ result.email }}</p>
            </div>
            <div class="right-column">
                <div class="profile-section">
                    <div class="button-container-profile">
                        <button @click="show">Edit Profile</button>
                    </div>

                    <div class="info-container">
                        <div class="infor-input">
                            <label for="name">Name:</label>
                            <input class="i-text" type="text" id="name" v-model="result.name" />
                        </div>
                        <div class="infor-input">
                            <label for="name">Age:</label>
                            <input class="i-num" type="number" id="name" v-model="result.age" min="0" />
                        </div>
                        <div class="infor-input">
                            <label for="gender">Gender:</label>
                            <select id="gender" v-model="result.gender" class="i-num">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div class="infor-input">
                            <label for="name">Height:</label>
                            <input class="i-num" type="number" id="height" v-model="result.height" min="0" />
                            <span>( cm )</span>
                        </div>
                        <div class="infor-input">
                            <label for="name">Weight:</label>
                            <input class="i-num" type="number" id="weight" v-model="result.weight" min="0" />
                            <span>( kg )</span>

                        </div>
                        <div class="infor-input">
                            <label for="activity">Activity Level:</label>
                            <select id="activity" v-model="result.activityLevel" class="i-text">
                                <option v-for="(label, value) in activityLevels" :value="value" :key="value">{{ label }}
                                </option>
                            </select>
                        </div>
                        <div class="dashed-line"></div>
                        <div class="infor-input">
                            <label for="name">BMI:</label>
                            <span class="s-num"
                                :style="{ color: result.bmi < 18.5 ? 'blue' : result.bmi < 25 ? 'rgb(55, 178, 55)' : result.bmi < 30 ? 'orange' : 'red' }">
                                {{ result.bmi + " ( " + result.health + ' )' }}
                            </span>
                        </div>
                        <div class="infor-input">
                            <label for="name">Daily Calories:</label>
                            <span class="s-num">
                                {{ result.calories + " ( Calories/day )" }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="manageMeal-tab" v-if="currentTab === 'manageMeal'">
            <div v-for="(item, index) in Object.keys(mealList)" :key="index">
                <p class="meal-item-date">{{ item }}</p>
                <div class="meal-container">
                    <div class="meal-item-container" v-for="(mealInDay, index) in mealList[`${item}`]" :key="index">
                        <img :src="mealInDay.image" />
                        <div class="meal-item-infor">
                            <p class="meal-item-name">Name: {{ mealInDay.name }}</p>
                            <p class="meal-item-time">Time: {{ mealInDay.time }}</p>
                        </div>
                        <p class="meal-item-calories">{{ mealInDay.calories + ' Calories' }}</p>
                    </div>
                </div>

                <p class="total-calories">Total: {{ totalCaloriesByDay[`${item}`] }} Calories</p>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onMounted, ref, onBeforeMount } from 'vue';
import { fetchUserData } from '../../store/auth';
import { ref as refStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
import { STORAGE, FIRESTORE_DB } from '../../store/firebaseConfig'
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { createToaster } from "@meforma/vue-toaster";
import axios from 'axios';

const selectedFile = ref(null);
const uploadedImage = ref(null);
const mealList = ref([]);
let userId = ref('');
const totalCaloriesByDay = ref({});

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const activityLevels = {
    'level_1': 'Sedentary: little or no exercise',
    'level_2': 'Exercise 1-3 times/week',
    'level_3': 'Exercise 4-5 times/week',
    'level_4': 'Daily exercise or intense exercise 3-4 times/week',
    'level_5': 'Intense exercise 6-7 times/week',
    'level_6': 'Very intense exercise daily, or physical job'
};
const currentTab = ref('information');
let result = ref({});
const toaster = createToaster({
    position: "top-right",
    duration: 3000,
    singleton: true,
});

const changeTab = (tab) => {
    currentTab.value = tab;
};

async function fetchMeals() {
    const userId = localStorage.getItem('userId');
    const mealQuery = query(collection(FIRESTORE_DB, "meals"), where("userId", "==", userId), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(mealQuery);
    querySnapshot.forEach((doc) => {
        mealList.value.push({
            name: doc.data().name,
            calories: doc.data().calories,
            date: timestampToWeekday(doc.data().timestamp),
            time: timestampToTime(doc.data().timestamp),
            image: doc.data().image,
        })
    });

    totalCaloriesByDay.value = calculateTotalCalories(mealList.value);
    mealList.value = separateByWeekday(mealList.value);
}

onBeforeMount(async () => {
    await fetchMeals();
});

function timestampToWeekday(timestamp) {
  const date = new Date(timestamp);
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = date.getDay();
  return weekdays[dayOfWeek];
}

function timestampToTime(timestamp) {
  const date = new Date(timestamp);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

function separateByWeekday(data) {
  const separatedData = {};

  data.forEach(item => {
    const weekday = item.date;

    if (!separatedData[weekday]) {
      separatedData[weekday] = [];
    }

    separatedData[weekday].push(item);
  });

  return separatedData;
}

function calculateTotalCalories(mealsByDay) {
  const totalCaloriesByDay = {};

  mealsByDay.forEach((meal) => {
    const { date, calories } = meal;

    if (!totalCaloriesByDay[date]) {
      totalCaloriesByDay[date] = 0;
    }

    totalCaloriesByDay[date] += calories;
  });

  return totalCaloriesByDay;
}


const show = async () => {
    if (result.value.age === 0 || result.value.weight === 0 || result.value.weight === height || result.value.gender === '' || result.value.activityLevel === '') {
        toaster.error("Please fill all fields !");
        return;
    }

    try {
        const response1 = await axios.request({
            method: 'GET',
            url: 'https://fitness-calculator.p.rapidapi.com/bmi',
            params: {
                age: result.value.age,
                weight: result.value.weight,
                height: result.value.height
            },
            headers: {
                'X-RapidAPI-Key': '2ebbff26c9msh030738ee59a8487p1564b7jsn44a4726d98bd',
                'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
        });
        if (response1.status === 200) {
            result.value.bmi = response1.data.data.bmi
            result.value.health = response1.data.data.health
        }
        const response2 = await axios.request({
            method: 'GET',
            url: 'https://fitness-calculator.p.rapidapi.com/dailycalorie',
            params: {
                age: result.value.age,
                gender: result.value.gender,
                height: result.value.height,
                weight: result.value.weight,
                activitylevel: result.value.activityLevel,
            },
            headers: {
                'X-RapidAPI-Key': '2ebbff26c9msh030738ee59a8487p1564b7jsn44a4726d98bd',
                'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
        });
        if (response2.status === 200) {
            result.value.calories = response2.data.data.goals['maintain weight']
            console.log(response2.data.data.goals)
        }
        await updateUserData(userId, {
            name: result.value.name,
            age: result.value.age,
            gender: result.value.gender,
            height: result.value.height,
            weight: result.value.weight,
            activityLevel: result.value.activityLevel,
            bmi: result.value.bmi,
            health: result.value.health,
            calories: result.value.calories,
        });
        await toaster.success(`Edit Profile successfully !`);
        result.value = await fetchUserData(userId);

    } catch (error) {
        console.error(error);
    }

};

const openFileUpload = () => {
    const fileInput = document.getElementById('image-upload');
    if (fileInput) {
        fileInput.click();
    }
};

async function handleUploadFile(e) {
    let timestamp = new Date().getTime();
    selectedFile.value = e.target.files[0];
    const storageRef = refStorage(STORAGE, 'avatars/' + timestamp + '_' + selectedFile.value.name);
    const snapshot = await uploadBytes(storageRef, selectedFile.value);
    const downloadURL = await getDownloadURL(snapshot.ref);
    uploadedImage.value = downloadURL;

    await updateUserData(userId, { image: downloadURL });
    await toaster.success(`Upload image successfully !`);
    result.value = await fetchUserData(userId);
}

async function updateUserData(userId, newData) {
    try {
        const userDocRef = doc(FIRESTORE_DB, "users", userId);
        await updateDoc(userDocRef, newData);
        console.log("User data updated successfully!");
    } catch (error) {
        console.error("Error updating user document:", error);
        throw error;
    }
}



onMounted(async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            userId = user.uid;
            try {
                result.value = await fetchUserData(userId);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu người dùng:', error);
            }
        } else {
            console.error('Người dùng chưa đăng nhập hoặc có lỗi xảy ra.');
        }
    });
});
</script>
  
