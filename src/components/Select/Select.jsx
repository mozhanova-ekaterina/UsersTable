import styles from "./Select.module.css";

export const Select = ({ limit, setLimit }) => {
  return (
    <div>
      <select className={styles["select"]} onChange={(e) => setLimit(+e.target.value)} value={limit}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
  );
};
