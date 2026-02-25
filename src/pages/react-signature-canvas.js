import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SignatureCanvas from "react-signature-canvas";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useRef } from "react";
export default function SignaturePad({ deliveryId }) {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const sigRef = useRef(null);
    const saveSignature = async () => {
        const canvas = sigRef.current?.getTrimmedCanvas();
        if (!canvas)
            return;
        const blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
        const path = `signatures/${deliveryId}.png`;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, blob, { contentType: "image/png" });
        const url = await getDownloadURL(storageRef);
        await updateDoc(doc(db, "deliveries", deliveryId), {
            signatureUrl: url,
            updatedAt: serverTimestamp(),
        });
    };
    return (_jsxs("div", { children: [_jsx(SignatureCanvas, { ref: sigRef, penColor: "black", canvasProps: { width: 320, height: 140, style: { border: "1px solid #ccc" } } }), _jsx("button", { onClick: () => sigRef.current?.clear(), children: "Clear" }), _jsx("button", { onClick: saveSignature, children: "Save" }), "import ", (useRef, useState), " from \"react\"; import ", supabase, " from \"@/lib/supabase\"; import ", TABLES, " from \"@/lib/db/tables\"; import ", Button, " from \"@/components/ui/button\"; export default function SignaturePad(", deliveryId, ": ", deliveryId, ": string }) ", , "const sigRef = useRef", _jsxs(SignatureCanvas, { children: ["(null); const [saving, setSaving] = useState(false); const [savedUrl, setSavedUrl] = useState", _jsx("string", {}), " | null>(null); const saveSignature = async () => ", , "const canvas = sigRef.current?.getTrimmedCanvas(); if (!canvas || !supabase) return; setSaving(true); try ", , "const blob: Blob = await new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error(\"Failed to export signature\"))), \"image/png\") ); const filename = `$", deliveryId, "-$", Date.now(), ".png`; const path = `signatures/$", filename, "`; // Public bucket, so this will be accessible by URL. const ", error, ": uploadErr } = await supabase.storage .from(\"signatures\") .upload(path, blob, ", contentType, ": \"image/png\", upsert: true }); if (uploadErr) throw uploadErr; const ", data, " = supabase.storage.from(\"signatures\").getPublicUrl(path); const url = data.publicUrl; setSavedUrl(url); // Best-effort: attach to shipment tracking. await supabase.from(TABLES.SHIPMENT_TRACKING).insert(", shipment_id, ": deliveryId, status: \"delivered\", location: \"Signature\", notes: `Signature: $", url, "`, timestamp: new Date().toISOString(), }); // Best-effort: if shipments has a signature_url column, update it (ignore if column not present). await supabase.from(TABLES.SHIPMENTS).update(", signature_url, ": url }).eq(\"id\", deliveryId); } catch (e) ", console.error(e), "; } finally ", setSaving(false), "; } }; return (", _jsxs("div", { className: "space-y-3", children: [_jsx(SignatureCanvas, { ref: sigRef, penColor: "black", canvasProps: { width: 320, height: 140, style: { border: "1px solid #ccc", borderRadius: 8 } } }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", onClick: () => sigRef.current?.clear(), type: "button", children: "Clear" }), _jsx(Button, { onClick: saveSignature, disabled: saving, type: "button", children: saving ? "Saving..." : "Save" })] }), savedUrl && (_jsx("a", { className: "text-xs text-primary underline underline-offset-4", href: savedUrl, target: "_blank", rel: "noreferrer", children: "View saved signature" }))] }), "); }"] })] }));
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
}
