<template>
    <div class="message-item-container" :style="message.sender === 'system' ? 'flex-direction: row' : 'flex-direction: row-reverse'">
        <img :src="message.sender === 'system' ? '/tasty-track-logo-without-bg.png' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcW3CxpH756b-Vus8HxhXV05IDg01sLFENaAYOadIJvz2y1ZgNdNPV57q8-oxNKtB5VfE&usqp=CAU'"/>
        <span  style="white-space: pre-line" v-html="message.content" :class="message.sender === 'system' ? 'system-message' : 'user-message'"></span>
    </div>
</template>
  
<script setup>
    import { onBeforeMount, ref } from 'vue'
    const { message } = defineProps({
      message: {
        required: true,
        type: Object
      }
    })

    var messageContent = ref('This is a \n multiline \n message');
</script>
<style scoped>
    .system-message {
        width: max-content;
        background-color: #F3F3F3;
        border: 1px solid #7bcb0b;
        padding: 10px 20px;
        border-radius: 20px;
        max-width: 80%;
        overflow-wrap: anywhere;
    }

    .user-message {
        width: max-content;
        background: linear-gradient(99.65deg,#24be85 1.57%,#13a7a4 65.99%);
        padding: 10px 20px;
        border-radius: 20px;
        color: #fff;
        max-width: 80%;
        overflow-wrap: anywhere;
    }

    .message-item-container {
        display: flex;
        align-items: flex-start;
        margin-bottom: 10px;
        gap: 10px;
        padding-inline: 20px;
    }

    .message-item-container img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        outline: 2px dashed #7bcb0b;
    }
</style>
  