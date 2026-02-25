            <p className="text-[10px] text-green-600 font-medium">+2.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="border-zinc-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-zinc-400">{t('Active Riders', 'လက်ရှိ ပို့ဆောင်သူများ')}</CardTitle>
            <Users className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-800">142</div>
            <p className="text-[10px] text-zinc-400">Operating across 5 branches</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}