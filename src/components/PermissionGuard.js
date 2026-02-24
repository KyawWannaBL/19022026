import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useAuth } from '@/hooks/useAuth';
export default function PermissionGuard({ permission, children }) {
    const { userData } = useAuth();
    if (!userData?.permissions?.[permission]) {
        return null;
    }
    return _jsx(_Fragment, { children: children });
}
