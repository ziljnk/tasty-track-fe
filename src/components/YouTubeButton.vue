<template>
  <a
    :href="href"
    target="_blank"
    class="px-3 py-2 rounded text-white transition-colors"
    style="background-color: #7bcb0b; border-color: #7bcb0b"
  >
    <slot>YouTube</slot>
  </a>
</template>

<script setup>
const props = defineProps({
  href: String
})
</script>
