import styles from './styles.module.css';

const NewsList = ({news}) => {
    return (
        <div className={styles.newsList}>
            <ul className={styles.list_news}>
                {news.map((item) => (
                    <li key={item.id} className={styles.list_item}>
                        <img src={item.image} alt={item.title} />
                        <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsList;