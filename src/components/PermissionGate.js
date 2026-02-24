import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useAuth } from "@/hooks/useAuth";
export default function PermissionGate({ permission, children, fallback = null }) {
    const { hasPermission } = useAuth();
    // "hasPermission" automatically handles the 'APP_OWNER' override 
    // defined in your useAuth hook.
    if (!hasPermission(permission)) {
        return _jsx(_Fragment, { children: fallback });
    }
    return _jsx(_Fragment, { children: children });
}
