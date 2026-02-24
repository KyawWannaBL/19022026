import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { UploadCloud, FileText, AlertTriangle, Check, X, Download } from 'lucide-react';
import { useLanguageContext } from "@/lib/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BulkUploadAPI } from "@/lib/admin-api";
const BulkUpload = () => {
    const { t } = useLanguageContext();
    const [file, setFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [uploadId, setUploadId] = useState(null);
    const [items, setItems] = useState([]);
    const [validationComplete, setValidationComplete] = useState(false);
    // Mock validation results for demo
    const [rows, setRows] = useState([
        { row: 1, receiver: 'Kyaw Kyaw', phone: '0912345678', address: 'Yangon', status: 'valid' },
        { row: 2, receiver: 'Su Su', phone: '0987654321', address: 'Mandalay', status: 'valid' },
        { row: 3, receiver: 'Aung Aung', phone: '123', address: '', status: 'error', msg: 'Invalid Phone & Missing Address' },
    ]);
    const handleFileDrop = async (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type.includes('csv') || droppedFile.type.includes('excel'))) {
            await processFile(droppedFile);
        }
    };
    const handleFileSelect = async (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            await processFile(selectedFile);
        }
    };
    const processFile = async (selectedFile) => {
        setAnalyzing(true);
        setFile(selectedFile);
        try {
            // Create bulk upload record
            const upload = await BulkUploadAPI.create({
                filename: selectedFile.name,
                total_rows: rows.length,
                valid_rows: rows.filter(r => r.status === 'valid').length,
                error_rows: rows.filter(r => r.status === 'error').length,
                status: 'processing'
            });
            setUploadId(upload.id);
            // Simulate file processing
            setTimeout(() => {
                setAnalyzing(false);
                setValidationComplete(true);
            }, 2000);
        }
        catch (error) {
            console.error('Error processing file:', error);
            setAnalyzing(false);
        }
    };
    const handleCreateShipments = async () => {
        if (!uploadId)
            return;
        try {
            const validRows = rows.filter(r => r.status === 'valid');
            // Create bulk upload items
            const itemsData = validRows.map((row, index) => ({
                upload_id: uploadId,
                row_number: row.row,
                receiver_name: row.receiver,
                receiver_phone: row.phone,
                receiver_address: row.address,
                validation_status: 'valid'
            }));
            await BulkUploadAPI.createItems(itemsData);
            await BulkUploadAPI.updateStatus(uploadId, 'completed');
            alert(`${validRows.length} shipments created successfully!`);
            resetForm();
        }
        catch (error) {
            console.error('Error creating shipments:', error);
            alert('Error creating shipments');
        }
    };
    const resetForm = () => {
        setFile(null);
        setUploadId(null);
        setItems([]);
        setValidationComplete(false);
        setAnalyzing(false);
    };
    const downloadTemplate = () => {
        const csvContent = "receiver_name,receiver_phone,receiver_address,sender_name,weight,cod_amount,special_instructions\n" +
            "John Doe,0912345678,123 Main St Yangon,Company ABC,2.5,50000,Handle with care\n" +
            "Jane Smith,0987654321,456 Oak Ave Mandalay,Company XYZ,1.2,25000,Fragile item";
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bulk_upload_template.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold text-gray-900", children: [t("bulk.orderUpload"), " / \u1021\u1019\u103B\u102C\u1038\u1021\u1015\u103C\u102C\u1038 \u1021\u1031\u102C\u103A\u1012\u102B \u1021\u1015\u103A\u101C\u102F\u1012\u103A"] }), _jsx("p", { className: "text-gray-600 mt-1", children: "Upload CSV or Excel files to create multiple shipments at once" })] }), !file && (_jsx(Card, { children: _jsx(CardContent, { className: "p-8", children: _jsxs("div", { onDragOver: (e) => e.preventDefault(), onDrop: handleFileDrop, className: "border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-colors cursor-pointer group", children: [_jsx(UploadCloud, { className: "w-12 h-12 text-gray-400 group-hover:text-blue-500 mx-auto mb-4" }), _jsxs("h3", { className: "text-lg font-semibold text-gray-700 mb-2", children: [t("bulk.dragDropFile"), " / CSV / Excel \u1016\u102D\u102F\u1004\u103A\u1000\u102D\u102F \u1006\u103D\u1032\u104D \u1011\u100A\u1037\u103A\u101B\u1014\u103A"] }), _jsxs("p", { className: "text-gray-500 mb-4", children: [t("bulk.or"), " / \u1019\u101F\u102F\u1010\u103A\u1010\u1031\u102C\u1037", _jsxs("label", { className: "text-blue-600 hover:text-blue-700 cursor-pointer ml-1", children: [t("bulk.browseComputer"), " / \u1000\u103D\u1014\u103A\u1015\u103B\u1030\u1010\u102C\u1019\u103E \u101B\u103D\u1031\u1038\u101B\u1014\u103A", _jsx("input", { type: "file", accept: ".csv,.xlsx,.xls", onChange: handleFileSelect, className: "hidden" })] })] }), _jsxs(Button, { onClick: downloadTemplate, variant: "outline", className: "mt-4", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), t("bulk.downloadTemplate"), " / \u1010\u1019\u103A\u1038\u1015\u101C\u102D\u1010\u103A \u1012\u1031\u102B\u1004\u103A\u1038\u101C\u102F\u1012\u103A\u101B\u1014\u103A"] })] }) }) })), analyzing && (_jsx(Card, { children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsx("div", { className: "animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" }), _jsxs("h3", { className: "text-lg font-semibold", children: [t("bulk.analyzing"), " / \u1016\u102D\u102F\u1004\u103A\u1000\u102D\u102F \u1005\u1005\u103A\u1006\u1031\u1038\u1014\u1031\u101E\u100A\u103A..."] }), _jsx("p", { className: "text-gray-600", children: "Please wait while we validate your data..." })] }) })), file && validationComplete && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs(CardTitle, { children: [t("bulk.validationResults"), " / \u1005\u1005\u103A\u1006\u1031\u1038\u1019\u103E\u102F \u101B\u101C\u1012\u103A\u1019\u103B\u102C\u1038"] }), _jsxs("p", { className: "text-sm text-gray-600 mt-1", children: [t("bulk.validErrorFound"), " / \u1042 \u1019\u103E\u1014\u103A\u1000\u1014\u103A, \u1041 \u1021\u1019\u103E\u102C\u1038\u101B\u103E\u102D"] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", onClick: resetForm, children: [t("bulk.reUpload"), " / \u1015\u103C\u1014\u103A\u101C\u100A\u103A\u1021\u1015\u103A\u101C\u102F\u1012\u103A"] }), _jsxs(Button, { onClick: handleCreateShipments, disabled: rows.filter(r => r.status === 'error').length > 0, className: "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed", children: [t("bulk.createShipments"), " / \u1015\u102D\u102F\u1037\u1006\u1031\u102C\u1004\u103A\u1019\u103E\u102F\u1019\u103B\u102C\u1038 \u1016\u1014\u103A\u1010\u102E\u1038\u101B\u1014\u103A"] })] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsxs("th", { className: "text-left py-3 px-4", children: [t("bulk.row"), " / \u1021\u1010\u1014\u103A\u1038"] }), _jsxs("th", { className: "text-left py-3 px-4", children: [t("bulk.receiver"), " / \u101C\u1000\u103A\u1001\u1036\u101E\u1030"] }), _jsxs("th", { className: "text-left py-3 px-4", children: [t("bulk.phone"), " / \u1016\u102F\u1014\u103A\u1038"] }), _jsxs("th", { className: "text-left py-3 px-4", children: [t("bulk.address"), " / \u101C\u102D\u1015\u103A\u1005\u102C"] }), _jsxs("th", { className: "text-left py-3 px-4", children: [t("admin.status"), " / \u1021\u1001\u103C\u1031\u1021\u1014\u1031"] })] }) }), _jsx("tbody", { children: rows.map((r, index) => (_jsxs("tr", { className: "border-b hover:bg-gray-50", children: [_jsxs("td", { className: "py-3 px-4", children: ["#", r.row] }), _jsx("td", { className: "py-3 px-4", children: r.receiver }), _jsx("td", { className: "py-3 px-4", children: r.phone }), _jsx("td", { className: "py-3 px-4", children: r.address || '-' }), _jsx("td", { className: "py-3 px-4", children: r.status === 'valid' ? (_jsxs("span", { className: "flex items-center gap-2 text-green-600", children: [_jsx(Check, { className: "w-4 h-4" }), t("bulk.valid"), " / \u1019\u103E\u1014\u103A\u1000\u1014\u103A"] })) : (_jsxs("div", { className: "space-y-1", children: [_jsxs("span", { className: "flex items-center gap-2 text-red-600", children: [_jsx(X, { className: "w-4 h-4" }), t("bulk.error"), " / \u1021\u1019\u103E\u102C\u1038"] }), r.msg && (_jsx("p", { className: "text-xs text-red-500", children: r.msg }))] })) })] }, index))) })] }) }) })] })), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Upload Instructions / \u1021\u1015\u103A\u101C\u102F\u1012\u103A \u101C\u1019\u103A\u1038\u100A\u103D\u103E\u1014\u103A\u1001\u103B\u1000\u103A\u1019\u103B\u102C\u1038" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3 text-sm", children: [_jsxs("div", { className: "flex items-start gap-2", children: [_jsx(FileText, { className: "w-4 h-4 text-blue-500 mt-0.5" }), _jsxs("div", { children: [_jsx("strong", { children: "Supported formats:" }), " CSV, Excel (.xlsx, .xls)", _jsx("br", {}), _jsx("span", { className: "text-gray-600", children: "\u1015\u1036\u1037\u1015\u102D\u102F\u1038\u101E\u1031\u102C \u1016\u102D\u102F\u1004\u103A\u1021\u1019\u103B\u102D\u102F\u1038\u1021\u1005\u102C\u1038\u1019\u103B\u102C\u1038: CSV, Excel" })] })] }), _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertTriangle, { className: "w-4 h-4 text-orange-500 mt-0.5" }), _jsxs("div", { children: [_jsx("strong", { children: "Required columns:" }), " receiver_name, receiver_phone, receiver_address", _jsx("br", {}), _jsx("span", { className: "text-gray-600", children: "\u101C\u102D\u102F\u1021\u1015\u103A\u101E\u1031\u102C \u1000\u1031\u102C\u103A\u101C\u1036\u1019\u103B\u102C\u1038: \u101C\u1000\u103A\u1001\u1036\u101E\u1030\u1021\u1019\u100A\u103A, \u1016\u102F\u1014\u103A\u1038\u1014\u1036\u1015\u102B\u1010\u103A, \u101C\u102D\u1015\u103A\u1005\u102C" })] })] }), _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(Check, { className: "w-4 h-4 text-green-500 mt-0.5" }), _jsxs("div", { children: [_jsx("strong", { children: "Maximum rows:" }), " 1000 per upload", _jsx("br", {}), _jsx("span", { className: "text-gray-600", children: "\u1021\u1019\u103B\u102C\u1038\u1006\u102F\u1036\u1038 \u1021\u1010\u1014\u103A\u1038\u1019\u103B\u102C\u1038: \u1010\u1005\u103A\u1000\u103C\u102D\u1019\u103A\u101C\u103B\u103E\u1004\u103A \u1041\u1040\u1040\u1040 \u1010\u1014\u103A\u1038" })] })] })] }) })] })] }));
};
export default BulkUpload;
