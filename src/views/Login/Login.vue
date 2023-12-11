<style scoped src="./Login.css"></style>

<template>
    <header id="header">
        <div class="logo"><a href="">Tasty Track</a> </div>
        <div class="hamburger" id="toggle">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
        <nav class="nav-bar" id="navbar">
            <ul>
                <li>
                    <a href="index.html">Home</a>
                </li>
                <li>
                    <a href="#product">Products</a>
                </li>
                <li>
                    <a href="#about">About Us</a>
                </li>
                <li>
                    <a href="#contact">Contact</a>
                </li>
                <div class="login" id="login">
                    <li>
                        <a href="" class="navlogin">Login</a>
                    </li>
                </div>
            </ul>
        </nav>
    </header>
    <div style="width: 100vw; height: 100vh; overflow: hidden">
        <div class="container" id="home">
            <div class="login-left">
                <div class="login-header">
                    <h1>Welome to Tasty Track</h1>
                    <p>Healty Mood, Wealthy Mood</p>
                </div>
                <form action="" class="login-form" autocomplete="off">
                    <div class="login-content">
                        <div class="form-item">
                            <label for="email">Enter Email</label>
                            <input class="mt-2" type="email" name="" id="" placeholder="example@email.com">
                        </div>
                        <div class="form-item">
                            <label for="password"><span>Enter Password</span></label>
                            <label for="text"></label>
                            <input type="password" name="" id="" placeholder="Enter your Password" required class="pass-key mt-2">
                            <!-- <span class="show">Show</span> -->
                        </div>
                        <div class="form-item">
                            <div class="checkbox">
                                <input type="checkbox" name="" id="rememberMeCheckbox" checked>
                                <label for="rememberMeCheckbox" class="checkboxlabel">Remember Me</label>
                            </div>
                        </div>
                        <button type="submit">LogIn</button>
                    </div>
                    <div class="login-footer">
                        <a href="">
                            <img width="30" src="https://img.icons8.com/color/512/facebook-new.png" alt="facebook">Facebook
                        </a>
                        <a href="">
                            <img width="30" src="https://img.icons8.com/fluency/512/google-logo.png" alt="google">Google
                        </a>
                    </div>
                </form>
            </div>
            <div class="login-right">
                <div class="under-layer"></div>
                <img src="src/assets/Login/png/aa.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
</script>
