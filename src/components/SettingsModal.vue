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
                class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col transform"
                        @click.stop
                    >
                        <!-- Header -->
                        <div
                            class="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0"
                        >
                            <h3 class="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                <i class="fa-solid fa-gear text-primary-500"></i>
                                Configurações
                            </h3>
                            <button
                                @click="close"
                                class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <i class="fa-solid fa-xmark text-xl"></i>
                            </button>
                        </div>

                        <!-- Content -->
                        <div class="p-6 overflow-y-auto space-y-8">
                            <!-- Search Engines -->
                            <section>
                                <h4
                                    class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2"
                                >
                                    <i class="fa-solid fa-magnifying-glass text-primary-500"></i>
                                    Buscadores
                                </h4>
                                <div class="space-y-2 max-h-64 overflow-y-auto pr-2">
                                    <div
                                        v-for="engine in searchEngines"
                                        :key="engine.id"
                                        class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <div class="flex items-center gap-3 min-w-0">
                                            <img
                                                :src="engine.icon"
                                                class="w-6 h-6 object-contain flex-shrink-0"
                                                @error="handleImageError"
                                            />
                                            <div class="min-w-0">
                                                <span
                                                    class="text-gray-800 dark:text-gray-200 font-medium block truncate"
                                                >
                                                    {{ engine.label }}
                                                </span>
                                                <span class="text-xs text-gray-500 truncate block">
                                                    {{ engine.url }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="flex gap-1 flex-shrink-0">
                                            <button
                                                @click="editEngine(engine)"
                                                class="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                                                title="Editar"
                                            >
                                                <i class="fa-solid fa-pen text-sm"></i>
                                            </button>
                                            <button
                                                v-if="!engine.isDefault"
                                                @click="deleteEngine(engine)"
                                                class="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                title="Excluir"
                                            >
                                                <i class="fa-solid fa-trash text-sm"></i>
                                            </button>
                                            <span
                                                v-else
                                                class="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg"
                                            >
                                                Padrão
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    @click="addEngine"
                                    class="mt-3 w-full py-2.5 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:border-primary-400 dark:hover:text-primary-400 transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                    <i class="fa-solid fa-plus"></i>
                                    Adicionar buscador
                                </button>
                            </section>

                            <!-- Layout -->
                            <section>
                                <h4
                                    class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2"
                                >
                                    <i class="fa-solid fa-window-maximize text-primary-500"></i>
                                    Layout
                                </h4>
                                <div
                                    class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex items-center justify-between gap-4"
                                >
                                    <div>
                                        <p class="text-gray-800 dark:text-gray-200 font-medium">Navbar fixada?</p>
                                        <p class="text-xs text-gray-500 mt-1">
                                            Quando ativa, a barra superior acompanha a rolagem.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        @click="toggleNavbarFixed"
                                        :class="[
                                            'relative inline-flex h-7 w-12 items-center rounded-full transition-colors',
                                            isNavbarFixed ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600',
                                        ]"
                                        :aria-pressed="isNavbarFixed"
                                        aria-label="Alternar navbar fixada"
                                    >
                                        <span
                                            :class="[
                                                'inline-block h-5 w-5 transform rounded-full bg-white transition-transform',
                                                isNavbarFixed ? 'translate-x-6' : 'translate-x-1',
                                            ]"
                                        />
                                    </button>
                                </div>
                            </section>

                            <!-- Data Management -->
                            <section>
                                <h4
                                    class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2"
                                >
                                    <i class="fa-solid fa-database text-primary-500"></i>
                                    Gerenciamento de Dados
                                </h4>
                                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <button
                                        @click="exportData"
                                        class="py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 font-medium"
                                    >
                                        <i class="fa-solid fa-download"></i>
                                        Exportar
                                    </button>
                                    <label
                                        class="py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 font-medium cursor-pointer"
                                    >
                                        <i class="fa-solid fa-upload"></i>
                                        Importar
                                        <input type="file" @change="importData" accept=".json" class="hidden" />
                                    </label>
                                    <button
                                        @click="resetData"
                                        class="py-3 px-4 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center justify-center gap-2 font-medium"
                                    >
                                        <i class="fa-solid fa-rotate-right"></i>
                                        Resetar
                                    </button>
                                </div>
                                <p class="text-xs text-gray-500 mt-2">
                                    Exporte seus dados para backup ou transfira para outro dispositivo.
                                </p>
                            </section>

                            <!-- About -->
                            <section class="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                    <span>DialPage v1.0</span>
                                    <span>{{ favoritesCount }} favoritos • {{ enginesCount }} buscadores</span>
                                </div>
                            </section>
                        </div>
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
