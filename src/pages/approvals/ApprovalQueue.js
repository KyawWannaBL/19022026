import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
export default function ApprovalQueue() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const [items, setItems] = useState([]);
    const load = async () => {
        const { data } = await supabase
            .from("approvals")
            .select(`
        id,
        entity_id,
        status,
        shipments ( awb, status )
      `)
            .eq("status", "PENDING");
        setItems(data || []);
    };
    useEffect(() => { load(); }, []);
    const approve = async (id, shipmentId) => {
        await supabase
            .from("approvals")
            .update({
            status: "APPROVED",
            approved_by: (await supabase.auth.getUser()).data.user?.id
        })
            .eq("id", id);
        await supabase
            .from("shipments")
            .update({ status: "APPROVED" })
            .eq("id", shipmentId);
        load();
    };
    const reject = async (id, shipmentId) => {
        await supabase
            .from("approvals")
            .update({ status: "REJECTED" })
            .eq("id", id);
        await supabase
            .from("shipments")
            .update({ status: "REJECTED" })
            .eq("id", shipmentId);
        load();
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h1", { className: "text-xl font-bold", children: "Pending Approvals" }), items.map(item => (_jsxs("div", { className: "luxury-card p-4 flex justify-between", children: [_jsxs("div", { children: ["Shipment: ", item.shipments?.awb] }), _jsxs("div", { className: "space-x-2", children: [_jsx(Button, { onClick: () => approve(item.id, item.entity_id), children: "Approve" }), _jsx(Button, { variant: "destructive", onClick: () => reject(item.id, item.entity_id), children: "Reject" })] })] }, item.id)))] }));
}
