import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="d-flex">
      <div className="bg-dark text-white p-3" style={{ width: 250 }}>
        <h4>Admin Panel</h4>
        <hr />
        <Link to="/admin" className="d-block text-white mb-2">Dashboard</Link>
        <Link to="/admin/users" className="d-block text-white mb-2">Users</Link>
        <Link to="/admin/settings" className="d-block text-white">Settings</Link>
      </div>

      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;