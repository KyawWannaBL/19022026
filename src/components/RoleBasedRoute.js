import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
export default function RoleBasedRoute({ allowedRoles = [], children }) {
    const { user, role, loading, mustChangePassword } = useAuth();
    const location = useLocation();
    if (loading)
        return null;
    if (!user) {
        return _jsx(Navigate, { to: "/login", state: { from: location.pathname }, replace: true });
    }
    if (mustChangePassword && location.pathname !== "/force-password-reset") {
        return _jsx(Navigate, { to: "/force-password-reset", replace: true });
    }
    if (role === "APP_OWNER")
        return _jsx(_Fragment, { children: children });
    if (allowedRoles.length === 0)
        return _jsx(_Fragment, { children: children });
    if (!role || !allowedRoles.includes(String(role))) {
        return _jsx(Navigate, { to: "/unauthorized", replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
