<<<<<<< HEAD
import React, { useState } from 'react';
import { Search, Package, MapPin, AlertCircle, ArrowRight, Truck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '@/assets/images';
<<<<<<< HEAD
import { mockShipments } from '@/data/index';
=======
import { useEnterpriseShipments, fetchShipmentByTracking, fetchShipmentTracking } from '@/hooks/useEnterpriseShipments';
>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))
import { Shipment } from '@/lib/index';
import { TrackingTimeline, TrackingCard, StatusBadge } from '@/components/TrackingComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Tracking() {
<<<<<<< HEAD
=======
  const { data: shipments = [], isLoading: shipmentsLoading } = useEnterpriseShipments();
>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searchResult, setSearchResult] = useState<Shipment | null>(null);
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

<<<<<<< HEAD
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setIsLoading(true);
    setIsSearched(false);

    // Simulate network delay for realism
    setTimeout(() => {
      const shipment = mockShipments.find(
        (s) => s.trackingNumber.toUpperCase() === trackingNumber.toUpperCase()
      );
      setSearchResult(shipment || null);
      setIsSearched(true);
      setIsLoading(false);
    }, 600);
  };
=======
  const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault();
  const tn = trackingNumber.trim();
  if (!tn) return;

  setIsLoading(true);
  setIsSearched(false);
  setSearchResult(null);

  try {
    const row = await fetchShipmentByTracking(tn.toUpperCase());
    if (!row) {
      setSearchResult(null);
    } else {
      const trackingRows = await fetchShipmentTracking(String(row.id));
      const { mapShipmentRowToShipment } = await import('@/lib/db/mappers');
      setSearchResult(mapShipmentRowToShipment(row, trackingRows));
    }
  } catch (err) {
    console.error(err);
    setSearchResult(null);
  } finally {
    setIsSearched(true);
    setIsLoading(false);
  }
};

>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))
=======
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function Tracking() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get("id") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber) setSearchParams({ id: trackingNumber });
  };
>>>>>>> bc2f204 (login errors solved)

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-6 transition">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-blue-600 p-8 text-white">
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <Package /> Track Your Shipment
            </h1>
            <p className="opacity-80 mt-2">Enter your tracking number below to see real-time status updates.</p>
          </div>
          <CardContent className="p-8">
            <form onSubmit={handleSearch} className="flex gap-3">
              <Input 
                placeholder="BRX-XXXX-XXXX" 
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="h-14 text-lg font-mono"
              />
              <Button type="submit" size="lg" className="h-14 px-8 bg-blue-600">Track</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}