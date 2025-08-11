import styles from "./Pagination.module.css";

export const Pagination = ({ pages, limit, skip, setSkip }) => {
  return (
    <div className={styles["pagination"]}>
      <button
        className={styles["pagination__btn"]}
        onClick={() => setSkip((prev) => Math.max(prev - limit, 0))}
        disabled={skip === 0}
        aria-label="Предыдущая страница"
      >
        ←
      </button>
      <span className={styles["pagination__page"]}>{`Страница ${
        Math.ceil(skip / limit) + 1
      } из ${pages}`}</span>
      <button
        className={styles["pagination__btn"]}
        onClick={() =>
          setSkip((prev) => Math.min(prev + limit, (pages - 1) * limit))
        }
        disabled={skip >= (pages - 1) * limit}
        aria-label="Следующая страница"
      >
        →
      </button>
    </div>
  );
};
