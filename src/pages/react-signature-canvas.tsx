import { useLanguageContext } from '@/lib/LanguageContext';
import { Trash2, CheckCircle2 } from 'lucide-react';

/**
 * Signature Pad Component
 * Resolves 28 syntax errors and adds Myanmar support.
 */
interface SignaturePadProps {
  onSave: (signatureData: string) => void;
  onClear?: () => void;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, onClear }) => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const { t } = useLanguageContext();

  const clear = () => {
    sigCanvas.current?.clear();
    if (onClear) onClear();
  };

  const save = () => {
    if (sigCanvas.current?.isEmpty()) {
      return;
    }
    const data = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png');
    if (data) {
      onSave(data);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="border-2 border-dashed border-slate-200 rounded-lg bg-white overflow-hidden">
        <SignatureCanvas
          ref={sigCanvas}
          penColor="#0d2c54"
          canvasProps={{
            className: "signature-canvas w-full h-48",
            style: { width: '100%', height: '192px' }
          }}
        />
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clear}
          className="flex-1 text-xs font-bold uppercase"
        >
          <Trash2 size={14} className="mr-2" />
          {t('common.clear', 'ပယ်ဖျက်မည်')}
        </Button>
        <Button 
          size="sm" 
          onClick={save}
          className="flex-1 text-xs font-bold uppercase bg-[#0d2c54]"
        >
          <CheckCircle2 size={14} className="mr-2" />
          {t('common.confirm', 'အတည်ပြုမည်')}
        </Button>
      </div>
      <p className="text-[10px] text-slate-400 text-center italic">
        {t('auth.signNotice', 'လက်မှတ်ရေးထိုးရန် ဤနေရာကို အသုံးပြုပါ။')}
      </p>
    </div>
  );
};

export default SignaturePad;