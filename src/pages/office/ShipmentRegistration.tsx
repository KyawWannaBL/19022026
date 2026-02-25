import { AWBLabel } from '@/components/AWBLabel';

export default function ShipmentRegistration() {
  const { user } = useAuth(); 
  const [lastRegistered, setLastRegistered] = React.useState<Shipment | null>(null);

  const handleRegister = async (formData: any) => {
    // 1. Logic to save to Supabase
    // 2. Set the result to trigger label view
    const newShipment = { 
      ...formData, 
      id: 'gen_id', 
      awb: 'YGN119874YGN',
      registeredBy: user?.id // Detection of current account
    };
    setLastRegistered(newShipment);
  };

  return (
    <div>
      {/* Registration Form logic */}
      
      {lastRegistered && user && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl">
            <AWBLabel shipment={lastRegistered} generator={user} />
            <button 
              onClick={() => window.print()} 
              className="w-full mt-4 bg-orange-600 text-white p-3 font-bold"
            >
              Print & Finish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}