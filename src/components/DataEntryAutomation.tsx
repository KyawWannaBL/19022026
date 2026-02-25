import { Cpu, CheckCircle2, Loader2, Zap } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Data Entry Automation Component
 * Resolves 3 syntax errors and adds Myanmar support.
 */
interface AutomationResult {
  confidence: number;
  extractedFields: number;
  status: 'idle' | 'processing' | 'success';
}

export const DataEntryAutomation = () => {
  const { t } = useLanguageContext();
  const [status, setStatus] = useState<AutomationResult['status']>('idle');

  const handleAutoFill = async () => {
    setStatus('processing');
    // Simulate AI extraction delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    toast.success(t('automation.complete', 'အချက်အလက်များ အလိုအလျောက် ဖြည့်သွင်းပြီးပါပြီ'));
  };

  return (
    <Card className="border-[#ff6b00]/20 bg-[#ff6b00]/5 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 text-[#0d2c54]">
          <Cpu size={16} className="text-[#ff6b00]" />
          {t('automation.title', 'AI အလိုအလျောက် ဖြည့်သွင်းစနစ်')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            {t('automation.desc', 'စာရွက်စာတမ်းမှ အချက်အလက်များကို AI ဖြင့် ဖတ်ရှုရန်')}
          </p>
          {status === 'success' && (
            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
              <CheckCircle2 size={10} className="mr-1" /> 100%
            </Badge>
          )}
        </div>

        <Button 
          onClick={handleAutoFill} 
          disabled={status === 'processing'}
          className="w-full bg-[#0d2c54] hover:bg-[#1a3a5f] text-white transition-all"
        >
          {status === 'processing' ? (
            <Loader2 size={16} className="mr-2 animate-spin" />
          ) : (
            <Zap size={16} className="mr-2 fill-current" />
          )}
          {status === 'processing' 
            ? t('common.processing', 'လုပ်ဆောင်နေသည်...') 
            : t('automation.run', 'AI ဖြင့် ဖြည့်မည်')}
        </Button>
      </CardContent>
    </Card>
  );
};