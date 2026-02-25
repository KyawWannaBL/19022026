import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Camera, Lock, MapPin, Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ROUTE_PATHS } from '@/lib/index';
import { useAuth } from '@/hooks/useFirebaseAuth';
export default function CustomerProfile() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        shopName: user?.full_name || 'Kyaw Wannanna',
        ownerName: 'Kyaw Wannanna',
        phone: user?.phone || '09897447744',
        email: user?.email || '',
        address: 'No. 277, Corner of Anawrahta Road and Bo Moe Gyo St.',
        township: 'East Dagon',
        city: 'Yangon',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const handleProfileSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        alert('Profile Updated Successfully!');
        setIsEditing(false);
    };
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New passwords do not match!');
            return;
        }
        // Here you would typically send the data to your backend
        alert('Password Updated Successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    const handlePasswordChange = (field, value) => {
        setPasswordData(prev => ({ ...prev, [field]: value }));
    };
    return (_jsxs("div", { className: "max-w-4xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { variant: "outline", size: "icon", onClick: () => navigate(ROUTE_PATHS.CUSTOMER_DASHBOARD), children: _jsx(ArrowLeft, { className: "w-4 h-4" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Account Settings" }), _jsx("p", { className: "text-gray-600", children: "Manage your profile and account preferences" })] })] }), _jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "space-y-6", children: [_jsx(Card, { children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsxs("div", { className: "relative inline-block mb-4", children: [_jsxs(Avatar, { className: "w-32 h-32 border-4 border-gray-200", children: [_jsx(AvatarImage, { src: user?.avatar_url }), _jsx(AvatarFallback, { className: "bg-primary/20 text-primary text-2xl font-bold", children: formData.shopName.split(' ').map((n) => n[0]).join('') })] }), _jsx(Button, { size: "icon", className: "absolute bottom-0 right-0 rounded-full bg-gold hover:bg-gold/90 text-navy-900", children: _jsx(Camera, { className: "w-4 h-4" }) })] }), _jsx("h3", { className: "text-xl font-bold text-gray-900", children: formData.shopName }), _jsx("p", { className: "text-gray-600 text-sm", children: "Online Shop Member" }), _jsxs(Button, { variant: "outline", size: "sm", className: "mt-4", onClick: () => document.getElementById('imageUpload')?.click(), children: [_jsx(Camera, { className: "w-4 h-4 mr-2" }), "Upload New Photo"] }), _jsx("input", { id: "imageUpload", type: "file", accept: "image/*", className: "hidden" })] }) }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Lock, { className: "w-5 h-5" }), "Security"] }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handlePasswordSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "currentPassword", children: "Current Password" }), _jsx(Input, { id: "currentPassword", type: "password", value: passwordData.currentPassword, onChange: (e) => handlePasswordChange('currentPassword', e.target.value) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "newPassword", children: "New Password" }), _jsx(Input, { id: "newPassword", type: "password", value: passwordData.newPassword, onChange: (e) => handlePasswordChange('newPassword', e.target.value) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "confirmPassword", children: "Confirm Password" }), _jsx(Input, { id: "confirmPassword", type: "password", value: passwordData.confirmPassword, onChange: (e) => handlePasswordChange('confirmPassword', e.target.value) })] }), _jsx(Button, { type: "submit", className: "w-full bg-navy-900 hover:bg-navy-800", children: "Update Password" })] }) })] })] }), _jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(User, { className: "w-5 h-5" }), "Shop Information"] }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setIsEditing(!isEditing), children: isEditing ? 'Cancel' : 'Edit' })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleProfileSubmit, className: "space-y-4", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "shopName", children: "Shop Name / Full Name" }), _jsx(Input, { id: "shopName", value: formData.shopName, onChange: (e) => handleInputChange('shopName', e.target.value), readOnly: !isEditing, className: !isEditing ? 'bg-gray-50' : '' })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "ownerName", children: "Owner Name (Contact)" }), _jsx(Input, { id: "ownerName", value: formData.ownerName, onChange: (e) => handleInputChange('ownerName', e.target.value), readOnly: !isEditing, className: !isEditing ? 'bg-gray-50' : '' })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "phone", children: "Phone Number" }), _jsx(Input, { id: "phone", value: formData.phone, readOnly: true, className: "bg-gray-50" }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Phone number is your Login ID (Contact Admin to change)." })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "email", children: "Email Address" }), _jsx(Input, { id: "email", type: "email", placeholder: "shop@email.com", value: formData.email, onChange: (e) => handleInputChange('email', e.target.value), readOnly: !isEditing, className: !isEditing ? 'bg-gray-50' : '' })] })] }), isEditing && (_jsx("div", { className: "flex justify-end", children: _jsxs(Button, { type: "submit", className: "bg-gold hover:bg-gold/90 text-navy-900", children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), "Save Changes"] }) }))] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-5 h-5" }), "Default Pickup Address"] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-gray-600 text-sm mb-4", children: "This address will be auto-filled when you book a new shipment." }), _jsxs("form", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "address", children: "Street Address" }), _jsx(Textarea, { id: "address", rows: 2, value: formData.address, onChange: (e) => handleInputChange('address', e.target.value), readOnly: !isEditing, className: !isEditing ? 'bg-gray-50' : '' })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "township", children: "Township" }), _jsxs(Select, { value: formData.township, onValueChange: (value) => handleInputChange('township', value), disabled: !isEditing, children: [_jsx(SelectTrigger, { className: !isEditing ? 'bg-gray-50' : '', children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "East Dagon", children: "East Dagon" }), _jsx(SelectItem, { value: "North Dagon", children: "North Dagon" }), _jsx(SelectItem, { value: "South Dagon", children: "South Dagon" }), _jsx(SelectItem, { value: "Thingangyun", children: "Thingangyun" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "city", children: "City" }), _jsxs(Select, { value: formData.city, onValueChange: (value) => handleInputChange('city', value), disabled: !isEditing, children: [_jsx(SelectTrigger, { className: !isEditing ? 'bg-gray-50' : '', children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Yangon", children: "Yangon" }), _jsx(SelectItem, { value: "Mandalay", children: "Mandalay" })] })] })] })] }), isEditing && (_jsx("div", { className: "flex justify-end", children: _jsx(Button, { variant: "outline", children: "Update Address Only" }) }))] })] })] })] })] })] }));
}
