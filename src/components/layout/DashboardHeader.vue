<template>
    <header class="flex items-center justify-between px-6 md:px-10 py-5">
        <div class="flex items-center gap-4">
            <div
                class="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 px-4 py-2 rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
            >
                <i class="fa-solid fa-sun text-amber-500 text-sm"></i>
                <span class="text-sm font-medium">72°F New York</span>
            </div>
        </div>
        <div class="flex items-center gap-3">
            <button
                class="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors"
            >
                <i class="fa-regular fa-bell"></i>
            </button>
            <button
                @click="$emit('toggle-theme')"
                class="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors"
                :title="isDark ? 'Modo claro' : 'Modo escuro'"
            >
                <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
            </button>
            <button
                @click="$emit('open-settings')"
                class="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 border-2 border-white dark:border-slate-700 shadow-sm"
            ></button>
        </div>
    </header>
</template>

<script setup>
defineProps({
    isDark: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['toggle-theme', 'open-settings']);
</script>
