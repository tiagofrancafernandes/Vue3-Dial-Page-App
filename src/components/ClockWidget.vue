<template>
    <div class="text-center mb-12 animate-fade-in">
        <div
            class="text-[72px] sm:text-[96px] md:text-[120px] font-light tracking-tighter text-slate-900 dark:text-white leading-none"
        >
            {{ currentTime }}
        </div>
        <div class="text-xl font-medium text-slate-500 dark:text-slate-400 mt-2 capitalize">
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
