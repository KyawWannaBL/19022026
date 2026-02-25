import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLanguageContext } from "@/lib/LanguageContext";
import { Users, UserPlus, UserCog, Search, CheckCircle, XCircle, MoreVertical } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminUsersAPI } from "@/lib/admin-api";
export default function AdminManagement() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { t } = useLanguageContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddUser, setShowAddUser] = useState(false);
    const [selectedRole, setSelectedRole] = useState("all");
    const [stats, setStats] = useState({});
    // New user form state
    const [newUser, setNewUser] = useState({
        full_name: "",
        email: "",
        role: "warehouse_staff",
        hub_assignment: "Yangon Main Hub",
        phone: ""
    });
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {
        try {
            setLoading(true);
            const [usersData, statsData] = await Promise.all([
                AdminUsersAPI.list(),
                AdminUsersAPI.getStats()
            ]);
            setUsers(usersData);
            setStats(statsData);
        }
        catch (error) {
            console.error('Error loading admin data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleCreateUser = async () => {
        try {
            await AdminUsersAPI.create({
                ...newUser,
                role: newUser.role
            });
            setShowAddUser(false);
            setNewUser({
                full_name: "",
                email: "",
                role: "warehouse_staff",
                hub_assignment: "Yangon Main Hub",
                phone: ""
            });
            loadData();
            alert(t('admin.createAccount') + ' - ' + t('admin.tempPasswordNote'));
        }
        catch (error) {
            console.error('Error creating user:', error);
            alert('Error creating user');
        }
    };
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === "all" || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });
    if (loading) {
        return (_jsx("div", { className: "p-6", children: _jsx("div", { className: "text-center py-8", children: _jsx("div", { className: "text-lg", children: t('common.loading') }) }) }));
    }
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold text-gray-900", children: [t("admin.userManagement"), " / \u1021\u101E\u102F\u1036\u1038\u1015\u103C\u102F\u101E\u1030 \u1005\u102E\u1019\u1036\u1001\u1014\u1037\u103A\u1001\u103D\u1032\u1019\u103E\u102F"] }), _jsxs("p", { className: "text-gray-600 mt-1", children: [t("admin.manageTierHierarchy"), " / \u1021\u1006\u1004\u1037\u103A \u1041\u1040 \u1006\u1004\u1037\u103A\u101B\u103E\u102D \u1021\u101E\u102F\u1036\u1038\u1015\u103C\u102F\u101E\u1030\u1005\u1014\u1005\u103A\u1021\u102C\u1038 \u1005\u102E\u1019\u1036\u101B\u1014\u103A"] })] }), _jsxs(Button, { onClick: () => setShowAddUser(true), className: "bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2", children: [_jsx(UserPlus, { className: "w-4 h-4" }), t("admin.addStaff"), " / \u101D\u1014\u103A\u1011\u1019\u103A\u1038\u1021\u101E\u1005\u103A\u1011\u100A\u1037\u103A\u101B\u1014\u103A"] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx(StatCard, { icon: Users, label: t('admin.totalUsers') || 'Total Users', value: stats.total || 0, color: "blue" }), _jsx(StatCard, { icon: CheckCircle, label: t('admin.active'), value: stats.active || 0, color: "green" }), _jsx(StatCard, { icon: XCircle, label: t('admin.suspended'), value: stats.suspended || 0, color: "red" }), _jsx(StatCard, { icon: UserCog, label: t('admin.pending') || 'Pending', value: stats.pending || 0, color: "orange" })] }), _jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [_jsx("div", { className: "flex-1", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsx(Input, { placeholder: `${t('common.search')} users...`, value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10" })] }) }), _jsx("div", { className: "flex gap-2", children: _jsxs("select", { value: selectedRole, onChange: (e) => setSelectedRole(e.target.value), className: "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "all", children: t("admin.allRoles") }), _jsx("option", { value: "super_admin", children: t("admin.superAdmin") }), _jsx("option", { value: "admin", children: t("admin.manager") }), _jsx("option", { value: "manager", children: t("admin.manager") }), _jsx("option", { value: "supervisor", children: t("admin.supervisor") }), _jsx("option", { value: "warehouse_staff", children: t("admin.warehouseStaff") }), _jsx("option", { value: "rider", children: t("admin.rider") }), _jsx("option", { value: "accountant", children: t("admin.accountant") }), _jsx("option", { value: "marketer", children: t("admin.marketer") }), _jsx("option", { value: "customer_service", children: t("admin.customerService") }), _jsx("option", { value: "merchant", children: t("admin.merchant") })] }) })] }) }) }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { children: [t("admin.staffAccounts"), " / \u101D\u1014\u103A\u1011\u1019\u103A\u1038\u1005\u102C\u101B\u1004\u103A\u1038"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left py-3 px-4", children: t("admin.userDetails") }), _jsx("th", { className: "text-left py-3 px-4", children: t("admin.roleRBAC") }), _jsx("th", { className: "text-left py-3 px-4", children: t("admin.assignedHub") }), _jsx("th", { className: "text-left py-3 px-4", children: t("admin.status") }), _jsx("th", { className: "text-left py-3 px-4", children: t("admin.action") })] }) }), _jsx("tbody", { children: filteredUsers.map((user) => (_jsxs("tr", { className: "border-b hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-blue-600 font-semibold text-sm", children: user.full_name.charAt(0) }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: user.full_name }), _jsx("div", { className: "text-sm text-gray-500", children: user.email })] })] }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: "px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium", children: user.role }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: "text-sm", children: user.hub_assignment }) }), _jsx("td", { className: "py-3 px-4", children: user.status === 'active' ? (_jsxs("span", { className: "flex items-center gap-1 text-green-600", children: [_jsx(CheckCircle, { className: "w-4 h-4" }), t('admin.active')] })) : (_jsxs("span", { className: "flex items-center gap-1 text-red-600", children: [_jsx(XCircle, { className: "w-4 h-4" }), t('admin.suspended')] })) }), _jsx("td", { className: "py-3 px-4", children: _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(MoreVertical, { className: "w-4 h-4" }) }) })] }, user.id))) })] }) }) })] }), showAddUser && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg p-6 w-full max-w-md mx-4", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: t("admin.createNewUser") }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: t("admin.fullName") }), _jsx(Input, { value: newUser.full_name, onChange: (e) => setNewUser({ ...newUser, full_name: e.target.value }), placeholder: "Enter full name" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: t("admin.emailLogin") }), _jsx(Input, { type: "email", value: newUser.email, onChange: (e) => setNewUser({ ...newUser, email: e.target.value }), placeholder: "Enter email address" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: t("admin.role") }), _jsxs("select", { value: newUser.role, onChange: (e) => setNewUser({ ...newUser, role: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "manager", children: t("admin.manager") }), _jsx("option", { value: "supervisor", children: t("admin.supervisor") }), _jsx("option", { value: "warehouse_staff", children: t("admin.warehouseStaff") }), _jsx("option", { value: "rider", children: t("admin.riderDriver") }), _jsx("option", { value: "accountant", children: t("admin.accountant") }), _jsx("option", { value: "marketer", children: t("admin.marketer") }), _jsx("option", { value: "customer_service", children: t("admin.customerService") })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: t("admin.hubAssignment") }), _jsxs("select", { value: newUser.hub_assignment, onChange: (e) => setNewUser({ ...newUser, hub_assignment: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "Yangon Main Hub", children: t("admin.yangonMainHub") }), _jsx("option", { value: "Downtown Station", children: t("admin.downtownStation") })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: t("bulk.phone") }), _jsx(Input, { value: newUser.phone, onChange: (e) => setNewUser({ ...newUser, phone: e.target.value }), placeholder: "+95912345678" })] })] }), _jsx("div", { className: "text-sm text-gray-600 mt-4 p-3 bg-yellow-50 rounded", children: t("admin.tempPasswordNote") }), _jsxs("div", { className: "flex gap-3 mt-6", children: [_jsx(Button, { variant: "outline", onClick: () => setShowAddUser(false), className: "flex-1", children: t("admin.cancel") }), _jsx(Button, { onClick: handleCreateUser, className: "flex-1 bg-blue-600 hover:bg-blue-700 text-white", disabled: !newUser.full_name || !newUser.email, children: t("admin.createAccount") })] })] }) }))] }));
}
function StatCard({ icon: Icon, label, value, color }) {
    const colors = {
        blue: "text-blue-600 bg-blue-50",
        green: "text-green-600 bg-green-50",
        red: "text-red-600 bg-red-50",
        orange: "text-orange-600 bg-orange-50"
    };
    return (_jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `p-2 rounded-lg ${colors[color]}`, children: _jsx(Icon, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: label }), _jsx("p", { className: "text-2xl font-bold", children: value })] })] }) }) }));
}
