export default function QRScanner() {
  const { t } = useLanguageContext();
  const [cameraActive, setCameraActive] = useState(false);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 border-b">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <Scan className="text-[#ff6b00]" /> {t('Camera Scanner', 'ကင်မရာစကင်နာ')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!cameraActive ? (
          <div className="aspect-video bg-slate-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed">
            <Button onClick={() => setCameraActive(true)} className="bg-[#0d2c54] font-bold">
               {t('Start Camera', 'ကင်မရာဖွင့်မည်')}
            </Button>
          </div>
        ) : (
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center border-2 border-[#ff6b00] m-10 rounded-xl animate-pulse" />
            <Button onClick={() => setCameraActive(false)} variant="destructive" className="absolute bottom-4 right-4">
              {t('Stop', 'ရပ်မည်')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}