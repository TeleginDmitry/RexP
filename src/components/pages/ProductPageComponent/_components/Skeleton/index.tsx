import styles from './Skeleton.module.scss'

export const ProductSkeleton = () => (
    <div className={styles.wrapper}>
        <div className={styles.child} />
        <div className={styles.child} />
        <div className={styles.child} />
        <div className={styles.child} />

        <div className={styles.container}>
            <div className={styles.child} />

            <div className={styles.child} />
        </div>
    </div>
)
