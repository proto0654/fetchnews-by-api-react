const BaseApiUrl = import.meta.env.VITE_NEWS_BASE_API_URL;
const ApiKey = import.meta.env.VITE_NEWS_API_KEY;
import axios from "axios";

// Ключ для хранения данных в localStorage
const NEWS_STORAGE_KEY = 'news_data';
const NEWS_CATEGORY_STORAGE_KEY = 'news_category_data';

// Функция для получения данных из localStorage
const getFromLocalStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Ошибка при чтении из localStorage:', error);
        return null;
    }
};

// Функция для сохранения данных в localStorage
const saveToLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Ошибка при сохранении в localStorage:', error);
        return false;
    }
};

export const getNews = async () => {
    try {
        // Проверяем, есть ли данные в localStorage
        const cachedData = getFromLocalStorage(NEWS_STORAGE_KEY);
        if (cachedData) {
            console.log('Данные получены из localStorage');
            return cachedData;
        }

        // Если данных нет, делаем запрос к API
        console.log('Запрос к API для получения новостей');
        const response = await axios.get(`${BaseApiUrl}`, {
            params: {
                apiKey: ApiKey,
                
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        // Сохраняем данные в localStorage
        saveToLocalStorage(NEWS_STORAGE_KEY, response.data);
        
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении новостей:', error.message);
        throw error;
    }
}

export const getNewsByCategory = async (category) => {
    try {
        // Создаем ключ для категории
        const categoryKey = `${NEWS_CATEGORY_STORAGE_KEY}_${category}`;
        
        // Проверяем, есть ли данные для этой категории в localStorage
        const cachedData = getFromLocalStorage(categoryKey);
        if (cachedData) {
            console.log(`Данные для категории ${category} получены из localStorage`);
            return cachedData;
        }

        // Если данных нет, делаем запрос к API
        console.log(`Запрос к API для получения новостей категории ${category}`);
        const response = await axios.get(`${BaseApiUrl}`, {
            params: {
                apiKey: ApiKey,
                category: category,
                language: 'ru',
                country: 'ru'
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        // Сохраняем данные в localStorage
        saveToLocalStorage(categoryKey, response.data);
        
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении новостей по категории:', error.message);
        throw error;
    }
}
