<template>
    <div :class="{ 'edit-mode': isEditMode }" class="w-full">
        <div
            class="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6"
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
                class="favorite-card group flex flex-col items-center gap-3"
                :class="{ dragging: draggingIndex === index }"
            >
                <a
                    :href="favorite.url"
                    @click.prevent="!isEditMode && openUrl(favorite.url)"
                    class="relative w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-md border border-slate-100 dark:border-slate-700 group-hover:shadow-lg group-hover:-translate-y-1 transition-all"
                >
                    <img
                        v-if="favorite.icon"
                        :src="favorite.icon"
                        class="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity"
                        @error="handleImageError"
                    />
                    <i v-else class="fa-solid fa-globe text-2xl text-slate-400"></i>

                    <div
                        v-if="isEditMode"
                        class="absolute inset-0 rounded-2xl bg-primary-500/20 dark:bg-primary-500/30 flex items-center justify-center gap-2 z-10 backdrop-blur-sm"
                    >
                        <button
                            @click.stop="editFavorite(favorite)"
                            class="w-8 h-8 rounded-full bg-white dark:bg-gray-800 text-primary-600 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                        >
                            <i class="fa-solid fa-pen text-xs"></i>
                        </button>
                        <button
                            @click.stop="confirmDelete(favorite)"
                            class="w-8 h-8 rounded-full bg-white dark:bg-gray-800 text-red-500 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                        >
                            <i class="fa-solid fa-trash text-xs"></i>
                        </button>
                    </div>
                </a>
                <span
                    class="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-center line-clamp-1"
                >
                    {{ favorite.label }}
                </span>
            </div>

            <button
                v-if="favorites.length < 12 && !isEditMode"
                @click="openAddFavorite"
                class="group flex flex-col items-center gap-3"
            >
                <div
                    class="w-16 h-16 rounded-2xl bg-slate-200/50 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center group-hover:border-primary-500 group-hover:bg-primary-500/5 transition-all"
                >
                    <i class="fa-solid fa-plus text-slate-400 group-hover:text-primary-500"></i>
                </div>
                <span class="text-sm font-medium text-slate-400 group-hover:text-primary-500 transition-colors">
                    New
                </span>
            </button>
        </div>

        <div v-if="favorites.length === 0" class="text-center py-12 text-slate-500 dark:text-slate-400">
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
};
</script>
