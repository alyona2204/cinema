import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./admin/login/Login";
import Home from "./admin/home/Home";
import GuestHome from "./guest/home/Home";
import AdminLayout from "./admin/layout/AdminLayout";
import GuestLayout from "./guest/layout/GuestLayout";
import Booking from "./guest/booking/Booking";
import Payment from "./guest/payment/Payment";
import Ticket from "./guest/ticket/Ticket";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GuestLayout />}>
            <Route path="" element={<GuestHome />} />
            <Route path="booking/:seanceId" element={<Booking />} />
            <Route path="booking/:seanceId/payment" element={<Payment />} />
            <Route path="booking/:seanceId/ticket" element={<Ticket />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
