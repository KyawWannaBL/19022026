 * Britium Express - Advanced Logistics API
 * Tracks Sender, Receiver, and the Clerk/Picker who initiated the AWB.
 * © 2026 Production Final
 */
export const AdvancedFeaturesAPI = {
  // Initiates tracking from ShipmentRegistration.tsx
  // စာရင်းသွင်းမှုနှင့် အကောင့်စစ်ဆေးမှု ပြုလုပ်ရန်
  async registerShipmentWithAudit(shipmentData: Partial<Shipment>, userId: string) {
    const { data, error } = await supabase
      .from('shipments')
      .insert([{
        ...shipmentData,
        registered_by: userId, 
        registration_date: new Date().toISOString()
      }])
      .select();

    if (error) throw error;
    return data[0];
  },

  // Generates reports for Admin/Merchant visibility
  // အစီရင်ခံစာများ ထုတ်ယူရန်
  async getAuditReports(t: any) {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .order('registration_date', { ascending: false });

    if (error) throw error;
    return data.map((s: any) => ({
      ...s,
      display_status: t(`status.${s.status}`) || s.status
    }));
  }
};

export {};