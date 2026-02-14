<template>
    <div :class="{ 'edit-mode': isEditMode }">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <i class="fa-solid fa-star text-yellow-500"></i>
                Favoritos
            </h2>
            <button
                v-if="!isEditMode"
                @click="openAddFavorite"
                class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center gap-1 transition-colors px-3 py-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
            >
                <i class="fa-solid fa-plus"></i>
                <span class="hidden sm:inline">Adicionar</span>
            </button>
        </div>

        <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
            @dragover.prevent
            @drop="handleDrop"
        >
            <div
                v-for="(favorite, index) in favorites"
                :key="favorite.id"
                :draggable="isEditMode"
                @dragstart="handleDragStart($event, index)"
                @dragend="handleDragEnd"
                @dragover.prevent
                @drop.stop="handleDropOnItem($event, index)"
                class="favorite-card"
                :class="{ dragging: draggingIndex === index }"
            >
                <a
                    :href="favorite.url"
                    @click.prevent="!isEditMode && openUrl(favorite.url)"
                    class="block glass-card p-3 sm:p-4 aspect-square flex flex-col items-center justify-center gap-2 sm:gap-3 relative overflow-hidden group"
                >
                    <!-- Edit Mode Overlay -->
                    <div
                        v-if="isEditMode"
                        class="absolute inset-0 bg-primary-500/20 dark:bg-primary-500/30 flex items-center justify-center gap-2 z-10 backdrop-blur-sm"
                    >
                        <button
                            @click.stop="editFavorite(favorite)"
                            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-gray-800 text-primary-600 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                        >
                            <i class="fa-solid fa-pen text-xs sm:text-sm"></i>
                        </button>
                        <button
                            @click.stop="confirmDelete(favorite)"
                            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-gray-800 text-red-500 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                        >
                            <i class="fa-solid fa-trash text-xs sm:text-sm"></i>
                        </button>
                    </div>

                    <!-- Drag Handle -->
                    <div v-if="isEditMode" class="absolute top-2 right-2 text-gray-400 cursor-move z-20">
                        <i class="fa-solid fa-grip-vertical text-xs"></i>
                    </div>

                    <div
                        class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center overflow-hidden group-hover:shadow-lg transition-shadow"
                    >
                        <img
                            v-if="favorite.icon"
                            :src="favorite.icon"
                            class="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                            @error="handleImageError"
                        />
                        <i v-else class="fa-solid fa-globe text-xl sm:text-2xl text-gray-400"></i>
                    </div>
                    <span
                        class="text-gray-700 dark:text-gray-300 font-medium text-xs sm:text-sm text-center line-clamp-2 leading-tight"
                    >
                        {{ favorite.label }}
                    </span>
                </a>
            </div>

            <!-- Add Favorite Button -->
            <button
                v-if="favorites.length < 12 && !isEditMode"
                @click="openAddFavorite"
                class="glass-card p-3 sm:p-4 aspect-square flex flex-col items-center justify-center gap-2 sm:gap-3 border-2 border-dashed border-gray-400 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 group"
            >
                <div
                    class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform"
                >
                    <i
                        class="fa-solid fa-plus text-lg sm:text-xl text-gray-500 dark:text-gray-400 group-hover:text-primary-500"
                    ></i>
                </div>
                <span class="text-gray-500 dark:text-gray-400 font-medium text-xs sm:text-sm">Adicionar</span>
            </button>
        </div>

        <!-- Empty State -->
        <div v-if="favorites.length === 0" class="text-center py-12 text-gray-500 dark:text-gray-400">
            <i class="fa-regular fa-star text-4xl mb-3 opacity-50"></i>
            <p>Nenhum favorito ainda</p>
            <button @click="openAddFavorite" class="mt-2 text-primary-600 hover:underline text-sm">
                Adicionar seu primeiro favorito
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useDialStore } from '@/stores/dialStore';
import { toast } from 'vue3-toastify';

const store = useDialStore();
const { favorites, isEditMode } = storeToRefs(store);

const draggingIndex = ref(null);

const openUrl = (url) => {
    window.open(url, '_blank');
};

const openAddFavorite = () => {
    const event = new CustomEvent('open-favorite-modal');
    window.dispatchEvent(event);
};

const editFavorite = (favorite) => {
    const event = new CustomEvent('edit-favorite-modal', { detail: favorite });
    window.dispatchEvent(event);
};

const confirmDelete = (favorite) => {
    if (confirm(`Deseja remover "${favorite.label}" dos favoritos?`)) {
        store.deleteFavorite(favorite.id);
        toast.success('Favorito removido!');
    }
};

const handleDragStart = (e, index) => {
    if (!isEditMode.value) return;
    draggingIndex.value = index;
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('dragging');
};

const handleDragEnd = (e) => {
    draggingIndex.value = null;
    e.target.classList.remove('dragging');
};

const handleDrop = (e) => {
    e.preventDefault();
};

const handleDropOnItem = (e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggingIndex.value === null || draggingIndex.value === dropIndex) return;

    store.reorderFavorites(draggingIndex.value, dropIndex);
    toast.success('Ordem atualizada!', { autoClose: 1500 });
};

const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextElementSibling?.classList.remove('hidden');
};
</script>
