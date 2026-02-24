import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ... (imports remain the same)
export default function RiderDashboard() {
    const { language } = useLanguage();
    const [activeTask, setActiveTask] = useState(MOCK_DELIVERIES[0]);
    const [deliveries, setDeliveries] = useState(MOCK_DELIVERIES);
    const [isOnline, setIsOnline] = useState(true);
    // Refined POD State
    const [podStep, setPodStep] = useState('none');
    const [signatureData, setSignatureData] = useState(null);
    const [photoData, setPhotoData] = useState(null);
    // Helper to reset POD
    const resetPOD = () => {
        setPodStep('none');
        setSignatureData(null);
        setPhotoData(null);
    };
    const handleSelectTask = (task) => {
        setActiveTask(task);
        resetPOD(); // Ensure clean slate for new task
    };
    const handleCompleteDelivery = () => {
        if (activeTask) {
            setDeliveries(prev => prev.filter(t => t.id !== activeTask.id));
            setActiveTask(null);
            resetPOD();
            toast.success('Delivery marked as complete!');
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-background text-foreground pb-20", children: [_jsxs("main", { className: "container max-w-lg mx-auto p-4 space-y-6", children: [activeTask && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, children: _jsxs(Button, { className: "w-full h-12 rounded-xl luxury-button flex items-center gap-2", onClick: () => setPodStep('scan'), children: [_jsx(Scan, { className: "w-4 h-4" }), " Start Delivery"] }) })), _jsx(Tabs, { defaultValue: "pending", className: "w-full", children: _jsx(TabsContent, { value: "pending", className: "mt-4 space-y-3", children: deliveries.map((task) => (_jsx(motion.div, { onClick: () => handleSelectTask(task), className: `p-4 luxury-card cursor-pointer border-l-4 transition-all ${activeTask?.id === task.id ? 'border-l-primary bg-primary/5 shadow-md' : 'border-l-transparent'}` }, task.id))) }) })] }), _jsx(Dialog, { open: podStep !== 'none', onOpenChange: (open) => {
                    if (!open)
                        resetPOD(); // Cleanup on close
                }, children: _jsxs(DialogContent, { className: "max-w-md bg-background border-primary/20 rounded-[2rem] p-0 overflow-hidden", children: [_jsx(DialogHeader, { className: "p-6 pb-2", children: _jsxs(DialogTitle, { className: "text-xl font-bold", children: [podStep === 'scan' && 'Scan Package', podStep === 'signature' && 'Customer Signature', podStep === 'photo' && 'Proof of Delivery', podStep === 'complete' && 'Summary'] }) }), _jsxs("div", { className: "px-6 pb-8", children: [podStep === 'scan' && (_jsxs("div", { className: "space-y-6", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Verify the parcel barcode." }), _jsx("div", { className: "rounded-2xl overflow-hidden aspect-square border-2 border-primary/20 bg-black", children: _jsx(QRScanner, { onScan: (data) => {
                                                    if (data) {
                                                        toast.success(`Package Verified`);
                                                        setPodStep('signature');
                                                    }
                                                } }) }), _jsx(Button, { variant: "ghost", className: "w-full text-xs", onClick: () => setPodStep('signature'), children: "Manual Verification (Skip)" })] })), podStep === 'signature' && (_jsxs("div", { className: "space-y-6", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Sign to confirm receipt." }), _jsx("div", { className: "bg-muted/30 rounded-2xl h-60 border border-dashed border-primary/40 overflow-hidden", children: _jsx(SignaturePad, { onSave: (data) => {
                                                    setSignatureData(data);
                                                    setPodStep('photo');
                                                } }) }), _jsx(Button, { variant: "ghost", className: "w-full", onClick: () => setPodStep('scan'), children: "Back" })] })), podStep === 'photo' && (_jsxs("div", { className: "space-y-6", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Photo of parcel at doorstep." }), _jsx("div", { className: "rounded-2xl overflow-hidden border-2 border-primary/20", children: _jsx(PhotoCapture, { onCapture: (data) => {
                                                    setPhotoData(data);
                                                    setPodStep('complete');
                                                } }) }), _jsx(Button, { variant: "ghost", className: "w-full", onClick: () => setPodStep('signature'), children: "Back" })] })), podStep === 'complete' && (_jsxs("div", { className: "space-y-6 text-center animate-in zoom-in-95 duration-300", children: [_jsx("div", { className: "w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/5", children: _jsx(Check, { className: "w-10 h-10 text-emerald-500" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold", children: "Ready to Submit" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "All proof captured successfully." })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-left bg-secondary/20 p-4 rounded-2xl", children: [_jsxs("div", { children: [_jsx("span", { className: "text-[10px] uppercase text-muted-foreground block", children: "Items" }), _jsx("span", { className: "text-sm font-bold", children: "1 Parcel" })] }), _jsxs("div", { children: [_jsx("span", { className: "text-[10px] uppercase text-muted-foreground block", children: "COD" }), _jsx("span", { className: "text-sm font-bold text-emerald-500", children: formatCurrency(activeTask?.codAmount || 0) })] })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Button, { className: "w-full luxury-button py-6 text-lg", onClick: handleCompleteDelivery, children: "Finish & Submit" }), _jsx(Button, { variant: "ghost", onClick: () => setPodStep('photo'), children: "Recapture Photo" })] })] }))] })] }) })] }));
}
