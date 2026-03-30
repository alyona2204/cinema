function Spinner(props: { color?: string }) {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem", color: props.color }}
        role="status"
      >
        <span className="visually-hidden">Загрузка...</span>
      </div>
    </div>
  );
}

export default Spinner;
