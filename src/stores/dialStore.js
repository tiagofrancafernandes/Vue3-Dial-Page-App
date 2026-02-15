import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

const defaultEngines = [
    {
        id: 'google',
        label: 'Google',
        url: 'https://www.google.com/search?q=%s',
        icon: 'https://www.google.com/favicon.ico',
        method: 'GET',
        isDefault: false,
    },
    {
        id: 'bing',
        label: 'Bing',
        url: 'https://www.bing.com/search?q=%s',
        icon: 'https://www.bing.com/favicon.ico',
        method: 'GET',
        isDefault: false,
    },
    {
        id: 'chatgpt',
        label: 'ChatGPT',
        url: 'https://chat.openai.com/?q=%s',
        icon: 'https://chat.openai.com/favicon.ico',
        method: 'GET',
        isDefault: false,
    },
    {
        id: 'chatgpt-temp',
        label: 'ChatGPT Temp',
        // url: 'https://chat.openai.com/?temporary-chat=true&q=%s',
        url: 'https://chat.openai.com/?temporary-chat=true&prompt=%s',
        icon: 'https://chat.openai.com/favicon.ico',
        method: 'GET',
        isDefault: false,
    },
];

const defaultFavorites = [
    {
        id: '1',
        label: 'Google',
        url: 'https://google.com',
        icon: 'https://www.google.com/favicon.ico',
    },
    {
        id: '2',
        label: 'GitHub',
        url: 'https://github.com',
        icon: 'https://github.com/favicon.ico',
    },
    {
        id: '3',
        label: 'Gmail',
        url: 'https://mail.google.com',
        icon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico',
    },
    {
        id: '4',
        label: 'YouTube',
        url: 'https://youtube.com',
        icon: 'https://www.youtube.com/favicon.ico',
    },
];

export const useDialStore = defineStore('dial', () => {
    const searchEngines = ref(JSON.parse(localStorage.getItem('dialpage-engines') || JSON.stringify(defaultEngines)));
    const favorites = ref(JSON.parse(localStorage.getItem('dialpage-favorites') || JSON.stringify(defaultFavorites)));
    const selectedEngineId = ref(localStorage.getItem('dialpage-selected-engine') || 'google');
    const isDark = ref(JSON.parse(localStorage.getItem('dialpage-darkmode') || 'false'));
    const isNavbarFixed = ref(JSON.parse(localStorage.getItem('dialpage-navbar-fixed') || 'false'));

    const searchQuery = ref('');
    const isEditMode = ref(false);
    const showSettings = ref(false);

    const selectedEngine = computed(() => {
        const selectedId = String(selectedEngineId.value || '');
        return searchEngines.value.find((e) => String(e.id) === selectedId) || searchEngines.value[0];
    });

    watch(
        searchEngines,
        (newValue) => {
            localStorage.setItem('dialpage-engines', JSON.stringify(newValue));
        },
        { deep: true }
    );

    watch(
        favorites,
        (newValue) => {
            localStorage.setItem('dialpage-favorites', JSON.stringify(newValue));
        },
        { deep: true }
    );

    watch(selectedEngineId, (newValue) => {
        localStorage.setItem('dialpage-selected-engine', newValue);
    });

    watch(isDark, (newValue) => {
        localStorage.setItem('dialpage-darkmode', JSON.stringify(newValue));
        updateDocumentClass();
    });

    watch(isNavbarFixed, (newValue) => {
        localStorage.setItem('dialpage-navbar-fixed', JSON.stringify(newValue));
    });

    const setSearchEngine = (engineId) => {
        selectedEngineId.value = String(engineId);
    };

    const addSearchEngine = (engine) => {
        const newEngine = {
            ...engine,
            id: Date.now().toString(),
            isDefault: false,
        };
        searchEngines.value.push(newEngine);
        return newEngine;
    };

    const updateSearchEngine = (id, data) => {
        const index = searchEngines.value.findIndex((e) => e.id === id);
        if (index !== -1) {
            searchEngines.value[index] = { ...searchEngines.value[index], ...data };
        }
    };

    const deleteSearchEngine = (id) => {
        searchEngines.value = searchEngines.value.filter((e) => String(e.id) !== String(id));
        if (String(selectedEngineId.value) === String(id)) {
            selectedEngineId.value = String(searchEngines.value[0]?.id || '');
        }
    };

    const addFavorite = (favorite) => {
        const newFavorite = {
            ...favorite,
            id: Date.now().toString(),
        };
        favorites.value.push(newFavorite);
        return newFavorite;
    };

    const updateFavorite = (id, data) => {
        const index = favorites.value.findIndex((f) => f.id === id);
        if (index !== -1) {
            favorites.value[index] = { ...favorites.value[index], ...data };
        }
    };

    const deleteFavorite = (id) => {
        favorites.value = favorites.value.filter((f) => f.id !== id);
    };

    const reorderFavorites = (fromIndex, toIndex) => {
        const items = [...favorites.value];
        const [removed] = items.splice(fromIndex, 1);
        items.splice(toIndex, 0, removed);
        favorites.value = items;
    };

    const toggleTheme = () => {
        isDark.value = !isDark.value;
    };

    const updateDocumentClass = () => {
        if (isDark.value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const resetToDefaults = () => {
        searchEngines.value = [...defaultEngines];
        favorites.value = [...defaultFavorites];
        selectedEngineId.value = 'google';
        isNavbarFixed.value = false;
    };

    const exportData = () => {
        return {
            engines: searchEngines.value,
            favorites: favorites.value,
            settings: {
                selectedEngine: selectedEngineId.value,
                isDark: isDark.value,
                isNavbarFixed: isNavbarFixed.value,
            },
        };
    };

    const importData = (data) => {
        if (data.engines) searchEngines.value = data.engines;
        if (data.favorites) favorites.value = data.favorites;
        if (data.settings) {
            selectedEngineId.value = String(data.settings.selectedEngine || '');
            isDark.value = data.settings.isDark;
            isNavbarFixed.value = Boolean(data.settings.isNavbarFixed);
            updateDocumentClass();
        }
    };

    updateDocumentClass();

    return {
        searchEngines,
        favorites,
        selectedEngineId,
        isDark,
        isNavbarFixed,
        searchQuery,
        isEditMode,
        showSettings,
        selectedEngine,
        setSearchEngine,
        addSearchEngine,
        updateSearchEngine,
        deleteSearchEngine,
        addFavorite,
        updateFavorite,
        deleteFavorite,
        reorderFavorites,
        toggleTheme,
        resetToDefaults,
        exportData,
        importData,
    };
});
