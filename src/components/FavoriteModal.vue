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
                class="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/30 dark:bg-background-dark/60 backdrop-blur-sm p-4"
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
                        class="w-full max-w-lg max-h-[90vh] rounded-2xl shadow-2xl transform overflow-hidden flex flex-col border border-white/40 dark:border-white/10 bg-white/80 dark:bg-[#121022]/80 backdrop-blur-xl"
                        @click.stop
                    >
                        <div
                            class="px-6 py-5 border-b border-slate-200/60 dark:border-white/10 flex justify-between items-center"
                        >
                            <div>
                                <h3 class="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
                                    {{ isEditing ? 'Editar' : 'Adicionar' }} Favorito
                                </h3>
                            </div>
                            <button
                                @click="close"
                                class="p-2 hover:bg-slate-200/50 dark:hover:bg-white/10 rounded-full transition-colors group"
                            >
                                <i
                                    class="fa-solid fa-xmark text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white"
                                ></i>
                            </button>
                        </div>

                        <form id="favorite-form" @submit.prevent="save" class="flex-1 overflow-y-auto p-6 space-y-6">
                            <div class="space-y-1.5">
                                <label class="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Nome</label>
                                <input
                                    v-model="form.label"
                                    type="text"
                                    required
                                    class="w-full bg-white border border-slate-200 dark:bg-white/5 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-0 focus:border-primary-500 transition-all shadow-sm dark:shadow-none"
                                    placeholder="Ex: GitHub"
                                />
                            </div>

                            <div class="space-y-1.5">
                                <label class="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">URL</label>
                                <input
                                    v-model="form.url"
                                    type="url"
                                    required
                                    class="w-full bg-white border border-slate-200 dark:bg-white/5 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-0 focus:border-primary-500 transition-all shadow-sm dark:shadow-none"
                                    placeholder="https://github.com"
                                />
                            </div>

                            <div class="space-y-1.5">
                                <label class="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                                    Ícone (URL opcional)
                                </label>
                                <div class="relative flex items-center group">
                                    <input
                                        v-model="form.icon"
                                        type="url"
                                        class="w-full bg-white border border-slate-200 dark:bg-white/5 dark:border-white/10 rounded-xl pl-4 pr-14 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-0 focus:border-primary-500 transition-all shadow-sm dark:shadow-none"
                                        placeholder="https://github.com/favicon.ico"
                                    />
                                    <button
                                        type="button"
                                        @click="fetchFavicon"
                                        class="absolute right-2 p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center"
                                        title="Detectar ícone automaticamente"
                                    >
                                        <i class="fa-solid fa-wand-magic-sparkles text-[14px]"></i>
                                    </button>
                                </div>
                                <p class="text-[11px] text-slate-500 ml-1">
                                    Dica: use o botão mágico para buscar ícone.
                                </p>
                            </div>

                            <!-- Preview -->
                            <div
                                v-if="form.label || form.icon"
                                class="p-4 bg-slate-50/80 dark:bg-white/5 rounded-xl flex items-center gap-3"
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
                        </form>

                        <div
                            class="px-6 py-6 bg-slate-50/50 dark:bg-white/[0.02] border-t border-slate-200/60 dark:border-white/10 flex items-center justify-end gap-3"
                        >
                            <button
                                type="button"
                                @click="close"
                                class="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                form="favorite-form"
                                class="px-8 py-2.5 rounded-xl text-sm font-semibold bg-primary-600 text-white hover:opacity-90 shadow-lg shadow-primary-500/30 transition-all"
                            >
                                Salvar
                            </button>
                        </div>
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
