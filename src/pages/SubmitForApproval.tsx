export default function SubmitForApproval({ shipmentId }: { shipmentId: string }) {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();

  const submit = async () => {
    // 1. Update shipment status
    await supabase
      .from("shipments")
      .update({ status: "PENDING_APPROVAL" })
      .eq("id", shipmentId)

    // 2. Create approval record
    await supabase.from("approvals").insert({
      entity_type: "SHIPMENT",
      entity_id: shipmentId,
      status: "PENDING"
    })

    alert("Submitted for approval")
  }

  return (
    <Button onClick={submit}>
      Submit For Approval
    </Button>
  )
}
