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
                    enter-from-class="opacity-0 scale-95 translate-y-4"
                    enter-to-class="opacity-100 scale-100 translate-y-0"
                    leave-active-class="transition ease-in duration-200"
                    leave-from-class="opacity-100 scale-100 translate-y-0"
                    leave-to-class="opacity-0 scale-95 translate-y-4"
                >
                    <div
                        v-if="isVisible"
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform"
                        @click.stop
                    >
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                                {{ isEditing ? 'Editar' : 'Adicionar' }} Favorito
                            </h3>
                            <button
                                @click="close"
                                class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <i class="fa-solid fa-xmark text-xl"></i>
                            </button>
                        </div>

                        <form @submit.prevent="save" class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    Nome
                                </label>
                                <input
                                    v-model="form.label"
                                    type="text"
                                    required
                                    class="input-field"
                                    placeholder="Ex: GitHub"
                                />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    URL
                                </label>
                                <input
                                    v-model="form.url"
                                    type="url"
                                    required
                                    class="input-field"
                                    placeholder="https://github.com"
                                />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                    Ícone (URL opcional)
                                </label>
                                <div class="flex gap-2">
                                    <input
                                        v-model="form.icon"
                                        type="url"
                                        class="input-field"
                                        placeholder="https://github.com/favicon.ico"
                                    />
                                    <button
                                        type="button"
                                        @click="fetchFavicon"
                                        class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap"
                                        title="Detectar ícone automaticamente"
                                    >
                                        <i class="fa-solid fa-wand-magic-sparkles"></i>
                                    </button>
                                </div>
                                <p class="text-xs text-gray-500 mt-1">Deixe em branco para usar ícone padrão</p>
                            </div>

                            <!-- Preview -->
                            <div
                                v-if="form.label || form.icon"
                                class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex items-center gap-3"
                            >
                                <div
                                    class="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow flex items-center justify-center"
                                >
                                    <img
                                        v-if="form.icon"
                                        :src="form.icon"
                                        class="w-8 h-8 object-contain"
                                        @error="$event.target.style.display = 'none'"
                                    />
                                    <i v-else class="fa-solid fa-globe text-2xl text-gray-400"></i>
                                </div>
                                <div>
                                    <p class="font-medium text-gray-800 dark:text-white">{{ form.label || 'Nome' }}</p>
                                    <p class="text-xs text-gray-500 truncate max-w-[200px]">
                                        {{ form.url || 'https://...' }}
                                    </p>
                                </div>
                            </div>

                            <div class="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    @click="close"
                                    class="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    class="flex-1 py-2.5 px-4 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors font-medium shadow-lg shadow-primary-500/30"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useDialStore } from '@/stores/dialStore';
import { toast } from 'vue3-toastify';

const props = defineProps({
    editData: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(['close']);

const store = useDialStore();
const isVisible = ref(false);
const isEditing = ref(false);

const form = ref({
    label: '',
    url: '',
    icon: '',
});

onMounted(() => {
    isVisible.value = true;

    if (props.editData) {
        isEditing.value = true;
        form.value = { ...props.editData };
    }

    window.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape);
});

const handleEscape = (e) => {
    if (e.key === 'Escape') close();
};

const canLoadImage = (src) =>
    new Promise((resolve) => {
        const img = new Image();
        let settled = false;

        const finish = (result) => {
            if (settled) return;
            settled = true;
            resolve(result);
        };

        const timer = setTimeout(() => finish(false), 3000);
        img.onload = () => {
            clearTimeout(timer);
            finish(true);
        };
        img.onerror = () => {
            clearTimeout(timer);
            finish(false);
        };
        img.src = src;
    });

const fetchFavicon = async () => {
    try {
        const normalizedUrl =
            form.value.url.startsWith('http://') || form.value.url.startsWith('https://')
                ? form.value.url
                : `https://${form.value.url}`;
        const url = new URL(normalizedUrl);
        const defaultFavicon = `${url.origin}/favicon.ico`;
        const googleFallback = `https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(url.hostname)}`;

        const hasDefaultFavicon = await canLoadImage(defaultFavicon);
        form.value.icon = hasDefaultFavicon ? defaultFavicon : googleFallback;

        if (hasDefaultFavicon) {
            toast.info('Icone detectado automaticamente!', { autoClose: 2000 });
        } else {
            toast.info('Icone padrao nao encontrado. Usando fallback do Google.', { autoClose: 2500 });
        }
    } catch {
        toast.error('URL inválida');
    }
};

const save = () => {
    if (!form.value.label || !form.value.url) {
        toast.error('Preencha os campos obrigatórios');
        return;
    }

    let url = form.value.url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
        form.value.url = url;
    }

    if (isEditing.value) {
        store.updateFavorite(props.editData.id, form.value);
        toast.success('Favorito atualizado!');
    } else {
        store.addFavorite(form.value);
        toast.success('Favorito adicionado!');
    }

    close();
};

const close = () => {
    isVisible.value = false;
    setTimeout(() => emit('close'), 200);
};
</script>
