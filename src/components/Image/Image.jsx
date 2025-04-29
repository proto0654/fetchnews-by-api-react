import styles from "./styles.module.css";

const Image = ({img}) => {
    return (
        <div className={styles.wrapper}>
           { img ? <img src={img} alt="Last news" className={styles.image} /> : <div className={styles.placeholder}></div>}
        </div>
    )
}

export default Image;
