
  const can = (permission: string) => {
    return permissions?.includes(permission)
  }

  return { can }
}
