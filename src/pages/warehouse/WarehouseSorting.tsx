import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { PackageSearch } from "lucide-react";

/**
 * Britium Express - Warehouse Sorting
 * Final sanitized version for production build.
 */
export default function WarehouseSorting() {
  const { t } = useTranslation();

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
       <div className="flex items-center gap-4 mb-8">
          <PackageSearch className="h-8 w-8 text-yellow-600" />
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            {t('Warehouse Sorting', 'ကုန်ပစ္စည်း ခွဲခြားခြင်း')}
          </h1>
       </div>

       <Card className="border-zinc-100 shadow-xl rounded-[2rem] overflow-hidden">
         <CardHeader className="bg-zinc-50/50 border-b border-zinc-100">
           <CardTitle className="text-sm uppercase tracking-widest text-zinc-500">
             {t('Sorting Queue', 'ခွဲခြားရန် တန်းစီဇယား')}
           </CardTitle>
         </CardHeader>
         <CardContent className="p-10 space-y-4">
            <div className="text-center py-8">
               <p className="text-zinc-400 font-light italic">
                 {t('Scan items to begin sorting process...', 'ခွဲခြားရန် ပစ္စည်းများကို စကင်ဖတ်ပါ...')}
               </p>
            </div>
            <Button className="w-full h-14 bg-yellow-600 hover:bg-yellow-700 text-white font-bold uppercase rounded-xl transition-all shadow-lg shadow-yellow-600/20">
              {t('Confirm Sorting', 'ခွဲခြားမှုကို အတည်ပြုမည်')}
            </Button>
         </CardContent>
       </Card>
    </div>
  );
}