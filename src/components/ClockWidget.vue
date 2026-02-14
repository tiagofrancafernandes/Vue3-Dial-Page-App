<template>
    <div class="text-center mb-10 md:mb-14 animate-fade-in">
        <div
            class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800 dark:text-white mb-2 tracking-tight font-mono"
        >
            {{ currentTime }}
        </div>
        <div class="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-medium capitalize">
            {{ currentDate }}
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('');
const currentDate = ref('');
let timeInterval = null;

const updateTime = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    currentDate.value = now.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

onMounted(() => {
    updateTime();
    timeInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
    if (timeInterval) clearInterval(timeInterval);
});
</script>
