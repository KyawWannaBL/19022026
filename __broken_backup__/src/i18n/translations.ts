 * © 2026 Production Final
 */

export const MYANMAR_DICTIONARY: Record<string, string> = {
  "Secure Terminal": "လုံခြုံရေး တာမီနယ်",
  "Invalid API key": "မမှန်ကန်သော API Key",
  "Identity (Email)": "အကောင့်အမည် (အီးမေးလ်)",
  "Security Key": "လျှို့ဝှက်စကားဝှက်",
  "Initiate Session": "စတင်ဝင်ရောက်မည်",
  "Verifying...": "စစ်ဆေးနေသည်…",
  "Access Denied. Please check credentials.": "ဝင်ရောက်ခွင့်မပြုပါ။ အထောက်အထားများကို ပြန်လည်စစ်ဆေးပါ။",
  "Logout": "ထွက်မည်",
  "Role": "အခန်းကဏ္ဍ",
  "Dashboard": "ဒက်ရှ်ဘုတ်",
  "Executive Dashboard": "အမှုဆောင် ဒက်ရှ်ဘုတ်",
  "Operations": "လည်ပတ်ရေး",
  "Shipment Registration": "ပို့ဆောင်မှု မှတ်ပုံတင်ခြင်း",
  "Shipments": "ပို့ဆောင်မှုများ",
  "Substation": "ခွဲစခန်း",
  "Finance": "ငွေကြေး",
  "Human Resources": "လူ့စွမ်းအားအရင်းအမြစ်",
  "Marketing": "စျေးကွက်ရေးရာ",
  "User Management": "အသုံးပြုသူ စီမံခန့်ခွဲမှု",
  "Role Management": "အခန်းကဏ္ဍ စီမံခန့်ခွဲမှု",
  "System Settings": "စနစ် ဆက်တင်များ",
  "Audit Logs": "စစ်ဆေးမှတ်တမ်းများ",
  "Reports": "အစီရင်ခံစာများ",
  "Unauthorized": "ခွင့်မပြုပါ",
  "Set New Password": "စကားဝှက်အသစ် သတ်မှတ်ရန်",
  "Passwords don't match": "စကားဝှက်များ မကိုက်ညီပါ",
  "Password must be at least 8 characters": "စကားဝှက်သည် အနည်းဆုံး ၈ လုံး ရှိရမည်",
  "Update Password": "စကားဝှက် ပြောင်းရန်",
  "Signed in as": "ဝင်ရောက်ထားသူ",
  "Loading session…": "ဆက်ရှင်ကို တင်နေသည်…",
  "Quick links": "အမြန်လင့်များ",
  "Open module": "မော်ဂျူး ဖွင့်ရန်",
  "Save": "သိမ်းဆည်းရန်",
  "Cancel": "ပယ်ဖျက်ရန်",
  "Submit": "တင်သွင်းရန်",
  "Search": "ရှာဖွေရန်",
  "Create Account": "အကောင့် ဖန်တီးရန်",
  "Sign up": "စာရင်းသွင်းရန်",
  "Forgot Password": "စကားဝှက် မေ့နေခြင်း",
  "New Password": "စကားဝှက်အသစ်",
  "Confirm Password": "စကားဝှက် အတည်ပြုရန်",
  "Registration Queue": "မှတ်ပုံတင် တန်းစီစာရင်း",
  "Rider Dashboard": "မောင်းသူ ဒက်ရှ်ဘုတ်",
  "Pickup Flow": "ယူဆောင်မှု လုပ်ငန်းစဉ်",
  "Delivery Flow": "ပို့ဆောင်မှု လုပ်ငန်းစဉ်",
  "Warehouse Drop": "ဂိုဒေါင် အပ်နှံခြင်း",
  "Receiving Bay": "လက်ခံစခန်း",
  "Dispatch Management": "ထုတ်လွှတ် စီမံခန့်ခွဲမှု",
  "Tracking Map": "ခြေရာခံ မြေပုံ",
  "Customer Portal": "ဖောက်သည် ပေါ်တယ်",
  "Merchant Portal": "ကုန်သည် ပေါ်တယ်",
  "Shipping Calculator": "ပို့ခ တွက်ချက်ရန်"
};

export function dictLookup(text: string): string | null {
  const t = text?.trim();
  if (!t) return null;
  return MYANMAR_DICTIONARY[t] || null;
}