<style scoped src="./Login.css"></style>

<template>
    <div style="width: 100vw; height: 100vh; overflow: hidden">
        <div class="container" id="home">
            <div class="login-left">
                <div class="login-header">
                    <h1>Welome to Tasty Track</h1>
                    <p>Healty Mood, Wealthy Mood</p>
                </div>
                <form action="" class="login-form" autocomplete="off" @submit.prevent="handleLogin">
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
                            <button class="btn-submit"
                                style="background-color: rgb(61, 83, 204); color: white;">LogIn</button>
                            <router-link :to="{ path: 'register' }"
                                class="inline-flex justify-center items-center px-2 h-11 transition-colors hover:bg-green-500 hover:text-white w-full p-3 rounded-lg">
                                Register
                            </router-link>
                        </div>
                    </div>
                </form>
                <div class="login-footer">
                    <div class="or-divider">Or</div>
                    <div class="btn-container-gg">
                        <button @click="handleGoogle" class="btn-google">
                        <img width="30" src="https://img.icons8.com/fluency/512/google-logo.png" alt="google">
                    </button>
                    </div>
                    
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
import { loginWithEmailAndPassword,loginWithGoogle } from '@/store/auth';
import firebaseConfig from '@/store/firebaseConfig';
import { useRouter } from 'vue-router';

const app = firebaseConfig.app;
const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
    try {
        await loginWithEmailAndPassword(email.value, password.value);
        router.push('/');
    } catch (error) {
        console.error('Error during login:', error);

    }
};


const handleGoogle = async () => {
    try {
        const result = await loginWithGoogle();
        console.log('Successfully logged in with Google!', result);
        localStorage.setItem('userId', result.user.uid);
        router.push('/');
    } catch (error) {
        console.error('Error during Google login:', error);
    }
};

</script>
	