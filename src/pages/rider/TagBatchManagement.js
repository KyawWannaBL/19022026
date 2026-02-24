import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { ShieldAlert, XCircle, RefreshCw, Camera, AlertTriangle, History, PackageCheck, Info } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTamperTags } from '@/hooks/useTamperTags';
import { TAG_STATUS } from '@/lib/index';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
const TagBatchManagement = () => {
    const { user, legacyUser } = useAuth();
    const { tags, activeBatchId, getRiderTags, voidTag, getReconciliation } = useTamperTags();
    const [isVoiding, setIsVoiding] = useState(false);
    const [voidTagId, setVoidTagId] = useState('');
    const [voidReason, setVoidReason] = useState('');
    const [physicalCount, setPhysicalCount] = useState('');
    const [isReconciling, setIsReconciling] = useState(false);
    const riderTags = useMemo(() => {
        if (!user)
            return [];
        return getRiderTags(legacyUser?.id);
    }, [user, getRiderTags]);
    const activeBatch = useMemo(() => {
        return riderTags.filter(t => t.batchId === legacyUser?.batchId || t.batchId === activeBatchId);
    }, [riderTags, legacyUser?.batchId, activeBatchId]);
    const stats = useMemo(() => {
        const issued = activeBatch.length;
        const used = activeBatch.filter(t => t.status === TAG_STATUS.USED).length;
        const voided = activeBatch.filter(t => t.status === TAG_STATUS.VOID).length;
        const remaining = issued - used - voided;
        const progress = issued > 0 ? (used / issued) * 100 : 0;
        return { issued, used, voided, remaining, progress };
    }, [activeBatch]);
    const handleVoidSubmit = () => {
        if (!voidTagId || !voidReason) {
            toast({
                title: "Error",
                description: "Please provide both Tag ID and a reason.",
                variant: "destructive"
            });
            return;
        }
        voidTag(voidTagId, voidReason);
        toast({
            title: "Tag Voided",
            description: `Tag ${voidTagId} has been marked as VOID.`
        });
        setVoidTagId('');
        setVoidReason('');
        setIsVoiding(false);
    };
    const handleReconcile = () => {
        if (physicalCount === '')
            return;
        const recon = getReconciliation(legacyUser?.id || '', Number(physicalCount));
        if (recon.mismatch) {
            toast({
                title: "Discrepancy Detected",
                description: "Your physical count does not match the system. An incident report will be created.",
                variant: "destructive"
            });
        }
        else {
            toast({
                title: "Reconciliation Complete",
                description: "All tags accounted for. Shift data synced successfully.",
            });
        }
        setIsReconciling(false);
    };
    const getStatusColor = (status) => {
        switch (status) {
            case TAG_STATUS.USED: return "bg-primary/10 text-primary border-primary/20";
            case TAG_STATUS.VOID: return "bg-destructive/10 text-destructive border-destructive/20";
            case TAG_STATUS.ISSUED_TO_RIDER: return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
            default: return "bg-muted text-muted-foreground";
        }
    };
    return (_jsxs("div", { className: "space-y-6 max-w-4xl mx-auto p-4 md:p-6 pb-24", children: [_jsxs("header", { className: "flex flex-col gap-1", children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Tag Management" }), _jsx("p", { className: "text-muted-foreground", children: "Manage your tamper-evident security tags and daily reconciliation." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "card-modern border-primary/20", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: "Active Batch" }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold font-mono", children: legacyUser?.batchId || 'NO ACTIVE BATCH' }), _jsxs("div", { className: "flex items-center mt-1 text-xs text-muted-foreground", children: [_jsx(PackageCheck, { className: "w-3 h-3 mr-1" }), stats.issued, " Tags Issued"] })] })] }), _jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: "Remaining Tags" }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold text-emerald-600", children: stats.remaining }), _jsx("div", { className: "mt-1", children: _jsx(Progress, { value: stats.progress, className: "h-1" }) })] })] }), _jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: "Used Today" }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: stats.used }), _jsxs("div", { className: "flex items-center mt-1 text-xs text-destructive", children: [_jsx(XCircle, { className: "w-3 h-3 mr-1" }), stats.voided, " Voided"] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "card-modern", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(ShieldAlert, { className: "w-5 h-5 text-destructive" }), "Quick Actions"] }), _jsx(CardDescription, { children: "Report damaged tags or end your shift." })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs(Dialog, { open: isVoiding, onOpenChange: setIsVoiding, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "w-full justify-start border-destructive/20 text-destructive hover:bg-destructive/5", children: [_jsx(XCircle, { className: "w-4 h-4 mr-2" }), "Void a Damaged Tag"] }) }), _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Void Tamper Tag" }), _jsx(DialogDescription, { children: "Use this if a tag is torn, adhesive failed, or print is unreadable." })] }), _jsxs("div", { className: "space-y-4 py-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Tag ID (Scan or Type)" }), _jsx(Input, { placeholder: "TT-000000", value: voidTagId, onChange: (e) => setVoidTagId(e.target.value.toUpperCase()), className: "font-mono" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Reason for Void" }), _jsxs(Select, { onValueChange: setVoidReason, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select reason" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "TAG_TORN", children: "Tag Torn" }), _jsx(SelectItem, { value: "PRINT_FADED", children: "Print Faded/Unreadable" }), _jsx(SelectItem, { value: "ADHESIVE_FAILURE", children: "Adhesive Failure" }), _jsx(SelectItem, { value: "MISPLACED_ATTACHMENT", children: "Misplaced Attachment" })] })] })] }), _jsxs("div", { className: "border-2 border-dashed border-muted rounded-lg p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer", children: [_jsx(Camera, { className: "w-8 h-8 mb-2 opacity-50" }), _jsx("span", { className: "text-sm", children: "Take Photo of Damaged Tag" })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "ghost", onClick: () => setIsVoiding(false), children: "Cancel" }), _jsx(Button, { variant: "destructive", onClick: handleVoidSubmit, children: "Confirm Void" })] })] })] }), _jsxs(Dialog, { open: isReconciling, onOpenChange: setIsReconciling, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "w-full justify-start", children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2" }), "End-of-Day Reconcile"] }) }), _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Batch Reconciliation" }), _jsx(DialogDescription, { children: "Confirm your physical tag count matches the system records." })] }), _jsxs("div", { className: "space-y-4 py-4", children: [_jsxs("div", { className: "bg-muted/30 p-4 rounded-lg space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "System Records (Remaining):" }), _jsxs("span", { className: "font-bold", children: [stats.remaining, " Tags"] })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Used Records:" }), _jsxs("span", { children: [stats.used, " Tags"] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Enter Physical Count Remaining" }), _jsx(Input, { type: "number", placeholder: "0", value: physicalCount, onChange: (e) => setPhysicalCount(e.target.value === '' ? '' : Number(e.target.value)) })] }), physicalCount !== '' && Number(physicalCount) !== stats.remaining && (_jsxs("div", { className: "flex items-start gap-2 p-3 bg-destructive/10 text-destructive text-xs rounded-md border border-destructive/20", children: [_jsx(AlertTriangle, { className: "w-4 h-4 shrink-0" }), _jsx("p", { children: "Mismatch detected. You will be required to provide a reason for the discrepancy before submitting." })] }))] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "ghost", onClick: () => setIsReconciling(false), children: "Back" }), _jsx(Button, { onClick: handleReconcile, children: "Submit Reconciliation" })] })] })] })] })] }), _jsxs(Card, { className: "card-modern", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(History, { className: "w-5 h-5 text-primary" }), "Batch History"] }), _jsx(CardDescription, { children: "Recent tags from your active batch." })] }), _jsx(CardContent, { className: "p-0", children: _jsx("div", { className: "max-h-[300px] overflow-y-auto px-6", children: _jsxs("div", { className: "space-y-3 pb-4", children: [activeBatch.slice(0, 10).map((tag) => (_jsxs("div", { className: "flex items-center justify-between py-2 border-b border-border/50 last:border-0", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-mono text-sm font-medium", children: tag.id }), _jsx("span", { className: "text-[10px] text-muted-foreground", children: new Date(tag.issueDate).toLocaleDateString() })] }), _jsx(Badge, { variant: "outline", className: `text-[10px] ${getStatusColor(tag.status)}`, children: tag.status.replace(/_/g, ' ') })] }, tag.id))), activeBatch.length === 0 && (_jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [_jsx(Info, { className: "w-8 h-8 mx-auto mb-2 opacity-20" }), _jsx("p", { className: "text-sm", children: "No tags found in active batch." })] }))] }) }) }), _jsx(CardFooter, { className: "bg-muted/20 border-t py-3", children: _jsx(Button, { variant: "ghost", size: "sm", className: "w-full text-xs", children: "View Full History" }) })] })] }), _jsx("div", { className: "fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border flex gap-4 md:hidden", children: _jsxs(Button, { className: "flex-1 btn-modern", size: "lg", children: [_jsx(PackageCheck, { className: "w-5 h-5 mr-2" }), "Pickup"] }) })] }));
};
export default TagBatchManagement;
