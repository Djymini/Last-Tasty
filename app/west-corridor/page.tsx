import styles from "./page.module.css";
export default function WestCorridorPage() {
    return (
        <div className={styles.page}>
            <div className={styles.background}>
                <section className={styles.doors}>
                    <div className={styles.door1}></div>
                    <div className={styles.door2}></div>
                    <div className={styles.door3}></div>
                    <div className={styles.door4}></div>
                    <div className={styles.door5}></div>
                </section>
            </div>
        </div>
    );
}