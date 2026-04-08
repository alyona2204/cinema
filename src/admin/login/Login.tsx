import { useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/form/input/Input";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ login: "", password: "" });

  const onChange = (key: keyof typeof data, value: string) => {
    setData({ ...data, [key]: value });
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await api.auth.login(data);
      if (response.success) {
        navigate("/admin");
      } else {
        console.error("Login failed: ", response.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>АВТОРИЗАЦИЯ</div>
        <div className={styles.form}>
          <div style={{ width: "100%" }}>
            <Input
              label="E-mail"
              onChange={(value) => onChange("login", value)}
              placeholder="example@domain.xyz"
            />
            <Input
              label="Пароль"
              onChange={(value) => onChange("password", value)}
            />
          </div>
          <Button disabled={loading} onClick={onSubmit}>
            АВТОРИЗОВАТЬСЯ
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Login;
