  const { userData } = useAuth();

  if (!userData?.permissions?.[permission]) {
    return null;
  }

  return <>{children}</>;
}
