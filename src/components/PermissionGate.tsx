
export default function PermissionGate({ 
  permission, 
  children, 
  fallback = null 
}: PermissionGateProps) {
  const { hasPermission } = useAuth();

  // "hasPermission" automatically handles the 'APP_OWNER' override 
  // defined in your useAuth hook.
  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}