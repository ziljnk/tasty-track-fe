<style scoped src="./Register.css"></style>

<template>
    <div style="width: 100vw; height: 100vh; overflow: hidden">
        <div class="container" id="home">
            <div class="login-left">
                <div class="login-header">
                    <h1>Register to Tasty Track</h1>
                    <p>Healty Mood, Wealthy Mood</p>
                </div>
                <form action="" class="login-form" autocomplete="off" @submit.prevent="handleRegister">
                    <div class="login-content">
                        <div class="form-item">
                            <label for="email">Enter Email</label>
                            <input class="mt-1" type="email" name="" id="" v-model="email" placeholder="example@email.com">
                        </div>
                        <div class="form-item">
                            <label for="password"><span>Enter Password</span></label>
                            <label for="text"></label>
                            <input type="password" name="" id="" v-model="password" placeholder="Enter your Password"
                                required class="pass-key mt-1">
                            <!-- <span class="show">Show</span> -->
                        </div>
                        <div class="form-item">
                            <div class="checkbox">
                                <input type="checkbox" name="" id="rememberMeCheckbox" checked>
                                <label for="rememberMeCheckbox" class="checkboxlabel">Remember Me</label>
                            </div>
                        </div>
                        <div class="btn-container">
                            <button class="btn-submit" style="background-color: rgb(61, 83, 204); color: white;">Register</button>
                        </div>
                    </div>
                </form>
                <div class="login-footer">
                    <div class="or-divider">Or</div>
                    <a href="" @click="back">Back to Log In
                    </a>
                </div>
            </div>
            <div class="login-right">
                <div class="under-layer"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { registerWithEmailAndPassword } from '@/store/auth';
import { useRouter } from 'vue-router';


const email = ref('');
const password = ref('');
const router = useRouter();

const handleRegister = async () => {
    try {
        await registerWithEmailAndPassword(email.value, password.value);
    } catch (error) {
        console.error('Error during register:', error);

    }
};

const back =  () => {
    router.push('/login');
};


</script>
	