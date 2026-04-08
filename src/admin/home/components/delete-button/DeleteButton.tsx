import Button from "../../../../components/button/Button";
import styles from "./delete-button.module.css";
import deleteIcon from "../../../../assets/remove-icon.png";

function DeleteButton(props: { onClick: () => void; disabled?: boolean }) {
  return (
    <Button
      type="secondary"
      className={styles.deleteButton}
      onClick={props.onClick}
    >
      <img className={styles.deleteIcon} src={deleteIcon} />
    </Button>
  );
}

export default DeleteButton;
