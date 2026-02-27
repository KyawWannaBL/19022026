    const fetchData = async () => {
      const { data: shipments } = await supabase.from('shipments').select('*');
      setData(shipments || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { data, loading };
};