import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

type City = 'Yangon' | 'Mandalay' | 'Naypyidaw';

export default function DataEntryForm() {
const [customerName, setCustomerName] = useState('');
const [address, setAddress] = useState('');
const [city, setCity] = useState<City>('Yangon');
const [busy, setBusy] = useState(false);

const detectedCity = useMemo<City>(() => {
const lower = address.toLowerCase();
if (lower.includes('mandalay') || lower.includes('mdy')) return 'Mandalay';
if (lower.includes('naypyidaw') || lower.includes('npw') || lower.includes('nay pyi taw')) return 'Naypyidaw';
if (lower.includes('yangon') || lower.includes('ygn')) return 'Yangon';
return city;
}, [address, city]);

const submit = async (e: React.FormEvent) => {
e.preventDefault();
if (busy) return;
setBusy(true);

};

return (
<Card className="border-white/10 bg-white/5 backdrop-blur text-white">
<CardHeader>
<CardTitle>New Delivery Entry</CardTitle>
</CardHeader>

);
}