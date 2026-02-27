  Printer, Search, Filter, Download, 
  FileText, CheckCircle2, MoreVertical, Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function VoucherManagementPage() {
  const { t } = useLanguageContext();
  const { data: shipments = [], isLoading } = useShipments();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShipments = shipments.filter(s => 
    s.awb?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.receiverName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrintAll = () => {
    window.print(); // Triggers CSS @media print styles for vouchers
  };

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen pb-24">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0d2c54]">{t('Voucher Management', 'ဘောက်ချာစီမံခန့်ခွဲမှု')}</h1>
          <p className="text-slate-500">{t('Generate and print shipping labels for all parcels', 'ပါဆယ်များအတွက် လိပ်စာကပ်ခွာများ ထုတ်ရန်')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl shadow-sm bg-white">
            <Download className="mr-2 h-4 w-4" /> {t('Export CSV', 'CSV ထုတ်ရန်')}
          </Button>
          <Button onClick={handlePrintAll} className="bg-[#ff6b00] hover:bg-[#e66000] rounded-xl shadow-lg">
            <Printer className="mr-2 h-4 w-4" /> {t('Print Selected', 'ရွေးချယ်ထားသည်များပုံနှိပ်ရန်')}
          </Button>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder={t('Search AWB or Receiver...', 'AWB သို့မဟုတ် လက်ခံသူ ရှာရန်')} 
            className="pl-10 h-11 border-none bg-slate-50 rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="ghost" className="rounded-xl">
          <Filter className="mr-2 h-4 w-4" /> {t('Filters', 'စစ်ထုတ်ရန်')}
        </Button>
      </div>

      {/* Vouchers Table */}
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-50 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="w-[50px]"><input type="checkbox" className="rounded" /></TableHead>
              <TableHead>{t('Voucher Details', 'ဘောက်ချာအသေးစိတ်')}</TableHead>
              <TableHead>{t('Recipient', 'လက်ခံသူ')}</TableHead>
              <TableHead>{t('Amount', 'ပမာဏ')}</TableHead>
              <TableHead>{t('Status', 'အခြေအနေ')}</TableHead>
              <TableHead className="text-right">{t('Actions', 'လုပ်ဆောင်ချက်')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShipments.map((s) => (
              <TableRow key={s.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell><input type="checkbox" className="rounded" /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-mono text-xs font-bold text-[#0d2c54]">{s.awb || 'NO-AWB'}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{s.createdAt.toString().split('T')[0]}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-bold text-sm">{s.receiverName}</p>
                  <p className="text-xs text-slate-500">{s.destinationTownship}</p>
                </TableCell>
                <TableCell className="font-bold text-[#ff6b00]">
                  {formatCurrency(Number(s.cod_amount) || 0)}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(s.status)} className="rounded-full px-3 py-0.5 text-[10px] uppercase">
                    {s.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}