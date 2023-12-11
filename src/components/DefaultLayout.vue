<template>
  <div style="width: 100%; height: 100%; display: flex; gap: 70px;">
    <div style="width: 200px; height: 100vh; position: sticky; top: 0">
        <navbar />
    </div>
    <main style="width: 100%;">
        <div class="max-w-[1200px] mx-auto">
            <router-view />
        </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
</script>
