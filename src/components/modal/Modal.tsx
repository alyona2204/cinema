import type { ReactNode } from "react";
import Button from "../button/Button";
import styles from "./modal.module.css";

function Modal(props: {
  open: boolean;
  title: string;
  onClose: () => void;
  onOk?: () => void;
  okButtonText?: string;
  children: ReactNode;
  extraAction?: ReactNode;
  disabled?: boolean;
}) {
  if (!props.open) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        style={{ marginTop: "120px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <h3 className={styles.title}>{props.title}</h3>
        </header>

        <div className={styles.body}>{props.children}</div>

        <footer className={styles.footer}>
          <Button onClick={props.onOk} type="primary" disabled={props.disabled}>
            {props.okButtonText}
          </Button>
          {props.extraAction}
          <Button onClick={props.onClose} type="secondary">
            Отмена
          </Button>
        </footer>
      </div>
    </div>
  );
}

export default Modal;
