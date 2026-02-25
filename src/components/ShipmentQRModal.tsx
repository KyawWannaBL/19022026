import { useState, useEffect } from 'react';
import { Shipment } from '@/lib/index';

export const useShipments = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShipments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/shipments'); 
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setShipments(data);
    } catch (err) {
      setError('Failed to load shipments / ဒေတာရယူရန် မအောင်မြင်ပါ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return { shipments, loading, error, refresh: fetchShipments };
