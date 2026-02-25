  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Operations Desk</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-lg"><PackageSearch className="text-blue-600" /></div>
            <CardTitle className="text-lg">In Processing</CardTitle>
          </CardHeader>
          <CardContent><div className="text-3xl font-bold">48</div></CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-amber-100 rounded-lg"><Clock className="text-amber-600" /></div>
            <CardTitle className="text-lg">Awaiting Pickup</CardTitle>
          </CardHeader>
          <CardContent><div className="text-3xl font-bold">24</div></CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-emerald-100 rounded-lg"><ClipboardCheck className="text-emerald-600" /></div>
            <CardTitle className="text-lg">Completed Today</CardTitle>
          </CardHeader>
          <CardContent><div className="text-3xl font-bold">112</div></CardContent>
        </Card>
      </div>
    </div>
  );
}