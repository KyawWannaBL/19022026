import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useLanguageContext } from '@/lib/LanguageContext';
import { getBilingualStatus } from '@/lib/index';

export default function StatusBadge({ status }: { status: string }) {
  const { t } = useLanguageContext();
  
  // Use the new bilingual mapper from our library
  const label = getBilingualStatus(status, t);

  return (
    <Badge variant="outline" className="font-bold uppercase tracking-tighter bg-slate-50 text-[#0d2c54]">
      {label}
    </Badge>
  );
}