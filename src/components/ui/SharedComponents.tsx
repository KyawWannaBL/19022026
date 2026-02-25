import React from 'react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { cn } from '@/lib/utils';
import { Loader2, AlertCircle } from 'lucide-react';

/**
 * Page Loader Component
 * Used during Suspense and data fetching
 */
export const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
    <Loader2 className="h-10 w-10 animate-spin text-[#0d2c54]" />
    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 animate-pulse">
      Britium Express Loading...
    </p>
  </div>
);

/**
 * Error State Component
 * Bi-lingual support for Myanmar/English
 */
export const ErrorState = ({ message }: { message?: string }) => {
  const { t } = useLanguageContext();
  return (
    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-red-100 rounded-2xl bg-red-50/30 text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-bold text-red-900">
        {t('common.errorOccurred', 'မှားယွင်းမှုတစ်ခုရှိနေပါသည်')}
      </h3>
      <p className="text-sm text-red-600 mt-2 max-w-xs">
        {message || t('common.tryAgain', 'ကျေးဇူးပြု၍ ထပ်မံကြိုးစားကြည့်ပါ။')}
      </p>
    </div>
  );
};

/**
 * Section Heading
 * Consistent styling for dashboard titles
 */
export const SectionHeading = ({ 
  title, 
  subtitle, 
  className 
}: { 
  title: string; 
  subtitle?: string; 
  className?: string;
}) => (
  <div className={cn("mb-8", className)}>
    <h2 className="text-2xl font-black text-[#0d2c54] uppercase tracking-tight italic">
      {title}
    </h2>
    {subtitle && (
      <p className="text-sm text-slate-500 font-medium mt-1">
        {subtitle}
      </p>
    )}
  </div>
);