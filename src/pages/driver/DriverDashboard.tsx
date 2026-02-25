export default function DriverDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-lg shadow-emerald-900/20">
        <h2 className="text-lg opacity-90 font-medium">Welcome back, Rider</h2>
        <h1 className="text-3xl font-bold">You have 8 pending tasks</h1>
        <Button className="mt-4 bg-white text-emerald-700 hover:bg-emerald-50">View Route Map</Button>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-800">Next Delivery</h3>
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-100 rounded-full"><Package className="text-slate-600" /></div>
            <div>
              <p className="font-bold text-slate-900">#BRX-9022-A</p>
              <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin size={14} /> North Dagon, Yangon</p>
            </div>
          </div>
          <Button size="sm" variant="outline"><Navigation size={16} /></Button>
        </div>
      </div>
    </div>
  );
}