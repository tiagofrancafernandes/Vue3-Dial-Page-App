<template>
    <div class="max-w-2xl mx-auto mb-12 md:mb-16 relative animate-slide-up">
        <div class="glass rounded-2xl p-2 shadow-2xl ring-1 ring-black/5">
            <div class="flex items-center bg-white/50 dark:bg-black/30 rounded-xl overflow-hidden">
                <!-- Search Engine Selector -->
                <div class="relative">
                    <button
                        @click="toggleDropdown"
                        class="flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors min-w-[120px] sm:min-w-[140px]"
                    >
                        <img
                            :src="selectedEngine.icon"
                            class="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
                            :alt="selectedEngine.label"
                            @error="handleImageError"
                        />
                        <span class="text-gray-700 dark:text-gray-300 font-medium text-sm truncate">
                            {{ selectedEngine.label }}
                        </span>
                        <i
                            class="fa-solid fa-chevron-down text-gray-400 text-xs ml-auto transition-transform"
                            :class="{ 'rotate-180': showDropdown }"
                        ></i>
                    </button>

                    <!-- Dropdown -->
                    <Transition
                        enter-active-class="transition ease-out duration-200"
                        enter-from-class="opacity-0 translate-y-2"
                        enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition ease-in duration-150"
                        leave-from-class="opacity-100 translate-y-0"
                        leave-to-class="opacity-0 translate-y-2"
                    >
                        <div
                            v-if="showDropdown"
                            class="absolute top-full left-0 mt-2 w-64 sm:w-72 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-[60vh] overflow-y-auto"
                        >
                            <div class="p-2">
                                <div
                                    v-for="engine in searchEngines"
                                    :key="engine.id"
                                    @click="selectEngine(engine)"
                                    class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                    :class="{ 'bg-primary-50 dark:bg-primary-900/20': selectedEngine.id === engine.id }"
                                >
                                    <img
                                        :src="engine.icon"
                                        class="w-5 h-5 object-contain flex-shrink-0"
                                        @error="handleImageError"
                                    />
                                    <span class="text-gray-700 dark:text-gray-300 text-sm font-medium">
                                        {{ engine.label }}
                                    </span>
                                    <i
                                        v-if="selectedEngine.id === engine.id"
                                        class="fa-solid fa-check text-primary-500 ml-auto text-xs"
                                    ></i>
                                </div>

                                <div class="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                                <button
                                    @click="openAddEngine"
                                    class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-primary-600 dark:text-primary-400 font-medium text-sm transition-colors"
                                >
                                    <i class="fa-solid fa-plus w-5 text-center"></i>
                                    Adicionar buscador
                                </button>
                            </div>
                        </div>
                    </Transition>
                </div>

                <div class="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1"></div>

                <!-- Search Input -->
                <input
                    v-model="searchQuery"
                    @keyup.enter="performSearch"
                    type="text"
                    placeholder="Pesquise ou digite um endereço..."
                    class="flex-1 px-3 sm:px-4 py-3 sm:py-4 bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none text-base sm:text-lg min-w-0"
                    ref="searchInput"
                />

                <button
                    v-if="searchQuery"
                    @click="searchQuery = ''"
                    class="px-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <button
                    @click="performSearch"
                    class="px-4 sm:px-6 py-3 sm:py-4 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                    <i class="fa-solid fa-magnifying-glass text-lg sm:text-xl"></i>
                </button>
            </div>
        </div>

        <!-- Click outside to close dropdown -->
        <div v-if="showDropdown" @click="showDropdown = false" class="fixed inset-0 z-40"></div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDialStore } from '@/stores/dialStore';
import { toast } from 'vue3-toastify';

const store = useDialStore();
const { searchEngines, selectedEngine, searchQuery } = storeToRefs(store);

const showDropdown = ref(false);
const searchInput = ref(null);

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const selectEngine = (engine) => {
    store.setSearchEngine(engine.id);
    showDropdown.value = false;
    toast.success(`Buscador: ${engine.label}`, { autoClose: 2000 });
    searchInput.value?.focus();
};

const performSearch = () => {
    if (!searchQuery.value.trim()) {
        searchInput.value?.focus();
        return;
    }

    const url = selectedEngine.value.url.replace('%s', encodeURIComponent(searchQuery.value));

    if (selectedEngine.value.method === 'POST') {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url.split('?')[0];
        form.target = '_blank';

        const params = new URLSearchParams(url.split('?')[1] || '');
        params.forEach((value, key) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    } else {
        window.open(url, '_blank');
    }

    searchQuery.value = '';
};

const openAddEngine = () => {
    showDropdown.value = false;
    const event = new CustomEvent('open-engine-modal');
    window.dispatchEvent(event);
};

const handleImageError = (e) => {
    e.target.src =
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="35" fill="%239ca3af" text-anchor="middle" dominant-baseline="middle"%3E🔍%3C/text%3E%3C/svg%3E';
};
</script>
