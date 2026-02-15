<template>
    <header
        :class="[
            'z-20 flex justify-between items-center p-6 transition-all duration-300',
            isNavbarFixed
                ? 'fixed top-0 left-0 right-0 backdrop-blur-md bg-white/75 dark:bg-gray-900/65 border-b border-black/5 dark:border-white/10'
                : 'relative',
        ]"
    >
        <div class="flex items-center gap-3">
            <div
                class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
            >
                <i class="fa-solid fa-compass"></i>
            </div>
            <span class="text-xl font-bold text-gray-800 dark:text-white tracking-tight">DialPage</span>
        </div>

        <div class="flex items-center gap-3">
            <button
                @click="$emit('toggle-edit')"
                :class="[
                    'px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95',
                    {
                        'bg-primary-600 text-white': isEditMode,
                        'glass text-gray-700 dark:text-gray-300': !isEditMode,
                    },
                ]"
            >
                <i :class="isEditMode ? 'fa-solid fa-check' : 'fa-solid fa-pen'"></i>
                <span class="hidden sm:inline">{{ isEditMode ? 'Concluir' : 'Editar' }}</span>
            </button>

            <button
                @click="$emit('toggle-theme')"
                class="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform active:scale-95"
                :title="isDark ? 'Modo claro' : 'Modo escuro'"
            >
                <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
            </button>

            <button
                @click="$emit('open-settings')"
                class="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform active:scale-95"
                title="Configurações"
            >
                <i class="fa-solid fa-gear"></i>
            </button>
        </div>
    </header>
</template>

<script setup>
defineProps({
    isNavbarFixed: {
        type: Boolean,
        default: false,
    },
    isEditMode: {
        type: Boolean,
        default: false,
    },
    isDark: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['toggle-edit', 'toggle-theme', 'open-settings']);
</script>
