import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PickupTask() {
  const tasks = [
    { id: 'T-001', address: '123 Pyay Road, Kamayut', time: '10:30 AM', items: 2 },
    { id: 'T-002', address: '45 Insein Road, Hlaing', time: '11:45 AM', items: 1 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Pickups</h1>
        <Badge variant="outline">{tasks.length} Assigned</Badge>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="border-l-4 border-l-blue-600">
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">TASK {task.id}</span>
                    <Badge className="bg-blue-50 text-blue-600 border-none px-2 h-5 text-[10px]">SCHEDULED</Badge>
                  </div>
                  <p className="font-bold flex items-center gap-2"><MapPin size={16} className="text-rose-500"/> {task.address}</p>
                </div>
                <p className="text-sm font-semibold text-slate-600">{task.time}</p>
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1"><Package size={14}/> {task.items} Parcels</div>
                <div className="flex items-center gap-1"><Phone size={14}/> Call Sender</div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1 bg-blue-600"><Navigation className="mr-2 h-4 w-4" /> Navigate</Button>
                <Button variant="outline" className="flex-1 border-blue-600 text-blue-600">
                  <Camera className="mr-2 h-4 w-4" /> Start Pickup
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}