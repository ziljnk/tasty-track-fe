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
                <div class="avatar-container">
                    <img src="https://external-preview.redd.it/Ot_7l56sKeF7k7yF33xE4rsVUSC3ZtNfvLrr-o66KLo.jpg?auto=webp&s=d6bf7543974bb7bdf2536d2d80d0e41debd23777"
                        alt="">
                </div>
                <p>{{ email }}</p>
            </div>
            <div class="right-column">
                <div class="profile-section">
                    <div class="button-container-profile">
                        <button>Edit Profile</button>
                    </div>

                    <div class="info-container">
                        <div class="infor-input">
                            <label for="name">Name:</label>
                            <input class="i-text" type="text" id="name" v-model="name" />
                        </div>
                        <div class="infor-input">
                            <label for="name">Age:</label>
                            <input class="i-num" type="number" id="name" v-model="age" min="0" />
                        </div>
                        <div class="infor-input">
                            <label for="gender">Gender:</label>
                            <select id="gender" v-model="gender" class="i-num">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div class="infor-input">
                            <label for="name">Height:</label>
                            <input class="i-num" type="number" id="height" v-model="height" min="0" />
                            <span>( cm )</span>
                        </div>
                        <div class="infor-input">
                            <label for="name">Weight:</label>
                            <input class="i-num" type="number" id="weight" v-model="weight"  min="0"/>
                            <span>( kg )</span>

                        </div>
                        <div class="infor-input">
                            <label for="name">Activity Level:</label>
                            <input class="i-text" type="text" v-model="activity" disabled />
                        </div>
                        <div class="infor-input">
                            <label for="name">BMI:</label>
                            <input class="i-num" type="number" v-model="bmi" disabled />
                            <span style="color: rgb(28, 196, 28);">( {{ health }} )</span>
                        </div>
                        <div class="infor-input">
                            <label for="name">Daily Calories:</label>
                            <input class="i-num" type="number" v-model="calories" disabled />
                            <span>( Calories/day )</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="manageMeal-tab" v-if="currentTab === 'manageMeal'">
            def
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';


const currentTab = ref('information');
const name = ref('John Doe');
const email = ref('john.doe@example.com');
const age = ref(25);
const gender = ref('male');
const health = ref('Normal');
const activity = ref('Exercise 1-3 times/week');
const height = ref(175);
const weight = ref(70);
const bmi = ref(23.5);
const calories = ref(2350);

const changeTab = (tab) => {
    currentTab.value = tab;
};
</script>
  
