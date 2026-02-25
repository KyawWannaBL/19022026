import { Globe, Save, Plus, Trash2, Edit } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TariffRatesAPI, TariffRate } from "@/lib/admin-api";

export default function TariffSetting() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const [rates, setRates] = useState<TariffRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRate, setEditingRate] = useState<TariffRate | null>(null);

  const [newRate, setNewRate] = useState({
    country: "",
    country_code: "",
    region: "",
    weight_slab_min: 5.0,
    weight_slab_max: 10.0,
    price_mmk: 0,
    price_usd: 0
  });

  useEffect(() => {
    loadRates();
  }, []);

  const loadRates = async () => {
    try {
      setLoading(true);
      const data = await TariffRatesAPI.list();
      setRates(data);
    } catch (error) {
      console.error('Error loading tariff rates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRate = async () => {
    try {
      if (editingRate) {
        await TariffRatesAPI.update(editingRate.id, newRate);
        setEditingRate(null);
      } else {
        await TariffRatesAPI.create(newRate);
        setShowAddForm(false);
      }
      
      setNewRate({
        country: "",
        country_code: "",
        region: "",
        weight_slab_min: 5.0,
        weight_slab_max: 10.0,
        price_mmk: 0,
        price_usd: 0
      });
      
      loadRates();
    } catch (error) {
      console.error('Error saving rate:', error);
      alert('Error saving tariff rate');
    }
  };

  const handleEditRate = (rate: TariffRate) => {
    setNewRate({
      country: rate.country,
      country_code: rate.country_code || "",
      region: rate.region,
      weight_slab_min: rate.weight_slab_min,
      weight_slab_max: rate.weight_slab_max,
      price_mmk: rate.price_mmk,
      price_usd: rate.price_usd || 0
    });
    setEditingRate(rate);
    setShowAddForm(true);
  };

  const handleDeleteRate = async (id: string) => {
    if (confirm('Are you sure you want to delete this tariff rate?')) {
      try {
        await TariffRatesAPI.delete(id);
        loadRates();
      } catch (error) {
        console.error('Error deleting rate:', error);
        alert('Error deleting tariff rate');
      }
    }
  };

  const calculateUSDPrice = (mmkPrice: number) => {
    // Approximate exchange rate: 1 USD = 2100 MMK
    return Math.round((mmkPrice / 2100) * 100) / 100;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <div className="text-lg">{t('common.loading')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("tariff.mmkConfiguration")} / MMK ပို့ဆောင်ခ နှုန်းထားများ
          </h1>
          <p className="text-gray-600 mt-1">
            Manage international shipping rates and pricing
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {t("tariff.addRoute")} / လမ်းကြောင်းအသစ်
          </Button>
          <Button
            onClick={loadRates}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {t("tariff.save")} / သိမ်းရန်
          </Button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingRate ? 'Edit Tariff Rate' : 'Add New Tariff Rate'} / 
              {editingRate ? 'နှုန်းထား ပြင်ဆင်ရန်' : 'နှုန်းထားအသစ် ထည့်ရန်'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("tariff.country")} / နိုင်ငံ
                </label>
                <Input
                  value={newRate.country}
                  onChange={(e) => setNewRate({...newRate, country: e.target.value})}
                  placeholder="Thailand 🇹🇭"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Country Code / နိုင်ငံကုဒ်
                </label>
                <Input
                  value={newRate.country_code}
                  onChange={(e) => setNewRate({...newRate, country_code: e.target.value})}
                  placeholder="TH"
                  maxLength={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("tariff.region")} / ဒေသ
                </label>
                <select
                  value={newRate.region}
                  onChange={(e) => setNewRate({...newRate, region: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Region</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="North America">North America</option>
                  <option value="South America">South America</option>
                  <option value="Africa">Africa</option>
                  <option value="Oceania">Oceania</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("tariff.weightSlab")} / အလေးချိန်
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={newRate.weight_slab_min}
                    onChange={(e) => setNewRate({...newRate, weight_slab_min: parseFloat(e.target.value)})}
                    placeholder="5.0"
                    step="0.1"
                  />
                  <span className="flex items-center text-gray-500">-</span>
                  <Input
                    type="number"
                    value={newRate.weight_slab_max}
                    onChange={(e) => setNewRate({...newRate, weight_slab_max: parseFloat(e.target.value)})}
                    placeholder="10.0"
                    step="0.1"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("tariff.priceMMK")} / ဈေးနှုန်း (MMK)
                </label>
                <Input
                  type="number"
                  value={newRate.price_mmk}
                  onChange={(e) => {
                    const mmkPrice = parseFloat(e.target.value);
                    setNewRate({
                      ...newRate, 
                      price_mmk: mmkPrice,
                      price_usd: calculateUSDPrice(mmkPrice)
                    });
                  }}
                  placeholder="15000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t("tariff.priceUSD")} / ဈေးနှုန်း (USD)
                </label>
                <Input
                  type="number"
                  value={newRate.price_usd}
                  onChange={(e) => setNewRate({...newRate, price_usd: parseFloat(e.target.value)})}
                  placeholder="7.14"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingRate(null);
                  setNewRate({
                    country: "",
                    country_code: "",
                    region: "",
                    weight_slab_min: 5.0,
                    weight_slab_max: 10.0,
                    price_mmk: 0,
                    price_usd: 0
                  });
                }}
              >
                {t("admin.cancel")} / ပယ်ဖျက်ရန်
              </Button>
              <Button
                onClick={handleSaveRate}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!newRate.country || !newRate.region || newRate.price_mmk <= 0}
              >
                {editingRate ? 'Update Rate' : t("tariff.save")} / 
                {editingRate ? 'နှုန်းထား ပြင်ဆင်ရန်' : 'သိမ်းရန်'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tariff Rates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Tariff Rates / လက်ရှိ နှုန်းထားများ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">{t("tariff.country")} / နိုင်ငံ</th>
                  <th className="text-left py-3 px-4">{t("tariff.weightSlab")} / အလေးချိန်</th>
                  <th className="text-left py-3 px-4">{t("tariff.priceMMK")} / ဈေးနှုန်း (MMK)</th>
                  <th className="text-left py-3 px-4">{t("tariff.priceUSD")} / ဈေးနှုန်း (USD)</th>
                  <th className="text-left py-3 px-4">{t("tariff.region")} / ဒေသ</th>
                  <th className="text-left py-3 px-4">{t("admin.action")} / လုပ်ဆောင်ချက်</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((rate) => (
                  <tr key={rate.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-500" />
                        {rate.country}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {rate.weight_slab_min} - {rate.weight_slab_max} Kg
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-green-600">
                        {rate.price_mmk.toLocaleString()} MMK
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-blue-600">
                        ${rate.price_usd?.toFixed(2) || '0.00'} USD
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {rate.region}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditRate(rate)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRate(rate.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{rates.length}</div>
              <div className="text-sm text-gray-600">Total Countries / စုစုပေါင်း နိုင်ငံများ</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {[...new Set(rates.map(r => r.region))].length}
              </div>
              <div className="text-sm text-gray-600">Regions Covered / ဒေသများ</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {rates.length > 0 ? Math.round(rates.reduce((sum, r) => sum + r.price_mmk, 0) / rates.length).toLocaleString() : 0}
              </div>
              <div className="text-sm text-gray-600">Avg Price MMK / ပျမ်းမျှ ဈေးနှုန်း</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}