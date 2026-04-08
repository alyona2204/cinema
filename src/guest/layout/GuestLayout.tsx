import { Outlet, useNavigate } from "react-router-dom";
import AppTitle from "../../components/app-title/AppTitle";
import Button from "../../components/button/Button";

function GuestLayout() {
  const navigate = useNavigate();

  return (
    <div className="ui-guest">
      <div className="container-lg">
        <div className="d-flex justify-content-between align-items-center">
          <AppTitle onTitlelick={() => navigate("/")} />
          <Button
            style={{ padding: 12 }}
            onClick={() => navigate("/admin/login")}
          >
            ВОЙТИ
          </Button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default GuestLayout;
