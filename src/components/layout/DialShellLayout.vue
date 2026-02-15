<template>
    <div
        class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-500 relative overflow-hidden"
    >
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div
                class="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse"
            ></div>
            <div
                class="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse"
                style="animation-delay: 1s"
            ></div>
        </div>

        <div class="relative z-10">
            <slot name="header" />

            <main
                :class="[
                    'relative z-10 container mx-auto px-6 pb-20 max-w-5xl transition-all duration-300',
                    isNavbarFixed ? 'pt-28 md:pt-32' : 'pt-8 md:pt-16',
                ]"
            >
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup>
defineProps({
    isNavbarFixed: {
        type: Boolean,
        default: false,
    },
});
</script>
