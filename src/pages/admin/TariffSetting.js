import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLanguageContext } from "@/lib/LanguageContext";
import { Globe, Save, Plus, Trash2, Edit } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TariffRatesAPI } from "@/lib/admin-api";
export default function TariffSetting() {
    const { t } = useLanguageContext();
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingRate, setEditingRate] = useState(null);
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
        }
        catch (error) {
            console.error('Error loading tariff rates:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleSaveRate = async () => {
        try {
            if (editingRate) {
                await TariffRatesAPI.update(editingRate.id, newRate);
                setEditingRate(null);
            }
            else {
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
        }
        catch (error) {
            console.error('Error saving rate:', error);
            alert('Error saving tariff rate');
        }
    };
    const handleEditRate = (rate) => {
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
    const handleDeleteRate = async (id) => {
        if (confirm('Are you sure you want to delete this tariff rate?')) {
            try {
                await TariffRatesAPI.delete(id);
                loadRates();
            }
            catch (error) {
                console.error('Error deleting rate:', error);
                alert('Error deleting tariff rate');
            }
        }
    };
    const calculateUSDPrice = (mmkPrice) => {
        // Approximate exchange rate: 1 USD = 2100 MMK
        return Math.round((mmkPrice / 2100) * 100) / 100;
    };
    if (loading) {
        return (_jsx("div", { className: "p-6", children: _jsx("div", { className: "text-center py-8", children: _jsx("div", { className: "text-lg", children: t('common.loading') }) }) }));
    }
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold text-gray-900", children: [t("tariff.mmkConfiguration"), " / MMK \u1015\u102D\u102F\u1037\u1006\u1031\u102C\u1004\u103A\u1001 \u1014\u103E\u102F\u1014\u103A\u1038\u1011\u102C\u1038\u1019\u103B\u102C\u1038"] }), _jsx("p", { className: "text-gray-600 mt-1", children: "Manage international shipping rates and pricing" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: () => setShowAddForm(true), className: "bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2", children: [_jsx(Plus, { className: "w-4 h-4" }), t("tariff.addRoute"), " / \u101C\u1019\u103A\u1038\u1000\u103C\u1031\u102C\u1004\u103A\u1038\u1021\u101E\u1005\u103A"] }), _jsxs(Button, { onClick: loadRates, variant: "outline", className: "flex items-center gap-2", children: [_jsx(Save, { className: "w-4 h-4" }), t("tariff.save"), " / \u101E\u102D\u1019\u103A\u1038\u101B\u1014\u103A"] })] })] }), showAddForm && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { children: [editingRate ? 'Edit Tariff Rate' : 'Add New Tariff Rate', " /", editingRate ? 'နှုန်းထား ပြင်ဆင်ရန်' : 'နှုန်းထားအသစ် ထည့်ရန်'] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-1", children: [t("tariff.country"), " / \u1014\u102D\u102F\u1004\u103A\u1004\u1036"] }), _jsx(Input, { value: newRate.country, onChange: (e) => setNewRate({ ...newRate, country: e.target.value }), placeholder: "Thailand \uD83C\uDDF9\uD83C\uDDED" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Country Code / \u1014\u102D\u102F\u1004\u103A\u1004\u1036\u1000\u102F\u1012\u103A" }), _jsx(Input, { value: newRate.country_code, onChange: (e) => setNewRate({ ...newRate, country_code: e.target.value }), placeholder: "TH", maxLength: 3 })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-1", children: [t("tariff.region"), " / \u1012\u1031\u101E"] }), _jsxs("select", { value: newRate.region, onChange: (e) => setNewRate({ ...newRate, region: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "", children: "Select Region" }), _jsx("option", { value: "Asia", children: "Asia" }), _jsx("option", { value: "Europe", children: "Europe" }), _jsx("option", { value: "North America", children: "North America" }), _jsx("option", { value: "South America", children: "South America" }), _jsx("option", { value: "Africa", children: "Africa" }), _jsx("option", { value: "Oceania", children: "Oceania" })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-1", children: [t("tariff.weightSlab"), " / \u1021\u101C\u1031\u1038\u1001\u103B\u102D\u1014\u103A"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { type: "number", value: newRate.weight_slab_min, onChange: (e) => setNewRate({ ...newRate, weight_slab_min: parseFloat(e.target.value) }), placeholder: "5.0", step: "0.1" }), _jsx("span", { className: "flex items-center text-gray-500", children: "-" }), _jsx(Input, { type: "number", value: newRate.weight_slab_max, onChange: (e) => setNewRate({ ...newRate, weight_slab_max: parseFloat(e.target.value) }), placeholder: "10.0", step: "0.1" })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-1", children: [t("tariff.priceMMK"), " / \u1008\u1031\u1038\u1014\u103E\u102F\u1014\u103A\u1038 (MMK)"] }), _jsx(Input, { type: "number", value: newRate.price_mmk, onChange: (e) => {
                                                    const mmkPrice = parseFloat(e.target.value);
                                                    setNewRate({
                                                        ...newRate,
                                                        price_mmk: mmkPrice,
                                                        price_usd: calculateUSDPrice(mmkPrice)
                                                    });
                                                }, placeholder: "15000" })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-1", children: [t("tariff.priceUSD"), " / \u1008\u1031\u1038\u1014\u103E\u102F\u1014\u103A\u1038 (USD)"] }), _jsx(Input, { type: "number", value: newRate.price_usd, onChange: (e) => setNewRate({ ...newRate, price_usd: parseFloat(e.target.value) }), placeholder: "7.14", step: "0.01" })] })] }), _jsxs("div", { className: "flex gap-3 mt-6", children: [_jsxs(Button, { variant: "outline", onClick: () => {
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
                                        }, children: [t("admin.cancel"), " / \u1015\u101A\u103A\u1016\u103B\u1000\u103A\u101B\u1014\u103A"] }), _jsxs(Button, { onClick: handleSaveRate, className: "bg-blue-600 hover:bg-blue-700 text-white", disabled: !newRate.country || !newRate.region || newRate.price_mmk <= 0, children: [editingRate ? 'Update Rate' : t("tariff.save"), " /", editingRate ? 'နှုန်းထား ပြင်ဆင်ရန်' : 'သိမ်းရန်'] })] })] })] })), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Current Tariff Rates / \u101C\u1000\u103A\u101B\u103E\u102D \u1014\u103E\u102F\u1014\u103A\u1038\u1011\u102C\u1038\u1019\u103B\u102C\u1038" }) }), _jsx(CardContent, { children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsxs("th", { className: "text-left py-3 px-4", children: [t("tariff.country"), " / \u1014\u102D\u102F\u1004\u103A\u1004\u1036"] }), _jsxs("th", { className: "text-left py-3 px-4", children: [t("tariff.weightSlab"), " / \u1021\u101C\u1031\u1038\u1001\u103B\u102D\u1014\u103A"] }), _jsxs("th", { className: "text-left py-3 px-4", children: [t("tariff.priceMMK"), " / \u1008\u1031\u1038\u1014\u103E\u102F\u1014\u103A\u1038 (MMK)"] }), _jsxs("th", { className: "text-left py-3 px-4", children: [t("tariff.priceUSD"), " / \u1008\u1031\u1038\u1014\u103E\u102F\u1014\u103A\u1038 (USD)"] }), _jsxs("th", { className: "text-left py-3 px-4", children: [t("tariff.region"), " / \u1012\u1031\u101E"] }), _jsxs("th", { className: "text-left py-3 px-4", children: [t("admin.action"), " / \u101C\u102F\u1015\u103A\u1006\u1031\u102C\u1004\u103A\u1001\u103B\u1000\u103A"] })] }) }), _jsx("tbody", { children: rates.map((rate) => (_jsxs("tr", { className: "border-b hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Globe, { className: "w-4 h-4 text-blue-500" }), rate.country] }) }), _jsxs("td", { className: "py-3 px-4", children: [rate.weight_slab_min, " - ", rate.weight_slab_max, " Kg"] }), _jsx("td", { className: "py-3 px-4", children: _jsxs("span", { className: "font-semibold text-green-600", children: [rate.price_mmk.toLocaleString(), " MMK"] }) }), _jsx("td", { className: "py-3 px-4", children: _jsxs("span", { className: "text-blue-600", children: ["$", rate.price_usd?.toFixed(2) || '0.00', " USD"] }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("span", { className: "px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs", children: rate.region }) }), _jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleEditRate(rate), children: _jsx(Edit, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleDeleteRate(rate.id), className: "text-red-600 hover:text-red-700", children: _jsx(Trash2, { className: "w-4 h-4" }) })] }) })] }, rate.id))) })] }) }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: rates.length }), _jsx("div", { className: "text-sm text-gray-600", children: "Total Countries / \u1005\u102F\u1005\u102F\u1015\u1031\u102B\u1004\u103A\u1038 \u1014\u102D\u102F\u1004\u103A\u1004\u1036\u1019\u103B\u102C\u1038" })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: [...new Set(rates.map(r => r.region))].length }), _jsx("div", { className: "text-sm text-gray-600", children: "Regions Covered / \u1012\u1031\u101E\u1019\u103B\u102C\u1038" })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-orange-600", children: rates.length > 0 ? Math.round(rates.reduce((sum, r) => sum + r.price_mmk, 0) / rates.length).toLocaleString() : 0 }), _jsx("div", { className: "text-sm text-gray-600", children: "Avg Price MMK / \u1015\u103B\u1019\u103A\u1038\u1019\u103B\u103E \u1008\u1031\u1038\u1014\u103E\u102F\u1014\u103A\u1038" })] }) }) })] })] }));
}
