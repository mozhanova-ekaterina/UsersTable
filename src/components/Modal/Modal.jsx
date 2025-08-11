import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className={styles["modal-overlay"]} onClick={onClose}>
      <div
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()} 
      >
        <button className={styles["modal-close"]} onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
