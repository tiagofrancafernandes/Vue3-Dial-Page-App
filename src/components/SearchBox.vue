<template>
    <div class="w-full max-w-2xl mx-auto mb-16 relative animate-slide-up">
        <div class="relative group">
            <div
                class="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600 transition-colors"
            >
                <i class="fa-solid fa-magnifying-glass text-2xl"></i>
            </div>
            <input
                v-model="searchQuery"
                @keyup.enter="performSearch"
                type="text"
                placeholder="Search the web or type a URL"
                class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-2xl py-5 pl-14 pr-6 text-lg text-slate-900 dark:text-white shadow-xl shadow-slate-200/50 dark:shadow-none focus:ring-0 transition-all placeholder:text-slate-400"
                ref="searchInput"
            />

            <div class="absolute inset-y-0 right-5 flex items-center gap-2">
                <button
                    @click="toggleDropdown"
                    class="inline-flex items-center gap-2 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                    <img
                        :src="selectedEngine.icon"
                        class="w-3.5 h-3.5 object-contain"
                        :alt="selectedEngine.label"
                        @error="handleImageError"
                    />
                    <span class="max-w-16 truncate">{{ selectedEngine.label }}</span>
                    <i class="fa-solid fa-chevron-down text-[10px]" :class="{ 'rotate-180': showDropdown }"></i>
                </button>
                <kbd
                    class="hidden md:inline-flex items-center px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded text-xs font-sans"
                >
                    / ou ⌘/Ctrl K
                </kbd>
            </div>

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
                    class="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-[80] max-h-[60vh] overflow-y-auto"
                >
                    <div class="p-2">
                        <div
                            v-for="engine in searchEngines"
                            :key="engine.id"
                            @click="selectEngine(engine)"
                            class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                            :class="{ 'bg-primary-50 dark:bg-primary-900/20': isEngineSelected(engine) }"
                        >
                            <img
                                :src="engine.icon"
                                class="w-5 h-5 object-contain flex-shrink-0"
                                @error="handleImageError"
                            />
                            <span class="text-gray-700 dark:text-gray-300 text-sm font-medium">{{ engine.label }}</span>
                            <i
                                v-if="isEngineSelected(engine)"
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

        <div v-if="showDropdown" @click="showDropdown = false" class="fixed inset-0 z-40"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
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

const isEditableElement = (target) => {
    if (!(target instanceof HTMLElement)) return false;
    if (target.isContentEditable) return true;
    return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
};

const focusSearchInput = () => {
    showDropdown.value = false;
    searchInput.value?.focus();
};

const handleGlobalSearchShortcut = (e) => {
    const key = String(e.key || '').toLowerCase();
    const isCmdOrCtrlK = (e.metaKey || e.ctrlKey) && key === 'k';
    const isSlashShortcut = key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey;

    if (!isCmdOrCtrlK && !isSlashShortcut) return;
    if (isEditableElement(e.target)) return;

    e.preventDefault();
    focusSearchInput();
};

const selectEngine = (engine) => {
    store.setSearchEngine(engine.id);
    showDropdown.value = false;
    toast.success(`Buscador: ${engine.label}`, { autoClose: 2000 });
    searchInput.value?.focus();
};

const isEngineSelected = (engine) => String(selectedEngine.value?.id) === String(engine.id);

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

onMounted(() => {
    window.addEventListener('keydown', handleGlobalSearchShortcut);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleGlobalSearchShortcut);
});
</script>
