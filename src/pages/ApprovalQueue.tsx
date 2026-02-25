
export default function ApprovalQueue() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const [items, setItems] = useState<any[]>([])

  const load = async () => {
    const { data } = await supabase
      .from("approvals")
      .select(`
        id,
        entity_id,
        status,
        shipments ( awb, status )
      `)
      .eq("status","PENDING")

    setItems(data || [])
  }

  useEffect(() => { load() }, [])

  const approve = async (id: string, shipmentId: string) => {
    await supabase
      .from("approvals")
      .update({
        status: "APPROVED",
        approved_by: (await supabase.auth.getUser()).data.user?.id
      })
      .eq("id", id)

    await supabase
      .from("shipments")
      .update({ status: "APPROVED" })
      .eq("id", shipmentId)

    load()
  }

  const reject = async (id: string, shipmentId: string) => {
    await supabase
      .from("approvals")
      .update({ status: "REJECTED" })
      .eq("id", id)

    await supabase
      .from("shipments")
      .update({ status: "REJECTED" })
      .eq("id", shipmentId)

    load()
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Pending Approvals</h1>

      {items.map(item => (
        <div key={item.id} className="luxury-card p-4 flex justify-between">
          <div>
            Shipment: {item.shipments?.awb}
          </div>

          <div className="space-x-2">
            <Button onClick={() => approve(item.id, item.entity_id)}>
              Approve
            </Button>
            <Button variant="destructive" onClick={() => reject(item.id, item.entity_id)}>
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
