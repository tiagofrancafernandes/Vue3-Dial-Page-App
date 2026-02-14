<template>
    <div :class="{ dark: isDark }" class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <router-view />
    </div>
</template>

<script setup>
import { useDialStore } from '@/stores/dialStore';
import { storeToRefs } from 'pinia';

const store = useDialStore();
const { isDark } = storeToRefs(store);
</script>
