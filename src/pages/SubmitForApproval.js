import { jsx as _jsx } from "react/jsx-runtime";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
export default function SubmitForApproval({ shipmentId }) {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const submit = async () => {
        // 1. Update shipment status
        await supabase
            .from("shipments")
            .update({ status: "PENDING_APPROVAL" })
            .eq("id", shipmentId);
        // 2. Create approval record
        await supabase.from("approvals").insert({
            entity_type: "SHIPMENT",
            entity_id: shipmentId,
            status: "PENDING"
        });
        alert("Submitted for approval");
    };
    return (_jsx(Button, { onClick: submit, children: "Submit For Approval" }));
}
