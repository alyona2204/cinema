import { Outlet } from "react-router-dom";
import AppTitle from "../../components/app-title/AppTitle";

function AdminLayout() {
  return (
    <div className="ui-admin">
      <div className="container-lg">
        <AppTitle subtitle="администраторская" />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
