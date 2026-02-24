import { useAuth } from "@/hooks/useAuth";
export const usePermission = () => {
    const { permissions } = useAuth();
    const can = (permission) => {
        return permissions?.includes(permission);
    };
    return { can };
};
