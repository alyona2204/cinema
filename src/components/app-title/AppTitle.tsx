import styles from "./app-title.module.css";

function AppTitle(props: { subtitle?: string }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <strong className={styles.strong}>ИДЕМ</strong>
        <span className={styles.thin}>В</span>
        <strong className={styles.strong}>КИНО</strong>
      </h1>
      {props.subtitle ? (
        <span className={styles.subtitle}>{props.subtitle}</span>
      ) : null}
    </div>
  );
}

export default AppTitle;
