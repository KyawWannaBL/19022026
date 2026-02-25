import { useLanguageContext } from '@/lib/LanguageContext';
import { getBilingualStatus, getStatusVariant } from '@/lib/index';

interface StatusBadgeProps {
  status: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusBadge({ status, className, size = 'md' }: StatusBadgeProps) {
  const { t } = useLanguageContext();
  
  // 1. Get the localized label (e.g., "စောင့်ဆိုင်းဆဲ")
  const label = getBilingualStatus(status, t);
  
  // 2. Get the semantic variant (success, destructive, warning, info)
  const variant = getStatusVariant(status);

  // 3. Size mapping for better UI consistency
  const sizeClasses = {
    sm: "text-[9px] px-1.5 py-0",
    md: "text-[10px] px-2 py-0.5",
    lg: "text-xs px-3 py-1"
  };

  return (
    <Badge 
      variant={variant as any} 
      className={`font-black uppercase tracking-widest shadow-sm border-2 ${sizeClasses[size]} ${className}`}
    >
      {label}
    </Badge>
  );
}