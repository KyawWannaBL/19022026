// Convert Firebase User + UserData to Legacy User format
export const createLegacyUser = (firebaseUser, userData) => {
    if (!firebaseUser || !userData)
        return null;
    return {
        id: firebaseUser.uid,
        name: userData.displayName || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
        email: firebaseUser.email || '',
        role: userData.role || 'CUSTOMER',
        permissions: userData.permissions || [],
        isActive: userData.isActive || true,
        createdAt: userData.createdAt || new Date(),
        lastLogin: userData.lastLoginAt || new Date(),
        batchId: userData.batchId || undefined
    };
};
// Hook for backward compatibility
export const useLegacyUser = () => {
    // This would be imported from the actual auth hook
    // For now, return null to prevent errors
    return null;
};
// Convert Supabase User + profile/userData to a legacy shape used by older components.
export const createLegacyUser = (user, userData) => {
    if (!user)
        return null;
    const email = user.email || userData?.email || '';
    const name = userData?.full_name ||
        userData?.displayName ||
        user.user_metadata?.full_name ||
        (email ? email.split('@')[0] : 'User');
    return {
        id: user.id,
        name,
        email,
        role: (userData?.role || 'CUSTOMER'),
        permissions: userData?.permissions || [],
        isActive: userData?.is_active ?? true,
        createdAt: userData?.createdAt ? new Date(userData.createdAt) : new Date(),
        lastLogin: new Date(),
        batchId: userData?.batch_id || undefined,
    };
};
export const useLegacyUser = () => null;
