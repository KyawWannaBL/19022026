import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, Outlet } from "react-router-dom";
const AdminLayout = () => {
    return (_jsxs("div", { className: "d-flex", children: [_jsxs("div", { className: "bg-dark text-white p-3", style: { width: 250 }, children: [_jsx("h4", { children: "Admin Panel" }), _jsx("hr", {}), _jsx(Link, { to: "/admin", className: "d-block text-white mb-2", children: "Dashboard" }), _jsx(Link, { to: "/admin/users", className: "d-block text-white mb-2", children: "Users" }), _jsx(Link, { to: "/admin/settings", className: "d-block text-white", children: "Settings" })] }), _jsx("div", { className: "flex-grow-1 p-4", children: _jsx(Outlet, {}) })] }));
};
export default AdminLayout;
