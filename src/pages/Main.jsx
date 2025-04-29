import styles from "./styles.module.css";
import { getNews } from "../api/apiNews";
import { useEffect, useState } from "react";
import NewsBanner from "../components/NewsBanner/NewsBanner";
import NewsList from "../components/NewsList/NewsList";
const Main = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await getNews();
                
                // Проверяем структуру ответа
                if (response && response.news) {
                    setNews(response.news);
                    setDataSource('API (кэшировано)');
                } else if (response && Array.isArray(response)) {
                    setNews(response);
                    setDataSource('API (кэшировано)');
                } else {
                    setError("Не удалось получить новости");
                }
            } catch (error) {
                console.error("Ошибка при загрузке новостей:", error);
                setError("Произошла ошибка при загрузке новостей");
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) return <div className={styles.loading}>Загрузка...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!news.length) return <div className={styles.noNews}>Новости не найдены</div>;

    return (
        <main className={styles.main}>
            {dataSource && <div className={styles.dataSource}>Источник данных: {dataSource}</div>}
            <NewsBanner item={news[0]} />
            <NewsList news={news.slice(1)} />
        </main>
    );
};

export default Main;