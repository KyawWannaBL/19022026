import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import PermissionGate from "@/components/PermissionGate";
export default function AdminUsers() {
    const { user, role, branch_id } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const canManage = role === "APP_OWNER" || role === "SUPER_ADMIN";
    const loadProfiles = async () => {
        setLoading(true);
        try {
            let query = supabase.from("profiles").select("id,email,role,is_active,is_demo,branch_id").order("created_at", { ascending: false });
            // Branch isolation (SUPER_ADMIN limited to own branch)
            if (role !== "APP_OWNER" && branch_id) {
                query = query.eq("branch_id", branch_id);
            }
            const { data, error } = await query;
            if (error)
                throw error;
            setProfiles(data ?? []);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (canManage)
            loadProfiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canManage, role, branch_id]);
    const toggleActive = async (id, current) => {
        await supabase.from("profiles").update({ is_active: !current }).eq("id", id);
        // Best-effort audit log (ignore errors)
        try {
            await supabase.from("audit_logs").insert({
                user_id: user?.id,
                action: "USER_STATUS_CHANGE",
                table_name: "profiles",
                record_id: id,
                new_data: { is_active: !current },
            });
        }
        catch {
            // no-op
        }
        loadProfiles();
    };
    if (!canManage) {
        return _jsx("div", { className: "p-10 text-red-400 font-bold", children: "Enterprise Access Only" });
    }
    if (loading)
        return _jsx("div", { className: "p-10 text-white", children: "Loading..." });
    return (_jsxs("div", { className: "p-10 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl font-bold text-white", children: "Enterprise User Control" }), _jsx(Button, { variant: "outline", onClick: loadProfiles, children: "Refresh" })] }), _jsx("div", { className: "luxury-card p-6 overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm text-white/80", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-white/10 text-left", children: [_jsx("th", { className: "py-2", children: "Email" }), _jsx("th", { className: "py-2", children: "Role" }), _jsx("th", { className: "py-2", children: "Status" }), _jsx("th", { className: "py-2", children: "Environment" }), _jsx("th", { className: "py-2" })] }) }), _jsx("tbody", { children: profiles.map((p) => (_jsxs("tr", { className: "border-b border-white/5", children: [_jsx("td", { className: "py-2", children: p.email }), _jsx("td", { className: "py-2", children: p.role }), _jsx("td", { className: "py-2", children: p.is_active ? "Active" : "Inactive" }), _jsx("td", { className: "py-2", children: p.is_demo ? "Demo" : "Production" }), _jsx("td", { className: "py-2 text-right", children: _jsx(PermissionGate, { permission: "users.manage", children: _jsx(Button, { size: "sm", variant: "secondary", onClick: () => toggleActive(p.id, Boolean(p.is_active)), children: "Toggle" }) }) })] }, p.id))) })] }) })] }));
}
