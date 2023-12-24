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
            <div class="profile-section">
                <div class="avatar-container">
                    <img src="https://external-preview.redd.it/Ot_7l56sKeF7k7yF33xE4rsVUSC3ZtNfvLrr-o66KLo.jpg?auto=webp&s=d6bf7543974bb7bdf2536d2d80d0e41debd23777" alt="">
                </div>
                <div class="info-container">
                    <div class="infor-input">
                        <label for="name">Email:</label>
                        <input type="text" id="name" v-model="email" disabled/>
                    </div>
                    <div class="infor-input">
                        <label for="name">Name:</label>
                        <input type="text" id="name" v-model="name" disabled/>
                    </div>
                    <div class="infor-input">
                        <label for="name">Age:</label>
                        <input type="number" id="name" v-model="age" disabled/>
                    </div>
                    <div class="infor-input">
                        <label for="name">Height:</label>
                        <input type="number" id="name" v-model="height" disabled/>
                        <span class="unit">cm</span>
                    </div>
                    <div class="infor-input">
                        <label for="name">Weight:</label>
                        <input type="number" id="name" v-model="weight" disabled/>
                        <span class="unit">kg</span>
                    </div>
                    <div class="infor-input">
                        <label for="name">BMI:</label>
                        <input type="number" id="name" v-model="bmi" disabled/>
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
const height = ref('175');
const weight = ref('70');
const bmi = ref('23.5');

const changeTab = (tab) => {
    currentTab.value = tab;
};
</script>
  
