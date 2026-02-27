    const query = (supabase as any).from('shipments').select('*');

    if (filters?.status) {
      query.eq('status', filters.status);
    }

    const { data, error } = await query;
    return { data, error };
  };

  return {
    fetchShipments,
    isLoading: false, // Update with your actual loading state logic
    error: null,
    data: []
  };
};