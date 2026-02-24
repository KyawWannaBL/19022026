import { jsxs as _jsxs } from "react/jsx-runtime";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Button } from "@/components/ui/button";
export default function ShipmentLifecycle({ shipmentId, currentStatus }) {
    const [loading, setLoading] = useState(false);
    const nextStepMap = {
        CREATED: "PICKED_UP",
        PICKED_UP: "IN_TRANSIT",
        IN_TRANSIT: "ARRIVED_AT_BRANCH",
        ARRIVED_AT_BRANCH: "OUT_FOR_DELIVERY",
        OUT_FOR_DELIVERY: "DELIVERED"
    };
    const nextStatus = nextStepMap[currentStatus];
    const handleTransition = async () => {
        if (!nextStatus)
            return;
        setLoading(true);
        const { error } = await supabase.rpc("transition_shipment", {
            p_shipment_id: shipmentId,
            p_next_status: nextStatus
        });
        if (error) {
            alert(error.message);
        }
        setLoading(false);
    };
    if (!nextStatus)
        return null;
    return (_jsxs(Button, { onClick: handleTransition, disabled: loading, className: "bg-luxury-gold text-black", children: ["Move to ", nextStatus] }));
}
