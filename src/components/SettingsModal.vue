<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                class="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6"
                @click="close"
            >
                <Transition
                    enter-active-class="transition ease-out duration-300"
                    enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-200"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-95"
                >
                    <div
                        v-if="isVisible"
                        class="w-full max-w-6xl max-h-[92vh] bg-background-light dark:bg-background-dark rounded-2xl shadow-2xl flex overflow-hidden border border-slate-200 dark:border-slate-800"
                        @click.stop
                    >
                        <aside
                            class="w-72 bg-white dark:bg-[#16151d] border-r border-slate-200 dark:border-[#25232e] flex-col shrink-0 hidden md:flex"
                        >
                            <div class="p-6 border-b border-slate-100 dark:border-[#25232e] flex items-center gap-3">
                                <div class="bg-primary-600 p-2 rounded-lg text-white">
                                    <i class="fa-solid fa-grid-2 text-sm"></i>
                                </div>
                                <h1 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                    DialPage
                                </h1>
                            </div>
                            <nav class="flex-1 overflow-y-auto py-6">
                                <div class="px-4 mb-4">
                                    <p
                                        class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 mb-2"
                                    >
                                        Configuration
                                    </p>
                                    <button
                                        class="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <i class="fa-solid fa-sliders text-sm"></i>
                                        <span class="font-medium">General</span>
                                    </button>
                                    <button
                                        class="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-r-4 border-primary-600 transition-colors"
                                    >
                                        <i class="fa-solid fa-magnifying-glass text-sm"></i>
                                        <span class="font-medium">Search Engines</span>
                                    </button>
                                    <button
                                        class="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <i class="fa-solid fa-cloud-arrow-up text-sm"></i>
                                        <span class="font-medium">Data & Sync</span>
                                    </button>
                                </div>
                                <div class="px-4 mb-4">
                                    <p
                                        class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 mb-2"
                                    >
                                        Preferences
                                    </p>
                                    <button
                                        class="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <i class="fa-solid fa-palette text-sm"></i>
                                        <span class="font-medium">Appearance</span>
                                    </button>
                                    <button
                                        class="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <i class="fa-solid fa-shield-halved text-sm"></i>
                                        <span class="font-medium">Privacy</span>
                                    </button>
                                </div>
                            </nav>
                            <div class="p-6 border-t border-slate-100 dark:border-[#25232e]">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="size-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400"
                                    >
                                        <i class="fa-solid fa-user text-sm"></i>
                                    </div>
                                    <div class="overflow-hidden">
                                        <p class="text-sm font-bold truncate text-slate-900 dark:text-white">
                                            Dial APP
                                        </p>
                                        <p class="text-xs text-slate-500 truncate">v1.2.4 Premium</p>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <main class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
                            <header
                                class="sticky top-0 z-10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-[#25232e] px-6 md:px-8 py-4 flex items-center justify-between"
                            >
                                <div class="flex items-center gap-4">
                                    <h2 class="text-xl font-bold text-slate-900 dark:text-white">Search Engines</h2>
                                    <span
                                        class="bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase"
                                    >
                                        Default:
                                        {{
                                            searchEngines.find((e) => e.id === store.selectedEngineId)?.label ||
                                            'Google'
                                        }}
                                    </span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <button
                                        @click="close"
                                        class="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                    >
                                        Fechar
                                    </button>
                                    <button
                                        @click="close"
                                        class="bg-primary-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary-500/25 hover:opacity-90 transition-all"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </header>

                            <div class="max-w-5xl mx-auto p-6 md:p-8">
                                <section class="mb-10">
                                    <div class="flex justify-between items-end mb-6">
                                        <div>
                                            <h3 class="text-lg font-bold text-slate-900 dark:text-white">
                                                Manage Providers
                                            </h3>
                                            <p class="text-slate-500 text-sm">
                                                Drag to reorder your preferred search shortcuts.
                                            </p>
                                        </div>
                                        <button
                                            @click="addEngine"
                                            class="flex items-center gap-2 bg-white dark:bg-[#16151d] border border-slate-200 dark:border-[#25232e] px-4 py-2 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
                                        >
                                            <i class="fa-solid fa-plus text-xs"></i>
                                            Add New Engine
                                        </button>
                                    </div>

                                    <div class="grid gap-3">
                                        <div
                                            v-for="engine in searchEngines"
                                            :key="engine.id"
                                            class="bg-white dark:bg-[#16151d] p-4 rounded-xl border border-slate-200 dark:border-[#25232e] flex items-center justify-between group hover:border-primary-500/50 transition-all"
                                        >
                                            <div class="flex items-center gap-4 min-w-0">
                                                <i
                                                    class="fa-solid fa-grip-vertical text-slate-300 dark:text-slate-600"
                                                ></i>
                                                <div
                                                    class="size-12 rounded-lg bg-slate-50 dark:bg-slate-900/40 flex items-center justify-center"
                                                >
                                                    <img
                                                        :src="engine.icon"
                                                        class="size-8 object-contain"
                                                        @error="handleImageError"
                                                    />
                                                </div>
                                                <div class="min-w-0">
                                                    <h4
                                                        class="font-bold flex items-center gap-2 text-slate-900 dark:text-white truncate"
                                                    >
                                                        {{ engine.label }}
                                                        <span
                                                            v-if="String(engine.id) === String(store.selectedEngineId)"
                                                            class="text-[10px] bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded leading-none font-black uppercase"
                                                        >
                                                            Active
                                                        </span>
                                                    </h4>
                                                    <p class="text-xs text-slate-400 truncate">{{ engine.url }}</p>
                                                </div>
                                            </div>
                                            <div
                                                class="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                                            >
                                                <button
                                                    @click="editEngine(engine)"
                                                    class="p-2 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                                                >
                                                    <i class="fa-solid fa-pen"></i>
                                                </button>
                                                <button
                                                    v-if="!engine.isDefault"
                                                    @click="deleteEngine(engine)"
                                                    class="p-2 text-slate-400 hover:text-red-500"
                                                >
                                                    <i class="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <section>
                                        <h3 class="text-lg font-bold mb-6 text-slate-900 dark:text-white">
                                            Interface Options
                                        </h3>
                                        <div
                                            class="bg-white dark:bg-[#16151d] rounded-xl border border-slate-200 dark:border-[#25232e] divide-y divide-slate-100 dark:divide-[#25232e]"
                                        >
                                            <div class="p-4 flex items-center justify-between">
                                                <div>
                                                    <p class="text-sm font-semibold text-slate-900 dark:text-white">
                                                        Navbar fixada?
                                                    </p>
                                                    <p class="text-xs text-slate-500">
                                                        A barra superior acompanha a rolagem.
                                                    </p>
                                                </div>
                                                <label class="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        :checked="isNavbarFixed"
                                                        @change="toggleNavbarFixed"
                                                        class="sr-only peer"
                                                        type="checkbox"
                                                    />
                                                    <div
                                                        class="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer-checked:bg-primary-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"
                                                    ></div>
                                                </label>
                                            </div>
                                            <div class="p-4 flex items-center justify-between">
                                                <div>
                                                    <p class="text-sm font-semibold text-slate-900 dark:text-white">
                                                        Theme
                                                    </p>
                                                    <p class="text-xs text-slate-500">Alterna entre claro e escuro.</p>
                                                </div>
                                                <button
                                                    @click="store.toggleTheme()"
                                                    class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
                                                >
                                                    {{ store.isDark ? 'Dark' : 'Light' }}
                                                </button>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h3 class="text-lg font-bold mb-6 text-slate-900 dark:text-white">
                                            Data & Backup
                                        </h3>
                                        <div class="grid gap-4">
                                            <div
                                                class="bg-white dark:bg-[#16151d] p-5 rounded-xl border border-slate-200 dark:border-[#25232e]"
                                            >
                                                <div class="flex items-center justify-between mb-4">
                                                    <div class="flex items-center gap-3">
                                                        <i
                                                            class="fa-solid fa-database text-primary-600 dark:text-primary-400"
                                                        ></i>
                                                        <p class="text-sm font-bold text-slate-900 dark:text-white">
                                                            Current Data
                                                        </p>
                                                    </div>
                                                    <p class="text-sm text-slate-500">
                                                        {{ favoritesCount }} fav • {{ enginesCount }} eng
                                                    </p>
                                                </div>
                                                <div class="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                                                    <div
                                                        class="bg-primary-600 h-2 rounded-full"
                                                        style="width: 45%"
                                                    ></div>
                                                </div>
                                            </div>
                                            <div class="flex gap-3">
                                                <button
                                                    @click="exportData"
                                                    class="flex-1 bg-white dark:bg-[#16151d] border border-slate-200 dark:border-[#25232e] py-3 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                                >
                                                    <i class="fa-solid fa-download"></i>
                                                    Export JSON
                                                </button>
                                                <label
                                                    class="flex-1 bg-white dark:bg-[#16151d] border border-slate-200 dark:border-[#25232e] py-3 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                                                >
                                                    <i class="fa-solid fa-upload"></i>
                                                    Import
                                                    <input
                                                        type="file"
                                                        @change="importData"
                                                        accept=".json"
                                                        class="hidden"
                                                    />
                                                </label>
                                            </div>
                                            <button
                                                @click="resetData"
                                                class="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                            >
                                                <i class="fa-solid fa-trash-can"></i>
                                                Clear All Configuration
                                            </button>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </main>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDialStore } from '@/stores/dialStore';
