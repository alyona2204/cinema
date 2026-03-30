import type { ReactNode } from "react";
import styles from "./payment-layout.module.css";

export type SeanceInfo = {
  filmName: string;
  places: number[];
  hallName: string;
  seanceTime: string;
  cost?: number;
};

function PaymentLayout(props: {
  title: string;
  info: SeanceInfo;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={styles.container}>
      <header className={styles.header}>{props.title}</header>
      <div className={styles.body}>
        <div className={styles.info}>
          <InfoItem label="На фильм:">{props.info.filmName}</InfoItem>
          <InfoItem label="Места:">{props.info.places.join(", ")}</InfoItem>
          <InfoItem label="В зале:">{props.info.hallName}</InfoItem>
          <InfoItem label="Начало сеанса:">{props.info.seanceTime}</InfoItem>
          {props.info.cost && (
            <InfoItem label="Стоимость:">{props.info.cost}</InfoItem>
          )}
        </div>
        <div className={styles.content}>{props.children}</div>
        <footer className={styles.footer}>{props.footer}</footer>
      </div>
    </section>
  );
}

function InfoItem(props: { label: string; children: ReactNode }) {
  return (
    <div className={styles["info-item"]}>
      <span>{props.label}</span>
      <span>
        <b>{props.children}</b>
      </span>
    </div>
  );
}

export default PaymentLayout;
