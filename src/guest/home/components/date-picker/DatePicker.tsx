import styles from "./date-picker.module.css";
import moment from "moment";

function DatePicker(props: {
  onChange: (value: string) => void;
  value: string;
}) {
  const getDayName = (date: Date) => {
    const dayName = date.toLocaleDateString("ru-RU", { weekday: "short" });
    return dayName.charAt(0).toUpperCase() + dayName.slice(1); // first letter to uppercase
  };

  return (
    <div className={styles.container}>
      {Array.from({ length: 7 }).map((_, i) => {
        const today = moment();
        const day = today.add(i, "days");
        const formatedDay = day.format("YYYY-MM-DD");

        const isActive = formatedDay === props.value;
        const isToday = i === 0;

        return (
          <div
            key={i}
            className={`${styles.day} ${isActive ? styles["active-day"] : ""}`}
            onClick={() => props.onChange(formatedDay)}
          >
            <div>
              {isToday ? "Сегодня " : null}
              {getDayName(day.toDate())},
            </div>
            <div>{day.date()}</div>
          </div>
        );
      })}
    </div>
  );
}

export default DatePicker;
