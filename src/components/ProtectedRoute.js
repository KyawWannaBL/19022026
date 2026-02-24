import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { getMyProfile } from "@/lib/profile";
export default function ProtectedRoute({ children, requireAuth = true, requirePasswordOk = true, }) {
    const [loading, setLoading] = useState(true);
    const [sessionUserId, setSessionUserId] = useState(null);
    const [mustChangePassword, setMustChangePassword] = useState(false);
    useEffect(() => {
        (async () => {
            const { data } = await supabase.auth.getSession();
            const uid = data.session?.user?.id ?? null;
            setSessionUserId(uid);
            if (uid) {
                const { profile } = await getMyProfile();
                setMustChangePassword(Boolean(profile?.must_change_password));
            }
            setLoading(false);
        })();
    }, []);
    if (loading)
        return null;
    if (requireAuth && !sessionUserId)
        return _jsx(Navigate, { to: "/login", replace: true });
    if (requireAuth && requirePasswordOk && mustChangePassword) {
        return _jsx(Navigate, { to: "/force-password-reset", replace: true });
    }
    return children;
}
