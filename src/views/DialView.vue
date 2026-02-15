<template>
    <div
        class="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 relative overflow-hidden flex"
    >
        <DashboardSidebar @open-settings="showSettings = true" @add-shortcut="handleOpenFavoriteModal()" />

        <main class="flex-1 flex flex-col relative overflow-hidden min-w-0">
            <DashboardHeader
                :is-dark="isDark"
                @toggle-theme="store.toggleTheme()"
                @open-settings="showSettings = true"
            />

            <section
                class="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full px-6 -mt-8 md:-mt-12"
            >
                <MainContentStack>
                    <ClockWidget />
                    <SearchBox />
                    <FavoriteGrid />
                </MainContentStack>
            </section>

            <DashboardFooter />

            <div
                class="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/10 blur-[120px] rounded-full pointer-events-none"
            ></div>
            <div
                class="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500/10 blur-[120px] rounded-full pointer-events-none"
            ></div>
        </main>

        <EngineModal v-if="showEngineModal" :edit-data="engineModalEditData" @close="closeEngineModal" />
        <FavoriteModal v-if="showFavoriteModal" :edit-data="favoriteModalEditData" @close="closeFavoriteModal" />
        <SettingsModal
            v-if="showSettings"
            @close="showSettings = false"
            @open-engine-modal="openEngineModalFromSettings"
        />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDialStore } from '@/stores/dialStore';

import ClockWidget from '@/components/ClockWidget.vue';
import SearchBox from '@/components/SearchBox.vue';
import FavoriteGrid from '@/components/FavoriteGrid.vue';
import EngineModal from '@/components/EngineModal.vue';
import FavoriteModal from '@/components/FavoriteModal.vue';
import SettingsModal from '@/components/SettingsModal.vue';
import MainContentStack from '@/components/layout/MainContentStack.vue';
import DashboardSidebar from '@/components/layout/DashboardSidebar.vue';
import DashboardHeader from '@/components/layout/DashboardHeader.vue';
import DashboardFooter from '@/components/layout/DashboardFooter.vue';

const store = useDialStore();
const { isDark, showSettings } = storeToRefs(store);

const showEngineModal = ref(false);
const showFavoriteModal = ref(false);
const engineModalEditData = ref(null);
const favoriteModalEditData = ref(null);

const closeEngineModal = () => {
    showEngineModal.value = false;
    engineModalEditData.value = null;
};

const closeFavoriteModal = () => {
    showFavoriteModal.value = false;
    favoriteModalEditData.value = null;
};

const openEngineModalFromSettings = (engine = null) => {
    engineModalEditData.value = engine;
    showEngineModal.value = true;
};

const handleOpenEngineModal = (event) => {
    engineModalEditData.value = event?.detail || null;
    showEngineModal.value = true;
};

const handleOpenFavoriteModal = (event) => {
    favoriteModalEditData.value = event?.detail || null;
    showFavoriteModal.value = true;
};

const handleEditFavoriteModal = (event) => {
    favoriteModalEditData.value = event?.detail || null;
    showFavoriteModal.value = true;
};

onMounted(() => {
    window.addEventListener('open-engine-modal', handleOpenEngineModal);
    window.addEventListener('open-favorite-modal', handleOpenFavoriteModal);
    window.addEventListener('edit-favorite-modal', handleEditFavoriteModal);
});

onUnmounted(() => {
    window.removeEventListener('open-engine-modal', handleOpenEngineModal);
    window.removeEventListener('open-favorite-modal', handleOpenFavoriteModal);
    window.removeEventListener('edit-favorite-modal', handleEditFavoriteModal);
});
</script>
