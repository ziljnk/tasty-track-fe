<style scoped src="./ChatRoom.css"></style>
<template>
    <div class="p-8 pb-0 text-green-500">
        <h1 class="text-4xl font-bold mb-4">Chat Room</h1>
    </div>

    <div class="message-container" id="chat-history">
        <div class="message-history">
            <MessageItem v-for="message in messages" :key="message.timestamp" :message="message" />
        </div>

        <div style="position: relative;">
            <div style="display: flex; align-items: center; position: absolute; bottom: calc(100% + 10px); left: 20px; outline: 1px solid #d6d6d6; gap: 10px; padding: 10px; border-radius: 16px; background-color: #fff" v-if="isReplying"> 
                <div class="loader"></div>
                <p>Expert is typing</p>
            </div>

            <div class="message-input">
                <input @keypress="hanleKeyPress" v-model="messageContent" type="text" placeholder="Type your message here" />
                <button @click="handleSend" class="button-send" v-if="messageContent">
                    <img width="20" height="20" src="../../assets/ChatRoom/svg/send.svg"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import MessageItem from '../../components/MessageItem.vue';
    import { onMounted, ref } from 'vue';
    var messageContent = ref('');
    var messages = ref([])
    var isReplying = ref(false);

    function hanleKeyPress(e) {
        if (e.key === 'Enter' && messageContent.value.length > 0) {
            handleSend();
        }
    }

    async function handleSend() {
        const newMessage = {
            sender: 'user',
            content: messageContent.value,
            timestamp: new Date().getTime()
        }
        messageContent.value = '';
        isReplying.value = true;
        console.log(messages.value);
        const newMessages = [...messages.value, newMessage];

        messages.value = [...newMessages];
        scrollToBottom();
        await processMessageToChatGPT(messages.value);
    }

    async function processMessageToChatGPT(messagesParam) {
        let apiMessages = messagesParam.map(message => {
            let role = '';
            if (message.sender === 'user') {
                role = 'user';
            } else {
                role = 'system';
            }
            
            return {
                role: role,
                content: `${message.content}`
            }
        })

        const systemMessage = {
            role: 'system',
            content: 'You are a nutrition expert providing advice on healthy fast food options. Users are looking for quick and nutritious meal ideas. Please start with a greeting.'
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + import.meta.env.VITE_OPEN_AI_API,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then(data => {
            return data.json();
        }).then(data => {
            messages.value = [...messages.value, {
                sender: 'system',
                content: data.choices[0].message.content,
                timestamp: new Date().getTime()
            }];
            isReplying.value = false;
            scrollToBottom();
        }).catch(err => {
            console.log(err);
        
        })
    }

    function scrollToBottom() {
        var chatHistory = document.getElementById('chat-history');
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    onMounted(() => {
        scrollToBottom();
    })
</script>