<template>
    <div
        class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-500 relative overflow-hidden"
    >
        <!-- Background Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div
                class="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse"
            ></div>
            <div
                class="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse"
                style="animation-delay: 1s"
            ></div>
        </div>

        <!-- Header -->
        <header class="relative z-10 flex justify-between items-center p-6">
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
                    @click="toggleEditMode"
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
                    @click="store.toggleTheme()"
                    class="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform active:scale-95"
                    :title="isDark ? 'Modo claro' : 'Modo escuro'"
                >
                    <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
                </button>

                <button
                    @click="showSettings = true"
                    class="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform active:scale-95"
                    title="Configurações"
                >
                    <i class="fa-solid fa-gear"></i>
                </button>
            </div>
        </header>

        <!-- Main Content -->
        <main class="relative z-10 container mx-auto px-6 pt-8 md:pt-16 pb-20 max-w-5xl">
            <!-- Clock -->
            <ClockWidget />

            <!-- Search -->
            <SearchBox />

            <!-- Favorites -->
            <FavoriteGrid />
        </main>

        <!-- Modals -->
        <EngineModal v-if="showEngineModal" @close="showEngineModal = false" />
        <FavoriteModal v-if="showFavoriteModal" @close="showFavoriteModal = false" />
        <SettingsModal v-if="showSettings" @close="showSettings = false" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDialStore } from '@/stores/dialStore';
import { toast } from 'vue3-toastify';

import ClockWidget from '@/components/ClockWidget.vue';
import SearchBox from '@/components/SearchBox.vue';
import FavoriteGrid from '@/components/FavoriteGrid.vue';
import EngineModal from '@/components/EngineModal.vue';
import FavoriteModal from '@/components/FavoriteModal.vue';
import SettingsModal from '@/components/SettingsModal.vue';

const store = useDialStore();
const { isDark, isEditMode, showSettings } = storeToRefs(store);

const showEngineModal = ref(false);
const showFavoriteModal = ref(false);

const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value;
    if (isEditMode.value) {
        toast.info('Modo de edição ativado. Arraste para reordenar.', {
            position: 'bottom-center',
        });
    }
};

onMounted(() => {
    window.addEventListener('open-engine-modal', () => {
        showEngineModal.value = true;
    });

    window.addEventListener('open-favorite-modal', () => {
        showFavoriteModal.value = true;
    });

    window.addEventListener('edit-favorite-modal', (e) => {
        showFavoriteModal.value = true;
    });
});
</script>
