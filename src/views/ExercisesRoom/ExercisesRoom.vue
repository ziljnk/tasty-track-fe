<style scoped src="./ExercisesRoom.css"></style>
<template>
    <div class="p-8 pb-0 text-green-500">
        <h1 class="text-4xl font-bold mb-4">Exercises Room</h1>
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
                    <img width="20" height="20" src="src/assets/ChatRoom/svg/send.svg"/>
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
        };
        isReplying.value = true;
        console.log(messages.value);
        const newMessages = [...messages.value, newMessage];

        messages.value = [...newMessages];
        scrollToBottom();
        await apiWorkoutCall();
    }

    async function apiWorkoutCall() {
        var query = messageContent.value;
        messageContent.value = '';
        await fetch("https://lyfta.ai/workouts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed
            },
            body: JSON.stringify({
                query: query,
            }),
        }).then(data => {
            data.json().then(res => {
                console.log(res);
                console.log("workout", res.workout)
                messages.value = [...messages.value, {
                    sender: 'system',
                    content: formatWorkoutToHtml(res),
                    timestamp: new Date().getTime()
                }];
                isReplying.value = false;
                scrollToBottom();
            
            })
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

function formatWorkoutToHtml(workoutData) {
    if (workoutData) {
        const { workout, edit_link } = workoutData;
        console.log(workout);
        const exercisesHtml = workout.exercises && workout.exercises.map((exercise) => {
            return `
                <div class="exercise">
                    <h3 style="text-transform: capitalize; font-size: 20px; font-weight: 500;">${exercise?.exercise_name}</h3>
                    <img style="width: 100%;" src="${exercise?.exercise_image_url}" alt="${exercise?.exercise_name}" />
                    <p>Sets: ${exercise?.sets}, Reps: ${exercise?.reps}</p>
                    <a style="text-decoration: underline; text-underline-offset: 5px;" href="${exercise?.exercise_video_url}" target="_blank">🎥 Watch Video</a>
                    <br/>
                    <a style="text-decoration: underline; text-underline-offset: 5px;" href="${exercise.exercise_instructions_url}" target="_blank">💁 Instructions</a>
                </div>
            `;
        }).join('');

        const workoutHtml = `
            <div class="workout">
                <h2 style="font-size: 30px; font-weight: 600;">${workout.title}</h2>
                <p>${workout.description}</p>
                <div class="exercises">${exercisesHtml}</div>
            </div>
            <a style="color: blue !important; margin-top: 20px;" href="${edit_link}" target="_blank">Edit Workout</a>
        `;

        return workoutHtml;
    }
}
</script>