import { toast } from 'vue3-toastify';

const emit = defineEmits(['close', 'open-engine-modal']);

const store = useDialStore();
const { searchEngines, favorites, isNavbarFixed } = storeToRefs(store);
const isVisible = ref(false);

const favoritesCount = computed(() => favorites.value.length);
const enginesCount = computed(() => searchEngines.value.length);

onMounted(() => {
    isVisible.value = true;
    window.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape);
});

const handleEscape = (e) => {
    if (e.key === 'Escape') close();
};

const handleImageError = (e) => {
    e.target.src =
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="35" fill="%239ca3af" text-anchor="middle" dominant-baseline="middle"%3E🔍%3C/text%3E%3C/svg%3E';
};

const addEngine = () => {
    close();
    setTimeout(() => {
        emit('open-engine-modal');
    }, 200);
};

const editEngine = (engine) => {
    close();
    setTimeout(() => {
        emit('open-engine-modal', engine);
    }, 200);
};

const toggleNavbarFixed = () => {
    isNavbarFixed.value = !isNavbarFixed.value;
};

const deleteEngine = (engine) => {
    if (confirm(`Deseja excluir o buscador "${engine.label}"?`)) {
        store.deleteSearchEngine(engine.id);
        toast.success('Buscador removido!');
    }
};

const exportData = () => {
    const data = store.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dialpage-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Backup exportado!');
};

const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            store.importData(data);
            toast.success('Dados importados com sucesso!');
        } catch (err) {
            toast.error('Arquivo inválido ou corrompido');
        }
    };
    reader.readAsText(file);
    e.target.value = '';
};

const resetData = () => {
    if (
        confirm(
            'ATENÇÃO: Isso apagará TODOS os seus dados personalizados e restaurará os padrões. Esta ação não pode ser desfeita.\n\nDeseja continuar?'
        )
    ) {
        store.resetToDefaults();
        toast.success('Dados resetados para o padrão!');
    }
};

const close = () => {
    isVisible.value = false;
    setTimeout(() => emit('close'), 200);
};
</script>
