interface SignaturePadProps {
  onSave: (signature: string) => void;
  onCancel?: () => void;
}

export default function SignaturePad({ onSave, onCancel }: SignaturePadProps) {
  const { t } = useLanguageContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0d2c54';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      onSave(canvas.toDataURL('image/png'));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-black text-[#0d2c54] uppercase italic flex items-center gap-2">
          <Pencil size={14} /> {t('Customer Signature', 'ဖောက်သည် လက်မှတ်')}
        </label>
        <Button variant="ghost" size="sm" onClick={clear} className="text-slate-400 hover:text-red-500">
          <RotateCcw size={14} className="mr-1" /> {t('Clear', 'ဖျက်မည်')}
        </Button>
      </div>

      <div className="border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={600}
          height={200}
          className="w-full h-[200px] touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleSave} className="flex-1 bg-emerald-600 hover:bg-emerald-700 font-bold">
          <Check className="mr-2 h-4 w-4" /> {t('Save Signature', 'လက်မှတ်သိမ်းမည်')}
        </Button>
        {onCancel && (
          <Button variant="outline" onClick={onCancel} className="text-slate-500">
            <X className="mr-2 h-4 w-4" /> {t('Cancel', 'မလုပ်တော့ပါ')}
          </Button>
        )}
      </div>
    </div>
  );
}
