<template>
    <aside
        class="w-64 border-r border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 flex-col justify-between p-6 hidden lg:flex"
    >
        <div class="space-y-8">
            <div class="flex items-center gap-3 px-2">
                <div
                    class="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/20"
                >
                    <i class="fa-solid fa-compass"></i>
                </div>
                <div>
                    <h1 class="text-lg font-bold tracking-tight text-slate-900 dark:text-white">DialPage</h1>
                    <p class="text-xs text-slate-500 font-medium uppercase tracking-wider">Dashboard</p>
                </div>
            </div>

            <nav class="space-y-1">
                <button
                    class="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary-100/70 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold"
                >
                    <i class="fa-solid fa-house text-base"></i>
                    <span class="text-sm">Home</span>
                </button>
                <button
                    class="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <i class="fa-solid fa-bookmark text-base"></i>
                    <span class="text-sm">Collections</span>
                </button>
                <button
                    class="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <i class="fa-solid fa-chart-column text-base"></i>
                    <span class="text-sm">Analytics</span>
                </button>
                <button
                    @click="$emit('open-settings')"
                    class="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <i class="fa-solid fa-gear text-base"></i>
                    <span class="text-sm">Settings</span>
                </button>
            </nav>
        </div>

        <button
            @click="$emit('add-shortcut')"
            class="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
        >
            <i class="fa-solid fa-plus text-sm"></i>
            <span>Add Shortcut</span>
        </button>
    </aside>
</template>

<script setup>
defineEmits(['open-settings', 'add-shortcut']);
</script>
