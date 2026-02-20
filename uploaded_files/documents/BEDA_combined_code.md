<!-- Page: 1 -->

# BEDA - Combined Source Code

Generated: 2026-02-18 01:07 (Asia/Yangon)

Files included: 221

Approx. lines (after wrapping): 38,997

This PDF contains the concatenated contents of all text/code files from the provided ZIP, in alphabetical path order. Long lines are wrapped for readability.

<!-- BEDA - Combined Source Code -->

Page 1

<!-- Page: 2 -->

## Included files

.env.local

scripts/seedDatabase.ts

src/api/demo.ts

src/App.tsx

src/assets/images.ts

src/capacitor.config.ts

src/ChangePassword.tsx

src/components/AuditFeed.tsx

src/components/BranchMetrics.tsx

src/components/DataEntryForm.tsx

src/components/DeliveryExceptionHandler.tsx

src/components/ErrorBoundary.tsx

src/components/FleetStatus.tsx

src/components/Layout.tsx

p y src/components/NotificationBell.tsx

src/components/OperationalManual.tsx

src/components/PermissionGate.tsx

src/components/PermissionGuard.tsx

src/components/PhotoCapture.tsx

src/components/QRScanner.tsx

src/components/RealTimeMapView.tsx

src/components/RevenueForecast.tsx

src/components/RoleBasedRoute.tsx

src/components/RoutePlanner.tsx

src/components/Shipments.tsx

src/components/ShippingCalculator.tsx

src/components/SignaturePad.tsx

src/components/StatusBadge.tsx

src/components/ui/accordion.tsx

src/components/ui/alert-dialog.tsx

src/components/ui/alert.tsx

src/components/ui/aspect-ratio.tsx

src/components/ui/avatar.tsx

src/components/ui/badge.tsx

src/components/ui/breadcrumb.tsx

src/components/ui/button.tsx

src/components/ui/calendar.tsx

src/components/ui/card.tsx

src/components/ui/carousel.tsx

src/components/ui/chart.tsx

src/components/ui/checkbox.tsx

src/components/ui/collapsible.tsx

src/components/ui/command.tsx

src/components/ui/context-menu.tsx

src/components/ui/dialog.tsx

src/components/ui/drawer.tsx

src/components/ui/dropdown-menu.tsx

src/components/ui/form.tsx

src/components/ui/hover-card.tsx

src/components/ui/input-otp.tsx

src/components/ui/input.tsx

src/components/ui/label.tsx

src/components/ui/menubar.tsx

src/components/ui/navigation-menu.tsx

src/components/ui/pagination.tsx

src/components/ui/popover.tsx

src/components/ui/progress.tsx

src/components/ui/radio-group.tsx

src/components/ui/resizable.tsx

src/components/ui/scroll-area.tsx

src/components/ui/select.tsx

src/components/ui/separator.tsx

src/components/ui/sheet.tsx

src/components/ui/sidebar.tsx

src/components/ui/skeleton.tsx

src/components/ui/slider.tsx

src/components/ui/sonner.tsx

<!-- BEDA - Combined Source Code -->

Page 2

<!-- Page: 3 -->

src/components/ui/switch.tsx src/components/ui/table.tsx src/components/ui/tabs.tsx src/components/ui/textarea.tsx src/components/ui/toast.tsx src/components/ui/toaster.tsx src/components/ui/toggle-group.tsx src/components/ui/toggle.tsx src/components/ui/tooltip.tsx src/components/ui/use-toast.ts src/config/navigation.ts src/config/rolesidebar.ts src/dataconnect-generated/.guides/config.json

src/components/ui/switch.tsx src/components/ui/table.tsx src/components/ui/tabs.tsx src/components/ui/textarea.tsx src/components/ui/toast.tsx src/components/ui/toaster.tsx src/components/ui/toggle-group.tsx src/components/ui/toggle.tsx src/components/ui/tooltip.tsx src/components/ui/use-toast.ts src/config/navigation.ts src/config/rolesidebar.ts src/dataconnect-generated/.guides/config.json src/dataconnect-generated/.guides/setup.md src/dataconnect-generated/.guides/usage.md src/dataconnect-generated/esm/index.esm.js src/dataconnect-generated/esm/package.json src/dataconnect-generated/index.cjs.js src/dataconnect-generated/index.d.ts src/dataconnect-generated/package.json src/dataconnect-generated/react/esm/index.esm.js src/dataconnect-generated/react/esm/package.json src/dataconnect-generated/react/index.cjs.js src/dataconnect-generated/react/index.d.ts src/dataconnect-generated/react/package.json src/dataconnect-generated/react/README.md src/dataconnect-generated/README.md src/downloadAPK.tsx src/ForcePasswordReset.tsx src/global.css src/hooks/use-mobile.ts src/hooks/use-toast.ts src/hooks/useAuth.tsx src/hooks/usePermission.ts src/hooks/useRealtimeMetrics.ts src/hooks/useSessionHeartBeat.ts src/hooks/useTamperTags.ts src/index.css src/lib/admin-system.ts src/lib/audit.ts src/lib/index.ts src/lib/legacy-user.ts src/lib/motion.ts src/lib/supabase.ts src/lib/utils.ts src/main.tsx src/pages/AdminDashboard.tsx src/pages/AdminUsers.tsx src/pages/ApprovalQueue.tsx src/pages/approvals/ApprovalQueue.tsx src/pages/AuditLogs.tsx src/pages/backend.ts src/pages/BRITIUM ENTERPRISE/KEYS.txt src/pages/ChangePassword.tsx src/pages/ControlRoom.tsx src/pages/CourierApp.tsx src/pages/customer/CustomerPortal.tsx src/pages/customer/CustomerSupport.tsx src/pages/Dashboard.tsx src/pages/deliveries/deliveryId.txt src/pages/EnterprisePortal.tsx src/pages/Finance.tsx src/pages/ForcePasswordReset.tsx src/pages/groupshipments/groupShipmentId.txt src/pages/home/components/Demo.tsx src/pages/home/Index.tsx src/pages/HubOperations.tsx src/pages/HumanResources.tsx

<!-- BEDA - Combined Source Code -->

Page 3

<!-- Page: 4 -->

src/pages/index.tsx src/pages/kpichartcomponents.tsx src/pages/LandingPage.tsx src/pages/Login.tsx src/pages/ManualPage.tsx src/pages/Marketing.tsx src/pages/marketing/CampaignManager.tsx src/pages/marketing/MarketingDashboard.tsx src/pages/merchant/MerchantAnalytics.tsx src/pages/merchant/MerchantPortal.tsx src/pages/not-found/Index.tsx src/pages/office/RegistrationQueue.tsx src/pages/office/ShipmentRegistration.tsx src/pages/Operations.tsx src/pages/PermissionAssignment.tsx src/pages/QROperations.tsx src/pages/react-signature-canvas.tsx src/pages/RealTimeMapView.tsx src/pages/Reports.tsx src/pages/rider/Dashboard.tsx src/pages/rider/DeliveryFlow.tsx src/pages/rider/kpichartcomponents.tsx src/pages/rider/LabelActivation.tsx src/pages/rider/PickupFlow.tsx src/pages/rider/RiderDashboardSidecar.tsx

src/pages/rider/ShippingCalculator.tsx src/pages/rider/TagBatchManagement.tsx src/pages/rider/WarehouseDrop.tsx src/pages/RoleManagement.tsx src/pages/service/CustomerServiceDashboard.tsx src/pages/service/LiveChatInterface.tsx src/pages/ShipmentLifecycle.tsx src/pages/Shipments.tsx src/pages/SubmitForApproval.tsx src/pages/Substation.tsx src/pages/substation/SubstationReceiving.tsx src/pages/supervisor/AuditDashboard.tsx src/pages/supervisor/TagInventoryManagement.tsx src/pages/supervisor/TrackingMapPage.tsx src/pages/SystemSettings.tsx src/pages/Unauthorized.tsx src/pages/UserManagement.tsx src/pages/warehouse/DispatchManagement.tsx src/pages/warehouse/ReceivingBay.tsx src/postcss.config.js src/supabaseClient.ts src/tailwind.config.js src/types/roles.ts src/vite-env.d.ts supabase/.branches/_current_branch supabase/.gitignore supabase/.temp/cli-latest supabase/.temp/gotrue-version supabase/.temp/pooler-url supabase/.temp/postgres-version supabase/.temp/project-ref supabase/.temp/rest-version supabase/.temp/storage-migration supabase/.temp/storage-version supabase/config.toml supabase/edge_function/deno.json supabase/edge_function/deps.ts supabase/edge_function/tests/env.example supabase/edge_function/tests/README.md supabase/functions/hello-world/.npmrc supabase/functions/hello-world/deno.json supabase/functions/hello-world/index.ts supabase/functions/reset-accounts/index.ts

<!-- BEDA - Combined Source Code -->

Page 4

<!-- Page: 5 -->

- supabase/functions/seed-users/index.ts

- supabase/functions/set-role-claim/createUsers.js

- supabase/functions/set-role-claim/index.ts

- supabase/functions/set-role-claim/useraccount.csv

- p supabase/migrations/20260213000000_express_delivery_schema.sql

- supabase/migrations/20260214190435_remote_schema.sql

- uploaded_files/documents/BE_app_pages.md

- uploaded files/files index.json

- p _ _ j uploaded_files/source_files/Exception_Codebook_source_info.json

- uploaded files/source files/Field Level Authority source info.json

- _ _ _ _ _ _ uploaded_files/source_files/Ops_Manual_Config_Pack_v1_source_info.json

- uploaded_files/source_files/RBAC_RolePermissions_source_info.json

- uploaded_files/source_files/RBAC_Roles_source_info.json

- uploaded files/tables/Exception Codebook parsed.md

- _ _ _ uploaded files/tables/Field Level Authority parsed.md

- _ _ _ _ uploaded files/tables/Ops Manual Config Pack v1 parsed.md

- uploaded_files/tables/RBAC_RolePermissions_parsed.md

- uploaded_files/tables/RBAC_Roles_parsed.md

<!-- BEDA - Combined Source Code -->

Page 5

<!-- Page: 6 -->

<!-- .env.local -->

VITE_SUPABASE_URL=https://dltavabvjwocknkyvwgz.supabase.co

_ _ VITE_SUPABASE_ANON_KEY=sb_publishable_x1RtZqu_R4UNjwKAZWyQ3w_iU5ct4m3

_ _ _ _ VITE_SITE_URL=http://localhost:5173

VITE_APK_URL=/app/britium-express.apk

<!-- BEDA - Combined Source Code -->

Page 6

<!-- Page: 7 -->

```
scripts/seedDatabase.ts

import { initializeApp } from 'Firebase/app';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'Firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'Firebase/auth';

// Firebase configuration (use your actual config)
const FirebaseConfig = {
    apiKey: "demo-api-key",
    authDomain: "express-delivery-demo.FirebaseApp.com",
    projectId: "express-delivery-demo",
    storageBucket: "express-delivery-demo.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Sample users data
const sampleUsers = [
    {
        id: 'admin-001',
        email: 'admin@expressdelivery.com',
        password: 'admin123',
        name: 'System Administrator',
        role: 'admin',
        position: 'system_admin',
        status: 'active',
        branch_location: 'HQ',
        phone: '+1234567890',
    },
    {
        id: 'manager-001',
        email: 'manager@expressdelivery.com',
        password: 'manager123',
        name: 'Branch Manager',
        role: 'manager',
        position: 'branch_manager',
        status: 'active',
        branch_location: 'Branch-001',
        phone: '+1234567891',
    },
    {
        id: 'rider-001',
        email: 'rider1@expressdelivery.com',
        password: 'rider123',
        name: 'John Rider',
        role: 'rider',
        position: 'delivery_rider',
        status: 'active',
        branch_location: 'Branch-001',
        phone: '+1234567892',
    },
    {
        id: 'warehouse-001',
        email: 'warehouse@expressdelivery.com',
        password: 'warehouse123',
        name: 'Warehouse Staff',
        role: 'warehouse',
        position: 'warehouse_operator',
        status: 'active',
        branch_location: 'Branch-001',
        phone: '+1234567893',
    },
    {
        id: 'dispatch-001',
        email: 'dispatch@expressdelivery.com',
        password: 'dispatch123',
        name: '箭'
    }
];
```

<!-- BEDA - Combined Source Code -->

Page 7

<!-- Page: 8 -->

```
name: 'Dispatch Coordinator',
role: 'dispatch',
position: 'dispatch_coordinator',
status: 'active',
branch_location: 'Branch-001',
phone: '+1234567894',
},
{
  id: 'cs-001',
  email: 'cs@expressdelivery.com',
  password: 'cs123',
  name: 'Customer Service',
  role: 'customer_service',
  position: 'customer_service_rep',
  status: 'active',
  branch_location: 'Branch-001',
  phone: '+1234567895',
},
];

// Sample shipments data
const sampleShipments = [
{
  awb: 'EDS2026011001',
  status: 'created',
  sender: {
    name: 'Alice Johnson',
    addressLine1: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    phone: '+1234567896',
  },
  receiver: {
    name: 'Bob Smith',
    addressLine1: '456 Oak Ave',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    country: 'USA',
    phone: '+1234567897',
  },
  serviceType: 'Express',
  weight: 2.5,
  dimensions: {
    length: 30,
    width: 20,
    height: 15,
  },
  volumetricWeight: 1.8,
  codAmount: 0,
  currency: 'USD',
  isPaid: true,
  estimatedDelivery: new Date(Date.now() + 86400000 * 2).toISOString(),
  history: [
    {
      status: 'created',
      timestamp: new Date().toISOString(),
      location: 'Branch-001',
      notes: 'Shipment created',
      userId: 'cs-001',
    }
  ],
  createdBy: 'cs-001',
},
{
  awb: 'EDS2026011002',
  status: 'picked_up',
  sender: {
```

<!-- BEDA - Combined Source Code -->

Page 8

<!-- Page: 9 -->

```
name: 'Carol Davis',
addressLine1: '789 Pine St',
city: 'Chicago',
state: 'IL',
zipCode: '60601',
country: 'USA',
phone: '+1234567898',
},
receiver: {
    name: 'David Wilson',
    addressLine1: '321 Elm St',
    city: 'Houston',
    state: 'TX',
    zipCode: '77001',
    country: 'USA',
    phone: '+1234567899',
},
serviceType: 'Standard',
weight: 1.2,
dimensions: {
    length: 25,
    width: 15,
    height: 10,
},
volumetricWeight: 0.75,
codAmount: 150.00,
currency: 'USD',
isPaid: false,
estimatedDelivery: new Date(Date.now() + 86400000 * 3).toISOString();
assigned_rider: 'rider-001',
history: [
    {
        status: 'created',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        location: 'Branch-001',
        notes: 'Shipment created',
        userId: 'cs-001',
    },
    {
        status: 'picked_up',
        timestamp: new Date().toISOString(),
        location: 'Pickup Location',
        notes: 'Package picked up by rider',
        userId: 'rider-001',
    }
],
createdBy: 'cs-001',
},
async function seedDatabase() {
    console.log('Starting database seeding...');

    try {
        // Create users
        console.log('Creating users...');
        for (const userData of sampleUsers) {
            try {
                // Create Firebase Auth user
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    userData.email,
                    userData.password
                );
                // Create Firestore user document
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    name: userData.name,
                    email: userData.email,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.role,
                    role: userData.
```

<!-- BEDA - Combined Source Code -->

Page 9

<!-- Page: 10 -->

```
position: userData.position,
status: userData.status,
branch_location: userData.branch_location,
phone: userData.phone,
createdAt: serverTimestamp(),
updatedAt: serverTimestamp(),
});

console.log('Created user: ${userData.name} (${userData.email})');
} catch (error) {
    console.error('Failed to create user ${userData.email}:', error);
}

// Create shipments
console.log('Creating shipments...');
for (let i = 0; i < sampleShipments.length; i++) {
    const shipmentData = sampleShipments[i];
    const shipmentRef = doc(collection(db, 'shipments%（}})
        await setDoc(shipmentRef, {
            ...shipmentData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        console.log('Created shipment: ${shipmentData.awb}');
    }
    console.log('Database seeding completed successfully!');
    console.log('Sample Login Credentials:');
    console.log('Admin: admin@expressdelivery.com / admin123');
    console.log('Manager: manager@expressdelivery.com / manager123');
    console.log('Rider: rider1@expressdelivery.com / rider123');
    console.log('Warehouse: warehouse@expressdelivery.com / warehouse123');
    console.log('Dispatch: dispatch@expressdelivery.com / dispatch123');
    console.log('Customer Service: cs@expressdelivery.com / cs123');
} catch (error) {
    console.error('Database seeding failed:', error);
}

// Run the seeding script
seedDatabase();
```

<!-- BEDA - Combined Source Code -->

Page 10

<!-- Page: 11 -->

```
src/api/demo.ts

import axios from "axios";

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface CreateUserRequest {
    name: string;
    email: string;
}

// GET
export const getUser = async (id: number): Promise<User> => {
    const response = await axios.get<User>('https://api.example.com/api/users/\${id}');
    return response.data;
};

// POST
export const createUser = async (data: CreateUserRequest): Promise<User> => {
    const response = await axios.post<User>("https://api.example.com/api/users", data);
    return response.data;
};

// supabase
// export const getUserById = async (id: number): Promise<User | null> => {
    const { data, error } = await supabase;
    // .from("users")
    // .select("*")
    // .eq("id", id)
    // .single();

// if (error) return null;
// return data as User;
// };
```

<!-- BEDA - Combined Source Code -->

Page 11

<!-- Page: 12 -->

```
src/App.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import {
    EnterprisePortal,
    Login,
    Dashboard,
    AdminDashboard,
    Operations,
    Finance,
    HumanResources,
    Marketing,
    Substation,
    RoleManagement,
    UserManagement,
    SystemSettings,
    AuditLogs,
    Reports,
    Unauthorized,
    ForcePasswordReset,
    ChangePassword
} from './pages';
import Layout from './components/Layout';
import RoleBasedRoute from './components/RoleBasedRoute';
import { useAuth } from './hooks/useAuth';

/**
 * Main Application Component
 * Handles global routing, authentication state, and role-based access control.
 */
function App() {
    const { loading } = useAuth();

    // Show a centralized loading state while checking Supabase session
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-900">
                <div className="relative h-16 w-16">
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500 ... border-t-transparent animate-spin"></div>
                </div>
            );
        }
    }

    return (
        <Routes>
            {/* --- Public Access Routes --- */}
            <Route path="/" element={<EnterprisePortal />} />
            <Route path="/portal" element={<EnterprisePortal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/force-password-reset" element={<ForcePasswordReset />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* --- Private Enterprise Routes (Requires Auth & Layout) --- */}
            <Route element={<Layout />}
            {/* General Dashboard (Base access) */}
            <Route path="/dashboard" element={<RoleBasedRoute> <Dashboard /> <RoleBasedRoute>
                {/* Master Admin Mission Control */}
            }
        }
    }
);
```

<!-- BEDA - Combined Source Code -->

Page 12

<!-- Page: 13 -->

```
<Route 
    path="/admin/dashboard"
    element={
        <RoleBasedRoute allowedRoles={['SUPER_ADMIN']}>
            <AdminDashboard />
        </RoleBasedRoute>
    }
</Route>

{/* Logistics & Supply Chain */}

<Route 
    path="/operations"
    element={
        <RoleBasedRoute allowedRoles={['SUPER_ADMIN', 'OPERATIONS_ADMIN', ... 'OPERATIONS_STAFF']}>
            <Operations />
            <RoleBasedRoute>
                <Route 
                    path="/substation"
                    element={
                        <RoleBasedRoute allowedRoles={['SUPER_ADMIN', 'SUBSTATION_MANAGER']}>
                            <Substation />
                        </RoleBasedRoute>
                    </Route>
                </Route>
            </RoleBasedRoute>
        </RoleBasedRoute>
    </Route>

{/* Revenue & Growth */}

<Route 
    path="/finance"
    element={
        <RoleBasedRoute allowedRoles={['SUPER_ADMIN', 'FINANCE_ADMIN', 'FINANCE_STAFF', ... 'FINANCE_USER']}>
            <Finance />
            <RoleBasedRoute>
                <Route 
                    path="/marketing"
                    element={
                        <RoleBasedRoute allowedRoles={['SUPER_ADMIN', 'MARKETING_ADMIN', 'MARKETING']}>
                            <Marketing />
                        </RoleBasedRoute>
                    </Route>
                </Route>
            </RoleBasedRoute>
        </RoleBasedRoute>
    </Route>

{/* Personnel & Administration */}

<Route 
    path="/hr"
    element={
        <RoleBasedRoute allowedRoles={['SUPER_ADMIN', 'HR_ADMIN']}>
            <HumanResources />
            <RoleBasedRoute>
                <Route 
                    path="/admin/users"
                    element={
                        <RoleBasedRoute allowedRoles={['SUPER_ADMIN']}>
                            <UserManagement />
                        </RoleBasedRoute>
                    </Route>
                </Route>
            </RoleBasedRoute>
        </RoleBasedRoute>
    </Route>

<Route 
    path="/admin/roles"
    element={
        <RoleBasedRoute allowedRoles={['SUPER_ADMIN']}>
            <UserManagement />
        </RoleBasedRoute>
    </Route>
</Route>
```

<!-- BEDA - Combined Source Code -->

Page 13

<!-- Page: 14 -->

```
element={
    <RoleBasedRoute allowedRoles={['SUPER_ADMIN']}>
        <RoleManagement />
    </RoleBasedRoute>
}

<Route
    path="/admin/settings"
    element={
        <RoleBasedRoute allowedRoles={['SUPER_ADMIN']}>
            <SystemSettings />
        </RoleBasedRoute>
    }
}

<Route
    path="/admin/audit"
    element={
        <RoleBasedRoute allowedRoles={['SUPER_ADMIN']}>
            <AuditLogs />
        </RoleBasedRoute>
    }
}

{/* Data & Analytics */}
<Route
    path="/reports"
    element={
        <RoleBasedRoute allowedRoles={['SUPER_ADMIN', 'OPERATIONS_ADMIN', ... 'FINANCE_ADMIN']}>
            <Reports />
        </RoleBasedRoute>
    }
}

</Route>

{/* --- Fallback Route --- */}
<Route path="*" element={<Navigate to="/dashboard" replace />}>
</Routes>

export default App;
```

## export default App;

<!-- BEDA - Combined Source Code -->

Page 14

<!-- Page: 15 -->

## src/assets/images.ts

## // Do not edit manually

<!-- BEDA - Combined Source Code -->

Page 15

<!-- Page: 16 -->

- ... VufDB8MHx8fDE3NzA4MTkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",

- y q , DELIVERY_TRUCK_2: "https://images.unsplash.com/photo-1587813369290-091c9d432daf?crop=entropy ... &cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDU2OTd8MHwxfHNlYXJjaHwzfHxkZWxpdmVyeSUyMHRydWNrfGV ... ufDB8MHx8fDE3NzA4MTkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",

- DELIVERY_TRUCK_3: "https://images.unsplash.com/photo-1600320254374-ce2d293c324e?crop=entropy ... &cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDU2OTd8MHwxfHNlYXJjaHwxMHx8ZGVsaXZlcnklMjB0cnVja3x ... lbnwwfDB8fHwxNzcwODE5MjE3fDA&ixlib=rb-4.1.0&q=80&w=1080",

- j q DELIVERY_TRUCK_4: "https://images.unsplash.com/photo-1611746351408-c0a1346be8e8?crop=entropy ... &cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDU2OTd8MHwxfHNlYXJjaHw4fHxkZWxpdmVyeSUyMHRydWNrfGV ... ufDB8MHx8fDE3NzA4MTkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",

- DELIVERY_TRUCK_5: "https://images.unsplash.com/photo-1594960598451-f8509775168b?crop=entropy ... &cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDU2OTd8MHwxfHNlYXJjaHw3fHxkZWxpdmVyeSUyMHRydWNrfGV ... ufDB8MHx8fDE3NzA4MTkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",

- DELIVERY_TRUCK_6: "https://images.unsplash.com/photo-1614976523626-d598aafd4fda?crop=entropy ... &cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDU2OTd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHRydWNrfGV ... ufDB8MHx8fDE3NzA4MTkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",

- DELIVERY_TRUCK_7: "https://images.unsplash.com/photo-1647702504702-6b3dc40eafe5?crop=entropy ... &cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDU2OTd8MHwxfHNlYXJjaHw2fHxkZWxpdmVyeSUyMHRydWNrfGV ... ufDB8MHx8fDE3NzA4MTkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",

- DELIVERY_TRUCK_8: "https://images.unsplash.com/photo-1665521032636-e8d2f6927053?crop=entropy ... &cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDU2OTd8MHwxfHNlYXJjaHw0fHxkZWxpdmVyeSUyMHRydWNrfGV ... ufDB8MHx8fDE3NzA4MTkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",

- y q DELIVERY_TRUCK_9: "https://images.unsplash.com/photo-1627019866926-b6030ff785fe?crop=entropy ... &cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDU2OTd8MHwxfHNlYXJjaHwyfHxkZWxpdmVyeSUyMHRydWNrfGV ... ufDB8MHx8fDE3NzA4MTkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080", SCREENSHOT3627 49 "/i /S h t3627 "

- _ g p g TRACKING_1: "https://images.unsplash.com/photo-1618381297523-e6c0ab13a5b2?crop=entropy&cs=ti ... nysrgb&fit=max&fm=jpg&ixid=M3w4MTk0NTh8MHwxfHNlYXJjaHw4fHxwYWNrYWdlJTIwdHJhY2tpbmd8ZW58M ... HwwfHx8MTc3MDgxOTIxOHww&ixlib=rb-4.1.0&q=80&w=1080",

- TRACKING_2: "https://images.unsplash.com/photo-1582668155461-b6c27ceca8c3?crop=entropy&cs=ti ... nysrgb&fit=max&fm=jpg&ixid=M3w4MTk0NTh8MHwxfHNlYXJjaHw0fHxwYWNrYWdlJTIwdHJhY2tpbmd8ZW58M ... HwwfHx8MTc3MDgxOTIxOHww&ixlib=rb-4.1.0&q=80&w=1080",

- TRACKING_3: "https://images.unsplash.com/photo-1631010231931-d2c396b444ec?crop=entropy&cs=ti ... nysrgb&fit=max&fm=jpg&ixid=M3w4MTk0NTh8MHwxfHNlYXJjaHw2fHxwYWNrYWdlJTIwdHJhY2tpbmd8ZW58M ... HwwfHx8MTc3MDgxOTIxOHww&ixlib=rb-4.1.0&q=80&w=1080",

- TRACKING_4: "https://images.unsplash.com/photo-1647221597996-54f3d0f73809?crop=entropy&cs=ti ... nysrgb&fit=max&fm=jpg&ixid=M3w4MTk0NTh8MHwxfHNlYXJjaHwzfHxwYWNrYWdlJTIwdHJhY2tpbmd8ZW58M ... HwwfHx8MTc3MDgxOTIxOHww&ixlib=rb-4.1.0&q=80&w=1080",

- g q TRACKING_5: "https://images.unsplash.com/photo-1604138290658-2bc80c707bbf?crop=entropy&cs=ti ... nysrgb&fit=max&fm=jpg&ixid=M3w4MTk0NTh8MHwxfHNlYXJjaHw3fHxwYWNrYWdlJTIwdHJhY2tpbmd8ZW58M ... HwwfHx8MTc3MDgxOTIxOHww&ixlib=rb-4.1.0&q=80&w=1080",

- TRACKING_6: "https://images.unsplash.com/photo-1758351507026-71ad3645cb43?crop=entropy&cs=ti ... nysrgb&fit=max&fm=jpg&ixid=M3w4MTk0NTh8MHwxfHNlYXJjaHwyfHxwYWNrYWdlJTIwdHJhY2tpbmd8ZW58M ... HwwfHx8MTc3MDgxOTIxOHww&ixlib=rb-4.1.0&q=80&w=1080",

- g TRACKING_7: "https://images.unsplash.com/photo-1711852700869-17004fc26e44?crop=entropy&cs=ti ... nysrgb&fit=max&fm=jpg&ixid=M3w4MTk0NTh8MHwxfHNlYXJjaHw1fHxwYWNrYWdlJTIwdHJhY2tpbmd8ZW58M ... HwwfHx8MTc3MDgxOTIxOHww&ixlib=rb-4.1.0&q=80&w=1080",

- TRACKING_8: "https://images.unsplash.com/photo-1763144536757-d90b9144e6ef?crop=entropy&cs=ti ... nysrgb&fit=max&fm=jpg&ixid=M3w4MTk0NTh8MHwxfHNlYXJjaHwxfHxwYWNrYWdlJTIwdHJhY2tpbmd8ZW58M ... HwwfHx8MTc3MDgxOTIxOHww&ixlib=rb-4.1.0&q=80&w=1080",

- WAREHOUSE_1: "https://images.unsplash.com/photo-1726776230751-183496c51f00?crop=entropy&cs=t ... inysrgb&fit=max&fm=jpg&ixid=M3w4MTk0NTh8MHwxfHNlYXJjaHwyfHx3YXJlaG91c2UlMjBvcGVyYXRpb25z ... fGVufDB8MHx8fDE3NzA4MTkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",

- WAREHOUSE_10: "https://images.unsplash.com/photo-1769701164670-e819d92cc602?crop=entropy&cs= ... tinysrgb&fit=max&fm=jpg&ixid=M3w4MTk0NTh8MHwxfHNlYXJjaHwxMHx8d2FyZWhvdXNlJTIwb3BlcmF0aW9 ... uc3xlbnwwfDB8fHwxNzcwODE5MjE3fDA&ixlib=rb-4.1.0&q=80&w=1080",

- WAREHOUSE_2: "https://images.unsplash.com/photo-1769698631158-c1f42e6281cc?crop=entropy&cs=t ... inysrgb&fit=max&fm=jpg&ixid=M3w4MTk0NTh8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBvcGVyYXRpb25z ... fGVufDB8MHx8fDE3NzA4MTkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",

- WAREHOUSE_3: "https://images.unsplash.com/photo-1768796372629-a4e7db99e474?crop=entropy&cs=t ... inysrgb&fit=max&fm=jpg&ixid=M3w4MTk0NTh8MHwxfHNlYXJjaHwzfHx3YXJlaG91c2UlMjBvcGVyYXRpb25z ... fGVufDB8MHx8fDE3NzA4MTkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",

- WAREHOUSE_4: "https://images.unsplash.com/photo-1768796373634-db43bfd5f064?crop=entropy&cs=t ... inysrgb&fit=max&fm=jpg&ixid=M3w4MTk0NTh8MHwxfHNlYXJjaHw0fHx3YXJlaG91c2UlMjBvcGVyYXRpb25z ... fGVufDB8MHx8fDE3NzA4MTkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",

- WAREHOUSE_5: "https://images.unsplash.com/photo-1768796373307-fc2f843660f8?crop=entropy&cs=t ... inysrgb&fit=max&fm=jpg&ixid=M3w4MTk0NTh8MHwxfHNlYXJjaHw1fHx3YXJlaG91c2UlMjBvcGVyYXRpb25z ... fGVufDB8MHx8fDE3NzA4MTkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",

- WAREHOUSE_6: "https://images.unsplash.com/photo-1769700821886-e10fa7946ceb?crop=entropy&cs=t ... inysrgb&fit=max&fm=jpg&ixid=M3w4MTk0NTh8MHwxfHNlYXJjaHw2fHx3YXJlaG91c2UlMjBvcGVyYXRpb25z

<!-- BEDA - Combined Source Code -->

Page 16

<!-- Page: 17 -->

export type ImageKey = keyof typeof IMAGES;

<!-- BEDA - Combined Source Code -->

Page 17

<!-- Page: 18 -->

## src/capacitor.config.ts

```
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.britiumexpress.app', // <--- This is your unique App ID
    appName: 'BEDA',
    webDir: 'dist',
    bundledWebRuntime: false
};

export default config;
```

<!-- BEDA - Combined Source Code -->

Page 18

<!-- Page: 19 -->

```
src/ChangePassword.tsx

import { useState } from "react";
import { useAuth } from @/hooks/useAuth";

export default function ChangePassword() {
    const { changePassword } = useAuth();
    const [password, setPassword] = useState();
    const [confirm, setConfirm] = useState();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.,&,&,&
            setError(null);
            if (password != confirm) return setError("Passwords do not match");
            if (password.length < 8) return setError("Minimum 8 characters required");
            try {
                await changePassword(password);
            } catch (err: any) {
                setError(err?.message ?? String(err));
            }
        };

        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-xl w-96 space-y-6 ... shadow-xl">
                    <h2 className="text-white text-xl font-bold text-center">Change Password</h2>
                    {error && <div className="text-red-400">{{error}}</div>
                }
                <input type="password" placeholder="New Password" className="w-full p-3 rounded bg-slate-800 text-white" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                    <input type="password" placeholder="Confirm Password" className="w-full p-3 rounded bg-slate-800 text-white" value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required />
                    <button className="w-full bg-emerald-600 p-3 rounded font-semibold">Update ... Password</button>
                </form>
            </div>
        );
    };
}
```

<!-- BEDA - Combined Source Code -->

Page 19

<!-- Page: 20 -->

```
src/components/AuditFeed.tsx

import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Activity, Package, Truck, CheckCircle, AlertCircle } from 'lucid-react';
import { format } from 'date-fns';

interface AuditEntry {
  id: string;
  action: string;
  table_name: string;
  changes: any;
  created_at: string;
  user_email?: string;
}

const AuditFeed = () => {
  const [logs, setLogs] = useState<AuditEntry][>([]);

  useEffect(() => {
    // 1. Initial Fetch of recent logs
    const fetchLogs = async () => {
      const { data, error } = await supabase.from('audit_log');
        select('*')
          .order('created_at', { ascending: false })
          .limit(10);
        if (!error && data) setLogs(data);
    };

    fetchLogs();

    // 2. Realtime Subscription for Luxury Updates
    const channel = supabase.channel('schema-db-changes');
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'audit_log' },
      (payload) => {
        setLogs((prev) => [payload.new as AuditEntry, ...prev].slice(0, 10));
    }
    ).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'insert': return <Package className="text-emerald-400" size={18} />;
      case 'update': return <Truck className="text-amber-400" size={18} />;
      case 'delete': return <AlertCircle className="text-rose-400" size={18} />;
      default: return <Activity className="text-blue-400" size={18} />;
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden ... shadow-2xl">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Activity size={18} className="text-indigo-400" />
          <Live Audit Feed>
            <h3>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </LiveAuditFeed>
        </div>
    </div>
  );
}
```

<!-- BEDA - Combined Source Code -->

Page 20

<!-- Page: 21 -->

```
<div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto custom-scrollbar" {logs.length > 0 ? (
    logs.map((log) => {
        <div key={log.id} className="p-4 hover:bg-white/[0.02] transition-colors group">
            <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-white/5 rounded-lg group-hover:bg-white/10 ... transition-colors">
                    {getIcon(log.action)}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-200 font-medium truncate">
                        {log.table_name.charAt(0).بالUpperCase() + log.table_name.slice(1)}
                        ... {log.action.toLowerCase()}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                        {log.user_email || 'System Process' } • {format(new Date(log.created_at), ... 'HH:mm:ss')}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<div className="p-8 text-center text-gray-500 text-sm">
    Waiting for activity...
</div>

</div>

}

export default AuditFeed;
```

<!-- BEDA - Combined Source Code -->

Page 21

<!-- Page: 22 -->

```
src/components/BranchMetrics.tsx

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function BranchMetrics() {
    const [metrics, setMetrics] = useState<any[]>([]);

    useEffect(() => {
        const fetchMetrics = async () => {
            const { data, error } = await supabase.from('branch_shipment_metrics')
                .select('*');
            if (error) console.error('Error fetching metrics:', error);
            else setMetrics(data || []);
        };

        fetchMetrics();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metrics.map((m) => {
                <div key={m.branch_id} className="p-4 bg-slate-800 rounded-lg border-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color-color
```

<!-- BEDA - Combined Source Code -->

Page 22

<!-- Page: 23 -->

```
src/components/DataEntryForm.tsx

import React, { useMemo, useState } from 'react';
import { addDoc, collection, serverTimestamp } from '手指base/firestore';
import { db } from '@/lib/Firebase';
import { Button } from @/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from @/components/ui/card';
import { Input } from @/components/ui/input';
import { Textarea } from @/components/ui/textarea';
import { Label } from @/components/ui/label';
import { toast } from 'sonner';

type City = 'Yangon' | 'Mandalay' | 'Naypyidaw';

export default function DataEntryForm() {
    const [customerName, setCustomerName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState<City>('Yangon');
    const [busy, setBusy] = useState(false);

    const detectedCity = useMemo<City>(() => {
        const lower = address.toLowerCase();
        if (lower.includes('mandalay') || lower.includes('mdy')) return 'Mandalay';
        if (lower.includes('naypyidaw') || lower.includes('npw') || lower.includes('nay pyi taw')) ... return 'Naypyidaw';
        if (lower.includes('yangon') || lower.includes('ygn')) return 'Yangon';
        return city;
    }, [address, city]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (busy) return;
        setBusy(true);

        try {
            await addDoc(collection(db, 'orders'), {
                customerName: customerName.trim(),
                address: address.trim(),
                city: detectedCity,
                status: 'PENDING',
                createdAt: serverTimestamp(),
            });
            toast.success('Order registered and planned for ${detectedCity}');
            setCustomerName('');
            setAddress('');
            setCity('Yangon');
        } catch (err: any) {
            toast.error(err?.message || 'Failed to create order');
        } finally {
            setBusy(false);
        }
    };

    return (
        <Card className="border-white/10 bg-white/5 backdrop-blur text-white">
            <CardHeader>
                <CardTitle>New Delivery Entry</CardTitle>
                </CardHeader>
            </CardContent>
            <form>onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-white/80">Customer Name</Label>
                    <Input value={customerName}>
                        onChange={(e) => setCustomerName(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    placeholder="Customer Name"
                    required={<div className="text-white/80">Customer Name</div>
                </form>
                <form>onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-white/80">Customer Name</Label>
                    </Input>
                    <Input value={customerName}>
                        onChange={(e) => setCustomerName(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    placeholder="Customer Name"
                    required={<div className="text-white/80">Customer Name</div>
                </form>
                <form>onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-white/80">Customer Name</Label>
                    </Input>
                    <Input value={customerName}>
                        onChange={(e) => setCustomerName(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    placeholder="Customer Name"
                    required={<div className="text-white/80">Customer Name</div>
                </form>
                <form>onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-white/80">Customer Name</Label>
                    </Input>
                    <Input value={customerName}>
                        onChange={(e) => setCustomerName(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    placeholder="Customer Name"
                    required={<div className="text-white/80">Customer Name</div>
                </form>
                <form>onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-white/80">Customer Name</Label>
                    </Input>
                    <Input value={customerName}>
                        onChange={(e) => setCustomerName(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    placeholder="Customer Name"
                    required={<div className="text-white/80">Customer Name</div>
                </form>
                <form>onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-white/80">Customer Name</Label>
                    </Input>
                    <Input value={customerName}>
                        onChange={(e) => setCustomerName(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    placeholder="Customer Name"
                    required={<div className="text-white/80">Customer Name</div>
                </form>
                <form>onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-white/80">Customer Name</Label>
                    </Input>
                    <Input value={customerName}>
                        onChange={(e) => setCustomerName(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    placeholder="Customer Name"
                    required={<div className="text-white/80">Customer Name</div>
                </form>
                <form>onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-white/80">Customer Name</Label>
                    </Input>
                    <Input value={customerName}>
                        onChange={(e) => setCustomerName(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    placeholder="Customer Name"
                    required={<div className="text-white/80">Customer Name</div>
                </form>
                <form>onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-white/80">Customer Name</Label>
                    </Input>
                    <Input value={customerName}>
                        onChange={(e) => setCustomerName(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    placeholder="Customer Name"
                    required={<div className="text-white/80">Customer Name</div>
                </form>
                <form>onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-white/80">Customer Name</Label>
                    </
```

<!-- BEDA - Combined Source Code -->

Page 23

<!-- Page: 24 -->

```
/>
</div>

<div className="space-y-2">
    <Label className="text-white/80">Full Address (include City)</Label>
    <Textarea value={address}
    onChange={(e) => setAddress(e.target.value)}
    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
    placeholder="Full address"
    required
</div>

<div className="text-xs text-white/60">Detected City: <span ... className="text-white">detectedCity</span></div>
</div>

<Button type="submit" disabled={busy}
    className="h-12 bg-gradient-to-r from-emerald-500 to-amber-400 text-slate-950 ... font-semibold"
    {busy ? 'Saving...' : 'Register Order'}
</Button>

</form>

</CardContent>
</Card>
}
```

<!-- BEDA - Combined Source Code -->

Page 24

<!-- Page: 25 -->

```
src/components/DeliveryExceptionHandler.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from @/components/ui/button';
import { Label } from @/components/ui/label';
import { Textarea } from @/components/ui/textarea';
import { Badge } from @/components/ui/badge';
import { Alert, AlertDescription } from @/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from
...'@/components/ui/select';
import { AlertTriangle, Camera, MapPin, Clock, FileText, RotateCcw } from 'lucid-react';

export type ExceptionType =
| 'customer_not_available'
| 'address_incorrect'
| 'refused_delivery'
| 'damaged_package'
| 'security_issue'
| 'weather_delay'
| 'vehicle_breakdown'
| 'other';

export interface DeliveryException {
  id: string;
  awb: string;
  exceptionType: ExceptionType;
  reason: string;
  evidencePhoto?: string;
  notes?: string;
  gpsCoordinates?: {
    latitude: number;
    longitude: number;
  };
  timestamp: Date;
  attemptNumber: number;
  nextAction: 'retry' | 'rto' | 'hold' | 'escalate';
  reportedBy: string;
}

interface ExceptionConfig {
  label: string;
  description: string;
  requiresPhoto: boolean;
  maxAttempts: number;
  nextAction: 'retry' | 'rto' | 'hold' | 'escalate';
}

const EXCEPTION_CONFIGS: Record<ExceptionType, ExceptionConfig> = {
  customer_not_available: {
    label: 'Customer Not Available',
    description: 'Customer not present at delivery address',
    requiresPhoto: false,
    maxAttempts: 3,
    nextAction: 'retry'
  },
  address_incorrect: {
    label: 'Incorrect Address',
    description: 'Address details are wrong or incomplete',
    requiresPhoto: true,
    maxAttempts: 2,
    nextAction: 'hold'
  },
  refused_delivery: {
    label: 'Delivery Refused',
    description: 'Customer refused to accept the package',
    requiresPhoto: false,
    maxAttempts: 1,
    nextAction: 'rto'
  },
  refused_delivery: {
    label: 'Delivery Refused',
    description: 'Customer refused to accept the package',
    requiresPhoto: false,
    maxAttempts: 1,
    nextAction: 'rto'
  }
};
```

<!-- BEDA - Combined Source Code -->

Page 25

<!-- Page: 26 -->

```
damaged_package: {
    label: 'Package Damaged',
    description: 'Package is visibly damaged',
    requiresPhoto: true,
    maxAttempts: 1,
    nextAction: 'escalate'
},
security_issue: {
    label: 'Security Concern',
    description: 'Safety or security issue at delivery location',
    requiresPhoto: true,
    maxAttempts: 1,
    nextAction: 'escalate'
},
weather_delay: {
    label: 'Weather Delay',
    description: 'Delivery delayed due to weather conditions',
    requiresPhoto: false,
    maxAttempts: 3,
    nextAction: 'retry'
},
vehicle_breakdown: {
    label: 'Vehicle Breakdown',
    description: 'Delivery vehicle breakdown or technical issue',
    requiresPhoto: false,
    maxAttempts: 1,
    nextAction: 'escalate'
},
other: {
    label: 'Other',
    description: 'Other delivery exception not listed above',
    requiresPhoto: true,
    maxAttempts: 2,
    nextAction: 'hold'
}
interface DeliveryExceptionHandlerProps {
    awb: string;
    receiverName: string;
    deliveryAddress: string;
    attemptNumber: number;
    onSubmit: (exception: Omit<DeliveryException, 'id' | 'timestamp' | 'reportedBy') => void;
    onCancel: () => void;
}
export function DeliveryExceptionHandler({
    awb,
    receiverName,
    deliveryAddress,
    attemptNumber,
    onSubmit,
    onCancel
} : DeliveryExceptionHandlerProps {
    const [exceptionType, setExceptionType] = useState<ExceptionType | ''(');
    const [reason, setReason] = useState('');
    const [evidencePhoto, setEvidencePhoto] = useState<string | null>(null);
    const [notes, setNotes] = useState('');
    const [gpsCoordinates, setGpsCoordinates] = useState<{latitude: number; longitude: number} | null>(null);
    const [isCapturingPhoto, setIsCapturingPhoto] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Get GPS coordinates
        if (navigator.geolocation) {
            navigator.geolocation. CurrentPosition(
                (position) => {
```

<!-- BEDA - Combined Source Code -->

Page 26

<!-- Page: 27 -->

```
setGpsCoordinates({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
});
},
(error) => {
    console.warn('GPS not available:', error);
});
},
[]);

const startCamera = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        });
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setIsCapturingPhoto(true);
        }
    } catch (error) {
        console.error('Camera access failed:', error);
        alert('Camera access failed. Please check permissions.");
    }
};

const stopCamera = () => {
    if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
    }
    setIsCapturingPhoto(false);
};

const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(video, 0, 0);
            const photoData = canvas.toDataURL('image/jpeg', 0.8);
            setEvidencePhoto(photoData);
            stopCamera();
        }
    }
};

const handleSubmit = () => {
    if (!exceptionType || !reason.trim()) {
        alert('Please fill in all required fields');
        return;
    }
    const selectedConfig = EXCEPTION_CONFIGS[exceptionType as ExceptionType];
    if (selectedConfig.requiresPhoto && !evidencePhoto) {
        alert('Photo evidence is required for this exception type');
        return;
    }
    const exception: Omit<DeliveryException, 'id' | 'timestamp' | 'reportedBy' => {
        awb,
        exceptionType: exceptionType as ExceptionType,
    }
};
```

<!-- BEDA - Combined Source Code -->

Page 27

<!-- Page: 28 -->

```
reason,
evidencePhoto: evidencePhoto || undefined,
notes: notes || undefined,
gpsCoordinates: gpsCoordinates || undefined,
attemptNumber,
nextAction: selectedConfig.nextAction
};
onSubmit(exception);
const getNextActionDescription = (action: string) => {
    switch (action) {
        case 'retry': return 'Schedule retry delivery';
        case 'rto': return 'Return to origin';
        case 'hold': return 'Hold for customer contact';
        case 'escalate': return 'Escalate to supervisor';
        default: return 'Review required';
    }
};
const selectedConfig = exceptionType ? EXCEPTION_CONFIGS[exceptionType as ExceptionType] ... null;
return (
    <div className="max-w-md mx-auto space-y-4">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    Delivery Exception
                </CardTitle>
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                        AWB: <span className="font-mono font-medium">{awb}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Receiver: {receiverName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Address: {deliveryAddress}
                    </p>
                    <Badge variant="outline" className="text-orange-600">
                        Attempt #{attemptNumber}
                    </Badge>
                </div>
                <div>
                    <CardHeader>
                        <CardContent className="space-y-6">
                            {/* Exception Type Selection */}
                        <div className="space-y-2">
                            <Label>Exception Type */Label>
                                <Select value={exceptionType} onValueChange={(value: ExceptionType)}
                                ... setExceptionType(value)}
                                <SelectTrigger>
                                    <SelectValue placeholder="Select exception type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(EXCEPTION_CONFIGS).map([key, config]) => (
                                    <SelectItem key={key} value={key}>
                                        {config.label}
                                    </SelectItem>
                                  })
                                </SelectContent>
                                </Select>
                                {selectedConfig && (
                                    <p className="text-xs text-muted-foreground">
                                        {selectedConfig.description}
                                    </p>
                                  )}
                                </div>
                            </Label>
                        </div>
                    </p>
                </div>
            </Label>
        </div>
    </div>
</div>
```

<!-- BEDA - Combined Source Code -->

Page 28

<!-- Page: 29 -->

```
{/* Exception Reason */}
<div className="space-y-2">
    <Label htmlFor="reason">Reason */Label>
        <Textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Provide specific details about the exception..." rows={3} />
    </Label>
</div>

{/* Photo Evidence */}
{selectedConfig?.requiresPhoto && (<div className="space-y-2">
    <Label>Photo Evidence */Badge variant="outline" ... className="ml-2">Required</Badge></Label>
    {!evidencePhoto ? (<div className="space-y-2">
        {!isCapturingPhoto ? (<Button onClick={startCamera} className="w-full">
            <Camera className="h-4 w-4 mr-2" />
            Take Evidence Photo
        </Button>
    </Button>
) : (<div className="space-y-2">
    <video ref={videoRef} className="w-full aspect-video bg-black rounded-lg" playsInline muted />
    <div className="flex gap-2">
        <Button onClick={capturePhoto} className="flex-1">
            <Camera className="h-4 w-4 mr-2" />
            Capture
        </Button>
    </Button>
    <Button variant="outline" onClick={stopCamera}>
        <Cancel
        </Button>
    </div>
</div>

)}

{/* Optional Photo for Non-Required Cases */}
{selectedConfig && !selectedConfig.requiresPhoto && (<div className="space-y-2">
    <Label htmlFor="reason">Reason */Label>
        <Textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Provide specific details about the exception..." rows={3} />
    </Label>
</div>

{/* Photo Evidence */}
{selectedConfig?.requiresPhoto && (<div className="space-y-2">
    <Label>Photo Evidence</Label>
    <Image src={evidencePhoto} alt="Exception evidence" className="w-full aspect-video object-cover rounded-lg border</Image>
    <Button variant="outline" onClick={(e) => setEvidencePhoto(null); startCamera();} className="w-full">
        <RotateCcw className="h-4 w-4 mr-2" />
        Retake Photo
        </Button>
    </div>
</div>

{/* Optional Photo for Non-Required Cases */}
{selectedConfig && !selectedConfig.requiresPhoto && (<div className="space-y-2">
    <Image src={image1} className="w-full aspect-image1</Image>
    <Image src={image2} className="w-full aspect-image2</Image>
    <Image src={image3} className="w-full aspect-image3</Image>
    <Image src={image4} className="w-full aspect-image4</Image>
    <Image src={image5} className="w-full aspect-image5</Image>
    <Image src={image6} className="w-full aspect-image6</Image>
    <Image src={image7} className="w-full aspect-image7</Image>
    <Image src={image8} className="w-full aspect-image8</Image>
    <Image src={image9} className="w-full aspect-image9</Image>
    <Image src={image10} className="w-full aspect-image10</Image>
    <Image src={image11} className="w-full aspect-image11</Image>
    <Image src={image12} className="w-full aspect-image12</Image>
    <Image src={image13} className="w-full aspect-image13</Image>
    <Image src={image14} className="w-full aspect-image14</Image>
    <Image src={image15} className="w-full aspect-image15</Image>
    <Image src={image16} className="w-full aspect-image16</Image>
    <Image src={image17} className="w-full aspect-image17</Image>
    <Image src={image18} className="w-full aspect-image18</Image>
    <Image src={image19} className="w-full aspect-image19</Image>
    <Image src={image20} className="w-full aspect-image20</Image>
    <Image src={image21} className="w-full aspect-image21</Image>
    <Image src={image22} className="w-full aspect-image22</Image>
    <Image src={image23} className="w-full aspect-image23</Image>
    <Image src={image24} className="w-full aspect-image24</Image>
    <Image src={image25} className="w-full aspect-image25</Image>
    <Image src={image26} className="w-full aspect-image26</Image>
    <Image src={image27} className="w-full aspect-image27</Image>
    <Image src={image28} className="w-full aspect-image28</Image>
    <Image src={image29} className="w-full aspect-image29</Image>
    <Image src={image30} className="w-full aspect-image30</Image>
    <Image src={image31} className="w-full aspect-image31</Image>
    <Image src={image32} className="w-full aspect-image32</Image>
    <Image src={image33} className="w-full aspect-image33</Image>
    <Image src={image34} className="w-full aspect-image34</Image>
    <Image src={image35} className="w-full aspect-image35</Image>
    <Image src={image36} className="w-full aspect-image36</Image>
    <Image src={image37} className="w-full aspect-image37</Image>
    <Image src={image38} className="w-full aspect-image38</Image>
    <Image src={image39} className="w-full aspect-image39</Image>
    <Image src={image40} className="w-full aspect-image40</Image>
    <Image src={image41} className="w-full aspect-image41</Image>
    <Image src={image42} className="w-full aspect-image42</Image>
    <Image src={image43} className="w-full aspect-image43</Image>
    <Image src={image44} className="w-full aspect-image44</Image>
    <Image src={image45} className="w-full aspect-image45</Image>
    <Image src={image46} className="w-full aspect-image46</Image>
    <Image src={image47} className="w-full aspect-image47</Image>
    <Image src={image48} className="w-full aspect-image48</Image>
    <Image src={image49} className="w-full aspect-image49</Image>
    <Image src={image50} className="w-full aspect-image50</Image>
    <Image src={image51} className="w-full aspect-image51</Image>
    <Image src={image52} className="w-full aspect-image52</Image>
    <Image src={image53} className="w-full aspect-image53</Image>
    <Image src={image54} className="w-full aspect-image54</Image>
    <Image src={image55} className="w-full aspect-image55</Image>
    <Image src={image56} className="w-full aspect-image56</Image>
    <Image src={image57} className="w-full aspect-image57</Image>
    <Image src={image58} className="w-full aspect-image58</Image>
    <Image src={image59} className="w-full aspect-image59</Image>
    <Image src={image60} className="w-full
```

<!-- BEDA - Combined Source Code -->

Page 29

<!-- Page: 30 -->

```
<div className="space-y-2">
    <Label>Photo Evidence (Optional)</Label>
    {!evidencePhoto ? (
        <Button variant="outline" onClick={startCamera} className="w-full">
        <Camera className="h-4 w-4 mr-2" />
        Add Photo Evidence
    </Button>
) : (
    <div className="space-y-2">
        <img src={evidencePhoto} alt="Exception evidence" className="w-full aspect-video object-cover rounded-lg border"/>
        <Button variant="outline" onClick={() => setEvidencePhoto(null)} className="w-full">
            <RotateCcw className="h-4 w-4 mr-2" />
            Remove Photo
        </Button>
    </div>
)}
</div>

{/* Additional Notes */}
<div className="space-y-2">
    <Label htmlFor="notes">Additional Notes</Label>
    <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any additional information that might be helpful..." rows={2}
</div>

{/* Next Action Info */}
{selectedConfig && (
    <Alert>
        <FileText className="h-4 w-4" />
        <AlertDescription>
            <strong>Next Action:<strong>
                ... {getNextActionDescription(selectedConfig.nextAction)}
                {attemptNumber >= selectedConfig.maxAttempts && (
                    <div className="mt-2 text-red-600 font-medium">
                        <Maximum attempts reached. This will trigger RTO process.
                    </div>
                )}
                </AlertDescription>
            </Strong>
        </FileText>
    </Alert>
}

{/* Location and Time Info */}
<div className="flex items-center gap-4 text-xs text-muted-foreground border-
    ... pt-4">
        <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {gpsCoordinates ? (
                <span>GPS: {gpsCoordinates.latitude.toFixed(6)},
                ... {gpsCoordinates.longitude.toFixed(6)}</span>
            ) : (
                <span className="text-red-500">GPS: Not available</span>
            )
        </div>
        <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{new Date().toLocaleString()</span>
        </div>
    </Label>
</div>
```

<!-- BEDA - Combined Source Code -->

Page 30

<!-- Page: 31 -->

```
</div>
</div>

{/* Action Buttons */}
<div className="flex gap-2">
    <Button
        onClick={handleSubmit}
        className="flex-1"
        disabled={!exceptionType || !reason.trim() || (selectedConfig?.requiresPhoto && !evidencePhoto)}
    >
        Submit Exception
    </Button>
    <Button variant="outline" onClick={onCancel}>
        Cancel
    </Button>
</div>
</div>
</div>

{/* Hidden canvas for photo capture */}
<canvas ref={canvasRef} style={{display: 'none'}} />
</div>
};
```

<!-- BEDA - Combined Source Code -->

Page 31

<!-- Page: 32 -->

```
src/components/ErrorBoundary.tsx

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode; }

interface State { hasError: boolean; error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = { hasError: false, error: null };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error: };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6
                ... text-center">
                <div className="max-w-md p-8 rounded-3xl bg-slate-800 border border-rose-500/50
                ... shadow-2xl">
                <h1 className="text-2xl font-bold text-white mb-4">System Error Detected</h1>
                <pre className="text-xs text-rose-400 bg-black/40 p-4 rounded-xl overflow-auto ... mb-6 text-left whitespace-pre-wrap">
                    {this.state.error?.message}
                </pre>
                <button>
                    onClick={() => window.location.href = '/dashboard'}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg ... font-bold transition-all"
                    >
                        RELOAD SYSTEM
                    </button>
                </div>
            </div>
        }

        return this.children;
    }
}
```

<!-- BEDA - Combined Source Code -->

Page 32

<!-- Page: 33 -->

## src/components/FleetStatus.tsx

```
// src/components/FleetStatus.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from'@/lib/supabase';
import { Truck, Circle, UserCheck } from 'lucid-react';

export default function FleetStatus() {
    const [riders, setRiders] = useState<any[]>([]);

    useEffect(() => {
        const fetchFleet = async () => {
            const { data } = await supabase.from('user_profiles');
            select('full_name, status, current_load');
            eq('role', 'RIDER');
            if (data) setRiders(data);
        };

        fetchFleet();
        const sub = supabase.channel('fleet-sync').on('postgres_changes', { event: '*', schema: ... 'public', table: 'user_profiles' }, fetchFleet).subscribe();
        return () => { supabase.removeChannel(sub); };
    }, []);

    return (
        <div className="luxury-card p-6">
            <div className="flex items-center gap-2 mb-6">
                <UserCheck className="h-4 w-4 text-luxury-gold" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/60">Active ... Fleet</h3>
            </div>
        </div>
        <div className="space-y-4">
            { riders.map((rider, i) => {
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 ... border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-luxury-gold/10 flex items-center ... justify-center">
                            <Truck className="h-4 w-4 text-luxury-gold" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-luxury-cream">{ rider.full_name</p>
                            <p className="text-[10px] text-white/40 uppercase tracking-tighter">Load: ... { rider.current_load || 0 } Parcels</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-white/40 uppercase">{ rider.status | ... 'Idle'</span>
                    <Circle className="{h-2 w-2 fill-current ${rider.status === 'active'? ... 'text-emerald-500': 'text-white/20'}' />
                </div>
            </div>
        </div>
    </div>
</div>
```

<!-- BEDA - Combined Source Code -->

Page 33

<!-- Page: 34 -->

```
src/components/Layout.tsx

import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from @/hooks/useAuth';
import { enterpriseNav } from @/config/navigation;
import { LogOut, Menu, User, Users } from 'lucid-react';
import { Button } from @/components/ui/button';
import NotificationBell from './NotificationBell';

const ROUTE_PERMISSIONS: Record<string, string> = {
    'dashboard': 'dashboard.view',
    'admin/users': 'users.manage',
    'inventory': 'inventory.view',
    'reports': 'reports.view',
    'settings': 'settings.manage'
};

export default function Layout({ children }{: { children: React.ReactNode }) {
    const { user, role, logout, hasPermission } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    /**
     * Consolidated Navigation Filtering
     * Safety Guard: Prevents Array.filter from running on undefined auth state.
     */
    const filteredNav = useMemo(() => {
        // If auth data hasn't arrived yet, return empty to prevent 'i is not a function' crash.
        if (!user || !role) return [];

        return enterpriseNav.filter(item => {
            // 1. Check Feature Flags from Environment
            const isFlagEnabled = item.featureFlag ? import.meta.env[item.featureFlag] === 'true' : true;
            if (!isFlagEnabled) return false;
            // 2. Role-Based Access Control (RBAC)
            // Allows access if user has the role OR is the master APP_OWNER.
            if (item.roles && !item.roles.includes(role as any) && role === 'APP_OWNER') {
                return false;
            }
            // 3. Permission-Based Access Control
            const requiredPermission = ROUTE_PERMISSIONS[item.href];
            if (requiredPermission) {
                return typeof hasPermission === 'function' ? hasPermission(requiredPermission) : ... false;
            }
            return true;
        });
    }, [user, role, hasPermission]);

    return (
        <div className="flex h-screen bg-luxury-obsidian text-luxury-cream overflow-hidden">
            {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
            {sidebarOpen && {
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    遂中{
                        {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                    {}}
                
```

<!-- BEDA - Combined Source Code -->

Page 34

<!-- Page: 35 -->

```
</AnimatePresence>

{/* Sidebar Navigation */}
<aside className={cn(
    "fixed inset-y-0 left-0 z-50 w-72 luxury-glass border-r border-white/5 ... transition-transform duration-300 md:relative md:translate-x-0",
    "sidebarOpen ? "translate-x-0" : "-translate-x-full"
})>
<div className="p-8">
    <div className="flex items-center gap-3 mb-10">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-luxury-gold ... to-amber-600 flex items-center justify-center shadow-lg ... shadow-luxury-gold/20">
            <span className="text-luxury-obsidian font-black text-xl">B</span>
        </div>
    </div>
    <div className="font-bold tracking-tighter text-xl text-luxury-gold">BRITIUM</h1>
    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Logistics ... Cloud</p>
</div>
</div>

<nav className="space-y-2">
    {filteredNav.map((item) => (
        <navLink
            key={item.href}
            to={item.href}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ... group",
                isActive
                ? "bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20"
                : "text-white/50 hover:text-white hover:bg-white/5"
            )
        }
    >
    <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
    <span className="font-medium text-sm">{{item.title}}</span>
</navLink>

}}

{/* APP_OWNER Exclusive User Management Link */}
{role === "APP_OWNER" && (
    <navLink
        to="/admin/users"
        onClick={() => setSidebarOpen(false)}
        className={({ isActive }) => cn(
            "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ... group",
            isActive
            ? "bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20"
            : "text-white/50 hover:text-white hover:bg-white/5"
        )
    >
    <Users className="h-5 w-5 transition-transform group-hover:scale-110" />
    <span className="font-medium text-sm">User Management</span>
</navLink>

}}
</nav>
</div>

{/* User Profile / Logout Section */}
<div className="absolute bottom-0 w-full p-6 border-t border-white/5">
    <div className="flex items-center gap-3 mb-4 px-2">
        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center ... justify-center">
            <User className="h-4 w-4 text-luxury-gold" />
        </div>
        <div className="overflow-hidden">
            <p className="text-xs font-bold truncate">{{user?.full_name || 'User'}}</p>
        </div>
    </div>
</navLink>
```

<!-- BEDA - Combined Source Code -->

Page 35

<!-- Page: 36 -->

```
<p className="text-[10px] text-white/40 truncate">{{role}} | 'Guest' </p>
</div>
<button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 ... hover:bg-red-400/10" onClick={logout}>
    <logout className="h-4 w-4 mr-3" />
    Logout
    </logout>
</button>
</div>
</aside>

{/* Main Content Area */}
<div className="flex-1 flex flex-col min-w-0 overflow-hidden">
    <header className="h-20 luxury-glass border-b border-white/5 flex items-center ... justify-between px-8 z-30">
        <button className="md:hidden p-2 text-white" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
        </button>
    </div>
    <div className="hidden md:block">
        <h2 className="text-sm font-medium text-white/60">System Operational</h2>
    </div>
    <div className="flex items-center gap-4">
        <NotificationBell />
        <div className="h-8 w-[1px] bg-white/10 mx-2" />
        <div className="text-right hidden sm:block">
            <p className="text-[10px] text-white/40 uppercase">Environment</p>
            <p className="text-xs font-mono text-luxury-gold">PROD-ENTERPRISE</p>
        </div>
    </div>
</div>
</div>

<main className="flex-1 overflow-y-auto p-8 relative custom-scrollbar">
    <children>
        </main>
    </div>
</div>
```

<!-- BEDA - Combined Source Code -->

Page 36

<!-- Page: 37 -->

## src/components/NotificationBell.tsx

```
import React from 'react';
import { Bell } from 'lucid-react';

const NotificationBell = () => (
    <button className="p-2 text-gray-400 hover:text-white">
        <Bell size={20} />
    </button>
);

export default NotificationBell;
```

<!-- BEDA - Combined Source Code -->

Page 37

<!-- Page: 38 -->

```
src/components/OperationalManual.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from @/components/ui/separator';
import { QrCode, Smartphone, Camera, MapPin, Clock, AlertTriangle, CheckCircle, Package, ... Truck, Users } from 'lucid-react';

export function OperationalManual() {
    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Express Delivery QR Operations Manual</h1>
                <p className="text-muted-foreground">Comprehensive guide for QR code scanning, POD ... capture, and exception handling</p>
            </div>
        </div>
    );

    <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR Code System Overview
        </CardTitle>
    </CardHeader>

    <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
            <div>
                <h4 className="font-semibold mb-2">What is the QR Code System？（h4）
                <p className="text-sm text-muted-foreground">
                    Our QR code system provides real-time tracking and verification for all ... shipments.
                    Each package gets a unique QR code that contains encrypted shipment ... information.
                </p>
            </div>
        </div>
    </CardContent>

    <div>
        <h4 className="font-semibold mb-2">Key Benefits</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Real-time shipment tracking</li>
            <li>• Reduced manual errors</li>
            <li>• Faster processing times</li>
            <li>• Enhanced security</li>
        </ul>
    </div>
</div>

</CardContent>

</Card>

{/* QR Code Design & Structure */}

<Card>
    <CardTitle>QR Code Design & Structure</CardTitle>
</Card>

<CardContent className="space-y-4">
    <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-semibold mb-2">QR Code Contains</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
                <p><strong>AWB Number</strong> Unique shipment identifier</p>
                <p><strong>Checksum</strong> Data integrity verification</p>
                <p><strong>Version</strong> QR code format version</p>
            </div>
        </div>
    </div>

    <p><strong>Routing Info</strong> Destination hub/branch</p>
    <p><strong>Timestamp</strong> Generation time</p>
    <p><strong>Security Hash</strong> Anti-tampering protection</p>
</card>
```

<!-- BEDA - Combined Source Code -->

Page 38

<!-- Page: 39 -->

```
</div>

<div className="space-y-2">
    <h4 className="font-semibold">Label Placement Guidelines:<h4>
        <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Place on the top-right corner of the package</li>
            <li>• Ensure the label is flat and not wrinkled</li>
            <li>• Avoid placing over seams or edges</li>
            <li>• Keep away from other barcodes or labels</li>
        </ul>
    </div>
</CardContent>

</Card>

{/* QR Code Printing */}

<Card>
    <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            QR Code Printing Process
        </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center ... justify-center mx-auto">
                    <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold">Generate</h4>
                <p className="text-sm text-muted-foreground">System generates QR code with ... shipment details</p>
            </div>
            <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center ... justify-center mx-auto">
                    <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold">Print</h4>
                <p className="text-sm text-muted-foreground">Print on thermal label printer with ... customer info</p>
            </div>
            <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center ... justify-center mx-auto">
                    <span className="text-blue-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold">Apply</h4>
                <p className="text-sm text-muted-foreground">Affix label to package following ... placement guidelines</p>
            </div>
        </div>
    </CardContent>
</Card>

{/* Scanning Procedures */}

<Card>
    <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            QR Code Scanning Procedures
        </CardTitle>
    </CardContent>
</Card>

{/* Pickup Scanning */}

<div>
    <h4 className="font-semibold mb-3 flex items-center gap-2">
        <Badge variant="outline">Pickup</Badge>
        Pickup Scanning
    </div>
</div>
```

<!-- BEDA - Combined Source Code -->

Page 39

<!-- Page: 40 -->

```
<div className="space-y-2 text-sm">
    <p><strong>When:<strong>At customer location during pickup</p>
    <p><strong>Who:<strong>Courier/Pickup Agent</p>
    <p><strong>Process:<strong></p>
    <ol className="list-decimal list-inside space-y-1 ml-4">
        <li>Open QR Scanner app</li>
        <li>Select "Pickup Scan" mode</li>
        <li>Scan QR code on package</li>
        <li>Verify AWB matches pickup list</li>
        <li>Capture GPS location automatically</li>
        <li>Add any pickup notes if needed</li>
        <li>Confirm scan to update status</li>
    </ol>
</div>

<Div>
    <Div>
        <Div>
            <Div>
                <Div>
                    <Div>
                        <Div>
                            <Div>
                                <Div>
                                    <Div>
                                        <Div>
                                            <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                <Div>
                                                
```

<!-- BEDA - Combined Source Code -->

Page 40

<!-- Page: 41 -->

```
</CardHeader>
<CardContent className="space-y-4">
    <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Signature POD
                </h4>
                <p className="text-sm text-muted-foreground">
                    Customer signs on mobile device screen. Capture clear signature with recipient name.
                </p>
                <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        OTP POD
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        Customer provides OTP sent to their mobile. Verify and confirm delivery.
                    </p>
                </div>
                <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        Photo POD
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        Take photo of delivered package at customer location with timestamp.
                    </p>
                </div>
            </div>
        </div>
    </div>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</CardContent>
</
```

<!-- BEDA - Combined Source Code -->

Page 41

<!-- Page: 42 -->

```
<li>Select exception type</li>
<li>Provide detailed reason</li>
<li>Take photo evidence (if required)</li>
<li>Add additional notes</li>
<li>Submit exception report</li>
<li>Follow next action guidance</li>
</ol>
</div>
</div>
</CardContent>
</Card>

{/* Operational Controls */}
<Card>
<CardHeader>
<CardTitle className="flex items-center gap-2">
<Users className="h-5 w-5" />
Operational Controls & Guidelines
</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
<div className="grid md:grid-cols-2 gap-6">
<div>
<h4 className="font-semibold mb-2">Quality Controls:</h4>
<ul className="text-sm space-y-1">
<li>• Verify QR code readability before dispatch</li>
<li>• Ensure GPS is enabled on all devices</li>
<li>• Regular device battery checks</li>
<li>• Daily app synchronization</li>
<li>• Photo quality verification</li>
</ul>
</div>
<div>
<h4 className="font-semibold mb-2">Security Measures:</h4>
<ul className="text-sm space-y-1">
<li>• Device authentication required</li>
<li>• Encrypted data transmission</li>
<li>• Audit trail for all scans</li>
<li>• Role-based access control</li>
<li>• Regular security updates</li>
</ul>
</div>
</CardContent>
</Card>

{/* Troubleshooting */}
<Card>
<CardHeader>
<CardTitle>Troubleshooting Guide</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
<div className="space-y-4">
<div>
<h4 className="font-semibold">QR Code Won't Scan</h4>
<ul className="text-sm text-muted-foreground space-y-1">
<li>• Clean camera lens</li>
<li>• Ensure adequate lighting</li>
<li>• Hold device steady</li>
<li>• Try manual AWB entry</li>
</ul>
</div>
<div>
<h4 className="font-semibold">App Not Syncing</h4>
<ul className="text-sm text-muted-foreground space-y-1">
<li>• Check internet connection</li>
<li>• Force sync from settings</li>
<li>• Restart application</li>
<li>• Contact IT support if persistent</li>
</ul>
</card>
</CardContent>
</card>
</div>
</div>
</card>
</CardContent>
</card>
</div>
</div>
</card>
</CardContent>
</card>
</div>
</card>
</CardContent>
</card>
</div>
</card>
</cardContent>
</card>
</div>
</cardContent>
</card>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
</cardContent>
```

<!-- BEDA - Combined Source Code -->

Page 42

<!-- Page: 43 -->

```
</div>
<div>
<h4 className="font-semibold">GPS Not Working:<h4>
<ul className="text-sm text-muted-foreground space-y-1">
<li>Enable location services</li>
<li>Check app permissions</li>
<li>Move to open area</li>
<li>Restart device if needed</li>
</ul>
</div>
</div>
</div>
</CardContent>
</Card>

{/* Contact Information */}
<Card>
<CardHeader>
<CardTitle>Support & Contact Information</CardTitle>
</CardHeader>
<CardContent>
<div className="grid md:grid-cols-3 gap-4 text-sm">
<div>
<h4 className="font-semibold">Technical Support:<h4>
<p>Phone: 1800-XXX-TECH</p>
<p>Email: tech-support@company.com</p>
</div>
<div>
<h4 className="font-semibold">Operations Support:<h4>
<p>Phone: 1800-XXX-OPS</p>
<p>Email: ops-support@company.com</p>
</div>
<div>
<h4 className="font-semibold">Emergency Escalation:<h4>
<p>Phone: 1800-XXX-URGENT</p>
<p>Available 24/7</p>
</div>
</div>
</CardContent>
</Card>
</div>
</div>
</CardContent>
</Card>
</div>
</div>
</div>
</CardContent>
</div>
</div>
</div>
</div>
</CardContent>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div
```

<!-- BEDA - Combined Source Code -->

Page 43

<!-- Page: 44 -->

```
src/components/PermissionGate.tsx

import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

interface PermissionGateProps {
    permission: string;
    children: ReactNode;
    Fallback?: ReactNode; // Optional: Render this if permission is missing (e.g., a lock icon ... or null)
}

export default function PermissionGate({
    permission,
    children,
    Fallback = null
};

const { hasPermission } = useAuth();

// "hasPermission" automatically handles the 'APP_OWNER' override
// defined in your useAuth hook.
if (!hasPermission(permission)) {
    return <{Fallback}:};
}

return <{children}:};
```

<!-- BEDA - Combined Source Code -->

Page 44

<!-- Page: 45 -->

```
src/components/PermissionGuard.tsx
import { useAuth } from '@/hooks/useAuth';

interface Props {
    permission: string;
    children: React.ReactNode;
}

export default function PermissionGuard({ permission, children }: Props) {
    const { userData } = useAuth();
    if (!userData?.permissions?.[permission]) {
        return null;
    }
    return <{children}</>;
}
```

<!-- BEDA - Combined Source Code -->

Page 45

<!-- Page: 46 -->

```
src/components/PhotoCapture.tsx

import React, { useRef, useState, useCallback } from 'react';
import { Camera, RefreshCw, Check, AlertCircle, X } from 'lucid-react';
import { Button } from'@/components/ui/button';
import { Card } from'@/components/ui/card';

interface PhotoCaptureProps {
    onCapture: (photo: string) => void;
    watermarkData: {
        ttId: string;
        userId: string;
        timestamp: string;
        gps: string;
    };
    required?: boolean;
}

export default function PhotoCapture({ onCapture, watermarkData, required = false }: ... PhotoCaptureProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' },
                audio: false,
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraOpen(true);
                setError(null);
            }
        } catch (err) {
            setError('Could not access camera. Please ensure permissions are granted.");
            console.error('Camera error:', err);
        }
    };

    const stopCamera = useCallback(() => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
            setIsCameraOpen(false);
        }
    }, []);

    const applyWatermark = (ctx: CanvasRenderingContext2D, width: number, height: number) =>
        const padding = 20;
    const fontSize = Math.max(14, width / 40);
    ctx.font = `${fontSize}px JetBrains Mono, monospace`;

    const lines = [
        `TT ID: ${watermarkData.ttId}`
        `User: ${watermarkData.userId}`
        `Time: ${watermarkData.timestamp}`
        `GPS: ${watermarkData.gps}`
    ];

    const boxWidth = 300;
    const boxHeight = lines.length * (fontSize + 8) + padding;

    ctx.fillStyle = 'rgb(0, 0, 0, 0.5)'
    ctx.fillRect(width - boxWidth - padding, height - boxHeight - padding, boxWidth, boxHeight);
```

<!-- BEDA - Combined Source Code -->

Page 46

<!-- Page: 47 -->

```
ctx.fillStyle = 'white';
ctx.textAlign = 'left';

lines.forEach((line, index) => {
    ctx.fillText(
        line,
        width - boxWidth - padding + 10,
        height - boxHeight - padding + padding + index * (fontSize + 8)
    );
});

const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            applyWatermark(context, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/jpeg', 0.8);
            setCapturedImage(imageData);
            stopCamera();
        }
    };
};

const handleConfirm = () => {
    if (capturedImage) {
        onCapture(capturedImage);
    }
};

const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
};

return (
    <div className="w-full space-y-4">
        {!isCameraOpen && !capturedImage? (
            <Button
                variant="outline"
                className="w-full h-32 border-dashed flex flex-col gap-2"
                onClick={startCamera}
            >
                <Camera className="w-8 h-8 text-muted-foreground" />
                <span>Take Photo {required && <span className="text-destructive">*/span}></Button>
            ) : null}
        }
    }
);

{error && (
    <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/1... rounded-lg">
        <AlertCircle className="w-4 h-4" />
        <span>error</span>
    </div>
})

{isCameraOpen && (
    <Card className="relative overflow-hidden aspect-video bg-black flex items-center... justify-center">
        <video
            ref={videoRef}
        </video>
    </Card>
});
```

<!-- BEDA - Combined Source Code -->

Page 47

<!-- Page: 48 -->

```
autoPlay
playsInline
className="w-full h-full object-cover"
/>
<div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
    <Button size="icon" className="rounded-full w-12 h-12" onClick={capturePhoto}>
        <Camera className="w-6 h-6" />
    </Button>
    <Button size="icon" variant="secondary" className="rounded-full w-12 h-12" ... onClick={stopCamera}>
        <X className="w-6 h-6" />
    </Button>
</div>
</Card>

{capturedImage && (
    <div className="space-y-4">
        <Card className="relative overflow-hidden aspect-video bg-muted">
            <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
            <div className="absolute top-2 right-2">
                <div className="bg-primary/90 text-primary-foreground px-2 py-1 rounded ... text-[10px] font-mono">
                    WATERMARKED
                </div>
            </div>
        </Card>
        <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2" onClick={handleRetake}>
                <RefreshCw className="w-4 h-4" />
            </Button>
            <Button className="flex-1 gap-2" onClick={handleConfirm}>
                <Check className="w-4 h-4" />
            <Use Photo
                <Button>
                </Button>
            </div>
        </div>
    </div>
</div>

<canvas ref={canvasRef} className="hidden" />
</div>
```

<!-- BEDA - Combined Source Code -->

Page 48

<!-- Page: 49 -->

```
src/components/QRScanner.tsx

import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Camera, CameraOff, RefreshCw, AlertCircle, CheckCircle2 } from 'lucid-react';
import { Button } from'@/components/ui/button';
import { Card } from'@/components/ui/card';
import { Badge } from'@/components/ui/badge';
import { cn } from'@/lib/utils';

interface QRScannerProps {
    onScan: (code: string) => void;
    expectedType?: 'TT' | 'AWB' | 'LOCATION' | 'MANIFEST';
    disabled?: boolean;
}

const QRScanner: React.FC<QRScannerProps> = ( { onScan, expectedType, disabled }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startCamera = async () => {
        setError(null);
        setSuccess(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                setIsScanning(true);
            }
        } catch (err) {
            setError('Camera access denied or not available');
            console.error(err);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsScanning(false);
    };

    const handleCapture = () => {
        // Simulation of a QR scan since browser-based decoding usually requires external lib
        ... like jsQR
        // In a real production app, we would use a library or a native bridge
        // For this simulation, we generate a valid ID based on expected type
        if (disabled) return;

        let simulatedCode = '';
        const rand = Math.floor(100000 + Math.random() * 900000);

        switch (expectedType) {
            case 'TT':
                simulatedCode = 'TT-${rand}';
                break;
            case 'AWB':
                simulatedCode = 'AWB-${rand}';
                break;
            case 'LOCATION':
                simulatedCode = 'LOC_WH_GATE_{{rand}}';
                break;
            case 'MANIFEST':
```

<!-- BEDA - Combined Source Code -->

Page 49

<!-- Page: 50 -->

```
simulatedCode = `MF-${rand}`;
break;
default:
    simulatedCode = `SCAN-${rand}`;
}

setSuccess(`Successfully scanned: ${simulatedCode}`);
onScan(simulatedCode);

setTimeout() => {
    stopCamera();
}, 1000);

seEffect() => {
    return () => stopCamera();
}, []);

return (
    <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="p-4 flex flex-col items-center gap-4">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-primary"/>
                    <span className="font-sembold text-sm">
                        {expectedType ? `${expectedType} Scanner` : 'QR Scanner'}
                    </span>
                </div>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
```

<!-- BEDA - Combined Source Code -->

Page 50

<!-- Page: 51 -->

```
<div className="flex flex-col items-center gap-3 text-muted-foreground p-8 ... text-center">
    <CameraOff className="w-12 h-12 opacity-20" />
    <p className="text-xs">Camera is currently inactive</p>
    <Button variant="secondary" size="sm" onClick={startCamera} disabled={disabled} className="mt-2">
        <Camera className="w-4 h-4 mr-2" />
        Start Camera
    </Button>
</div>
</div>
</div>
<div className="w-full space-y-2">
    {error && (
        <div className="flex items-center gap-2 p-3 text-xs rounded-lg bg-destructive/10 ... text-destructive border border-destructive/20 animate-in fade-in ... slide-in-from-top-1">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span={error}</span>
        </div>
    }
    {success && (
        <div className="flex items-center gap-2 p-3 text-xs rounded-lg bg-emerald-500/10 ... text-emerald-600 border border-emerald-500/20 animate-in fade-in ... slide-in-from-top-1">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span={success}</span>
        </div>
    </div>
</div>
{isScanning && (
    <div className="flex items-center gap-2 w-full">
        <Button variant="outline" className="flex-1 text-xs" onClick={stopCamera}>
            <Stop>
                </Button>
                <Button variant="secondary" className="flex-1 text-xs" onClick={() => { stopCamera(); startCamera(); }}>
                <RefreshCw className="w-3 h-3 mr-2" />
                Reset>
                </Button>
            </Button>
        </div>
    </div>
}
{!isScanning && !error && !success && (
    <p className="text-[10px] text-muted-foreground text-center italic">
        Ensure the QR code is clear and within the frame.
    </p>
)}
</div>
</Card>
};

export default QRScanner;
```

<!-- BEDA - Combined Source Code -->

Page 51

<!-- Page: 52 -->

```
src/components/RealTimeMapView.tsx

// src/components/RealTimeMapView.tsx
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/lib/supabase';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';

export default function RealTimeMapView({ city }: { city: string }) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});

    useEffect(() => {
        if (!mapContainer.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/navigation-night-v1',
            center: [96.1561, 16.8661],
            zoom: 11,
            pitch: 45
        });
        return () => map.current?.remove();
    }, []);

    useEffect(() => {
        const syncMarkers = async () => {
            const { data: orders } = await supabase
            .from('orders')
            .select('id, latitude, longitude, status, route_sequence')
            .eq('city', city);
        if (!orders || !map.current) return;

        orders.forEach((order) => {
            if (!order.latitude || !order.longitude) return;
            // If marker exists, update it. If not, create it.
            if (markers.current[order.id]) {
                markers.current[order.id].setLngLat([order.longitude, order.latitude]);
            } else {
                // Create a custom HTML element for the marker
                const el = document.元素Element('div');
                el.备注Name = 'marker';
                // Color logic based on status
                const color = order.status === 'delivered' ? '#10b981':
                    order.status === 'in_transit' ? '#3b82f6': '#D4AF37';
                el.innerHTML = `<div style="background: {color}; width: 12px; height: 12px; border-radius: 50%; ... border: 2px solid white; box-shadow: 0 0 10px ${color};">
                    <span style="position: absolute; top: -15px; left: 50%; transform: ... translateX(-50%); font-size: 8px; font-weight: bold; color: white; ... white-space: nowrap;">
                    ${order.route_sequence || ''}
                </span>
                </div>
            };
            markers.current[order.id] = new mapboxgl.Marker(el)
            .setLngLat([order.longitude, order.latitude])
            .addTo(map.current!);
        });
    };
};
```

<!-- BEDA - Combined Source Code -->

Page 52

<!-- Page: 53 -->

```
return (
    <div className="luxury-card overflow-hidden h-[500px] relative">
        <div ref={mapContainer} className="absolute inset-0" />
    </div>
);
```

```
syncMarkers();
const channel = supabase.channel('live-markers').on('postgres_changes', { event: '」， ... schema: 'public', table: 'orders' }, syncMarkers).subscribe();
return () => { supabase.removeChannel(channel); };
}, [city]);

return (
<div className="luxury-card overflow-hidden h-[500px] relative">
<div ref={mapContainer} className="absolute inset-0" />
</div>
);
```

<!-- BEDA - Combined Source Code -->

Page 53

<!-- Page: 54 -->

## src/components/RevenueForecast.tsx

```
import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { TrendingUp, DollarSign } from 'lucid-react';

const data = [
    { name: 'Mon', revenue: 4200, projection: 4000 },
    { name: 'Tue', revenue: 5100, projection: 4800 },
    { name: 'Wed', revenue: 4800, projection: 5200 },
    { name: 'Thu', revenue: 6200, projection: 5800 },
    { name: 'Fri', revenue: 7800, projection: 6500 },
    { name: 'Sat', revenue: 8400, projection: 7200 },
    { name: 'Sun', revenue: 9100, projection: 8000 },
];
```

```
export default function RevenueForecast() {
    return (
        <div className="luxury-card p-8 h-full min-h-[400px]">
            <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center ... justify-center">
                        <DollarSign className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] ... text-luxury-cream">Revenue Intelligence</h3>
                        <p className="text-[10px] text-white/30 uppercase">Weekly Performance vs ... Projection</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="text-right">
        <div className="flex items-center gap-2 text-emerald-400">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xl font-bold">+24.8%</span>
        </div>
        <p className="text-[10px] text-white/30 uppercase tracking-tighter">Above Target</p>
    </div>
</div>

<div className="h-[250px] w-full">
    <ResponsiveContainer width="100% height="100%">
        <AreaChart data={data}>
            <docs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor/#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor/#D4AF37" stopOpacity={0}/>
                </linearGradient>
            </docs>
            <CartesianGrid strokeDasharray="3 3" stroke=#ffffff05" vertical={false} />
            <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={fill: '#ffffff30', fontSize: 10, fontWeight: 'bold'}
                dy={15}
            </XAxis hide />
            <Tooltip
                contentStyle={
                    backgroundColor: '#0B0C10',
                    border: '1px solid rgb(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#FAF9F6'
                }
            </Torti}
        </div>
    </div>
</div>
```

<!-- BEDA - Combined Source Code -->

Page 54

<!-- Page: 55 -->

```
/>
<Area 
    type="monotone"
    dataKey="revenue"
    stroke="#D4AF37"
    strokeWidth={3}
    fillOpacity={1}
    fill="url(#colorRev)"
/>
<Line 
    type="monotone"
    dataKey="projection"
    stroke="#ffffff20"
    strokeWidth={2}
    strokeDasharray="5 5"
    dot={false}
/>
</AreaChart>
</ResponsiveContainer>

</div>

<div className="flex gap-6 mt-6 border-t border-white/5 pt-6">
    <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-luxury-gold">
            <span className="text-[10px] text-white/40 uppercase font-bold ... tracking-widest">Actual Revenue</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-white/10">
                <span className="text-[10px] text-white/40 uppercase font-bold ... tracking-widest">Target Projection</span>
            </div>
        </div>
    </div>
</AreaChart>
```

<!-- BEDA - Combined Source Code -->

Page 55

<!-- Page: 56 -->

```
src/components/RoleBasedRoute.tsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '.../hooks/useAuth';

export default function RoleBasedRoute({ allowedRoles, children }: { allowedRoles?: string[] }, ... children: React.ReactNode) {
    const { user, role, loading } = useAuth();
    const location = useLocation();

    // 1. HARD GUARD: If loading is true, NEVER redirect.
    // Stay on this screen until Supabase answers.
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="h-10 w-10 border-4 border-luxury-gold border-t-transparent ... animate-spin rounded-full" />
            </div>
        );
    }

    // 2. If no user, go to /login. If /login is not exported, this fails.
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 3. Authority Check
    if (allowedRoles && role && !allowedRoles.includes(role) && role != 'APP_OWNER') {
        return <Navigate to="/unauthorized" replace />;
    }

    return <{children}</>;
}
```

<!-- BEDA - Combined Source Code -->

Page 56

<!-- Page: 57 -->

```
src/components/RoutePlanner.tsx

import React, { useState } from 'react';
import { supabase } from'@/lib/supabase';
import { createAuditLog } from'@/lib/audit';
import { Button } from'@/components/ui/button';
import { Loader2, MapPin, Send } from 'lucid-react';
import { toast } from 'sonner';

const RoutePlanner = () => {
    const [loading, setLoading] = useState(false);
    const optimizeRoutes = async (city: string) => {
        setLoading(true);
        try {
            // 1. Fetch pending orders for the selected city
            const { data: orders, error: fetchError } = await supabase.from('orders')
            .select('id, township, address')
            .eq('city', city)
            .eq('status', 'pending');
            if (fetchError || !orders || orders.length === 0) {
                toast.error(fetchError ? "Database fetch error" : 'No pending orders in ${city}');
                return;
            }
            // 2. Optimization Logic: Sequence by Township
            const sortedOrders = [...orders].sort((a, b) => (a.township || "").localeCompare(b.township || ""));
        }
        // 3. Prepare sequence updates
        const updates = sortedOrders.map((order, index) => {
            id: order.id,
            route_sequence: index + 1,
        });
        // 4. Batch update sequences in Supabase
        const { error: updateError } = await supabase.from('orders')
            .upsert(updates);
        if (updateError) throw updateError;
        // 5. Enterprise Audit Logging
        await createAuditLog(
            'ROUTE_OPTIMIZE',
            `System-wide route optimization executed for ${city}`,
            { orderCount: orders.length, city }
        );
        // 6. Conditional Messaging to RIDERS
        if (import.meta.env.VITE_ENABLE_ROUTE_MESSAGING === 'true') {
            await supabase.from('notifications').insert({
                title: "New Delivery Sequence",
                message: `The delivery route for ${city} has been optimized. Check your app for ... updates.`,
                target_role: "RIDER",
                city: city
            });
            toast.success(`Success: ${orders.length} orders planned and riders notified.`);
        } else {
            toast.success(`Planned ${orders.length} orders for ${city}.`);
        }
    } catch (err: any) {
        console.error("Route Planning Error:", err);
        toast.error(`System Error: ${err.message} | "Failed to optimize routes"');
    }
}
```

<!-- BEDA - Combined Source Code -->

Page 57

<!-- Page: 58 -->

```
} finally {
    setLoading(false);
}

return (
    <div className="luxury-card p-8 space-y-6">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-luxury-gold/10 rounded-lg">
                <MapPin className="h-5 w-5 text-luxury-gold" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-luxury-cream">Route Optimization</h3>
                    <p className="text-sm text-white/40">Enterprise Sequencing Engine</p>
                </div>
            </div>
        </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {['Yangon', 'Mandalay', 'Naypyidaw'].map((city) => (
            <Button 
                key={city}
                disabled={loading}
                onClick={() => optimizeRoutes(city)}
                className="h-14 bg-white/5 border border-white/10 hover:bg-luxury-gold ... hover:text-luxury-obsidian transition-all group">
                {loading? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <div className="flex flex-col items-center">
                        <span className="text-xs uppercase tracking-widest text-white/40 ... group-hover:text-luxury-obsidian/60">Execute</span>
                        <span className="font-bold">{{city}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
);

export default RoutePlanner;
```

<!-- BEDA - Combined Source Code -->

Page 58

<!-- Page: 59 -->

## src/components/Shipments.tsx

```
// Simplified Shipments component
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from @/components/ui/button';
import { Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucid-react';

export default function Shipments() {
    const mockShipments = [
        {
            id: '1',
            awb: 'EDS20241201001',
            status: 'BOOKED',
            senderName: 'John Doe',
            receiverName: 'Jane Smith',
            weight: 2.5,
            serviceType: 'express'
        },
        {
            id: '2',
            awb: 'EDS20241201002',
            status: 'DELIVERED',
            senderName: 'Alice Johnson',
            receiverName: 'Bob Wilson',
            weight: 1.8,
            serviceType: 'standard'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Shipments</h1>
                    <p className="text-muted-foreground">Manage and track all shipments</p>
                </div>
                <Button className="btn-modern">
                    <Package className="mr-2 h-4 w-4" />
                    Create Shipment
                </Button>
            </div>
        </div>
        <div className="grid gap-4">
            {mockShipments.map((shipment) => {
                <Card key={shipment.id} className="card-modern">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Package className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-mono">
                                        <shipment.awb</shipment.awb>
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">Express Delivery</p>
                                </div>
                            </div>
                        </Badge variant={shipment.status === 'DELIVERED' ? 'default' : 'secondary'}>
                    </shipment.status>
                </Badge>
            </div>
        </div>
        <CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-medium text-muted-foreground">FROM</p>
                    </p>
                    <p className="font-medium">
                        <shipment.senderName></p>
                    </div>
                </div>
            </CardContent>
        </div>
    </div>
</div>
```

<!-- BEDA - Combined Source Code -->

Page 59

<!-- Page: 60 -->

```
<p className="text-xs font-medium text-muted-foreground">T0</p>
<p className="font-medium">{shipment.receiverName}</p>
</div>

<div className="flex items-center justify-between mt-4 pt-4 border-t ... border-border/50">
<div className="flex items-center gap-4 text-sm">
<span className="flex items-center gap-1">
<Package className="h-4 w-4"/>
{shipment.weight}kg
</span>

<span className="flex items-center gap-1">
<Truck className="h-4 w-4"/>
{shipment.serviceType}
</span>

</div>

<div className="flex gap-2">
<Button variant="outline" size="sm">Track</Button>
<Button variant="outline" size="sm">Edit</Button>
</div>

</div>

</CardContent>

</Card>

</div>

</div>

};
```

<!-- BEDA - Combined Source Code -->

Page 60

<!-- Page: 61 -->

```
src/components/ShippingCalculator.tsx

import React, { useState } from 'react';

// Language context - using simple state for now
const useLanguageContext = () => ({ language: 'en' });
import { Calculator, MapPin, Package, Clock, Truck, Phone, Mail } from 'lucid-react';
import { IMAGES } from '@/assets/images';

export default function ShippingCalculator() {
    const { language } = useLanguageContext();

    const [formData, setFormData] = useState({
        origin: 'Yangon',
        destinationRegion: "",
        township: "",
        weight: "",
        length: "",
        width: "",
        height: ""
    });

    const [calculatedRate, setCalculatedRate] = useState({
        price: string;
        time: string;
        note: string;
    } | null);

    const yangonTownships = {
        central: [
            'Ahlone', 'Bahan', 'Botahtaung', 'Dagon', 'Dawbon', 'Hlaing',
            'Insein', 'Kamaryut', 'Kyauktada', 'Kyimyindaing', 'Lanmataw',
            'Latha', 'Mayangone', 'Mingalar Taung Nyunt', 'North Okkalapa',
            'Pabedan', 'Pazundaung', 'Sanchaung', 'South Oakkalapa', 'Tamwe',
            'Thaketa', 'Thingangyun', 'Yankin'
        ],
        extended: [
            'Dagon Seikken', 'East Dagon', 'Hlaing Thar Yar', 'Mingalar Don',
            'North Dagon', 'Shwe Paukkan', 'Shwe Pyi Thar', 'South Dagon'
        ],
        suburban: [
            'Htau Kyant', 'Hlegu', 'Hmawbi', 'Lay Daung Kan', 'Thanlyin'
        ]
    };

    const calculateRate = () => {
        const weight = parseFloat(formData.weight) || 0;
        let baseRate = 0;
        let timeEstimate = "";
        let note = "";

        if (formData.destinationRegion === 'yangon') {
            if (yangonTownships.central.includes(formData.township)) {
                baseRate = 2000;
                timeEstimate = 'Same Day';
                note = 'Central Yangon - Premium Service';
            } else if (yangonTownships.extended.includes(formData.township)) {
                baseRate = 2500;
                timeEstimate = 'Same Day';
                note = 'Extended Yangon Areas';
            } else if (yangonTownships.suburban.includes(formData.township)) {
                baseRate = 3000;
                timeEstimate = 'Next Day';
                note = 'Suburban Areas';
            }
        } else if (formData.destinationRegion === 'mandalay') {
                baseRate = 4500;
                timeEstimate = 'Next Day';
                note = 'Mandalay Region Express';
            } else if (formData.destinationRegion === 'naypyitaw') {
                baseRate = 4000;
                timeEstimate = 'Next Day';
                note = 'Mandalay Region Express';
            }
        }
    };
}
```

<!-- BEDA - Combined Source Code -->

Page 61

<!-- Page: 62 -->

```
timeEstimate = 'Next Day';
note = 'Capital Express Service';
} else {
    baseRate = 5500;
    timeEstimate = '2-3 Days';
    note = 'Other States/Regions';
}

// Additional weight charges
if (weight > 1) {
    baseRate += (weight - 1) * 500;
}

setCalculatedRate({
    price: `${baseRate.toLocaleString()}' MMK',
    time: timeEstimate,
    note: `${note}. Base rate covers 1st Kg. Additional weight +500 MMK/Kg.`
});

const handleInputChange = (field: string, value: string) => {
    setFormData(prev => (...prev, [field]: value));
    if (field === 'destinationRegion' && value === 'yangon') {
        setFormData(prev => (...prev, township: ''));
    }
};

return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
        /* Header */
        <header className="bg-navy-900/90 backdrop-blur-sm border-b border-gold-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl ... flex items-center justify-center">
                            <Package className="w-6 h-6 text-navy-900" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Britium Express</h1>
                            <p className="text-gold-400 text-sm">Premium Logistics Solutions</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-300">
                        <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>+95-9-897447744</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>info@britiumexpress.com</span>
                        </div>
                        <div className="text-xs">
                            Mon-Sat: 9:00am - 5:30pm
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```

<!-- BEDA - Combined Source Code -->

Page 62

<!-- Page: 63 -->

```
</a>

</div>

<button className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-4 py-2 ... rounded-lg font-medium text-sm transition-colors">
Login
</button>

</div>

</nav>

{/* Hero Section */}

<section className="relative py-16 bg-gradient-to-r from-navy-900 to-navy-800">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
<div className="inline-flex items-center space-x-2 bg-gold-500/10 border ... border-gold-500/20 rounded-full px-4 py-2 mb-6">
<Calculator className="w-5 h-5 text-gold-400" />
<span className="text-gold-400 font-medium">Shipping Rate Calculator</span>
</div>

<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
Check our specific Yangon City rates below.
</h1>

<p className="text-xl text-gray-300 mb-8">
</p>

</div>

</section>

{/* Calculator Section */}

<section className="py-16">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid lg:grid-cols-2 gap-12">
{/* Form Section */}

<div className="space-y-8">
<div className="bg-navy-800/50 backdrop-blur-sm border border-gold-500/20 ... rounded-2xl p-8">
<div className="flex items-center space-x-3 mb-6">
<Package className="w-6 h-6 text-gold-400" />
<h2 className="text-2xl font-bold text-white">Shipment Details</h2>
</div>

<p className="text-gray-300 mb-8">Enter your package information to get an ... instant quote</p>

<div className="space-y-6">
{/* Origin */}

<div>
<label className="block text-sm font-medium text-gray-300 mb-2">
Origin /
</label>

<div className="bg-navy-700/50 border border-gold-500/20 rounded-lg px-4 ... py-3">
<span className="text-white">From: Yangon / □□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□
```

<!-- BEDA - Combined Source Code -->

Page 63

<!-- Page: 64 -->

```
// select
// {
// * Township Selection */
// {
// * Data.destinationRegion === 'yangon' && (
// *
// <div>
// <label className="block text-sm font-medium text-gray-300 mb-2">
// Select Township /
//
// <label>
// <select value={formData.township}
// onChange={(e) => handleInputChange('township', e.target.value)}
// className="form-elegant w-full"
// >
// <option value="">-- Select Area /
// <optgroup label="Central Yangon /
// {yangonTownships.central.map(township => (
// <option key={township} value={township}>{township}<option>
// )}}
// </optgroup>
// <optgroup label="Extended Areas /
// {yangonTownships.extended.map(township => (
// <option key={township} value={township}>{township}<option>
// )}}
// </optgroup>
// <optgroup label="Suburban /
// {yangonTownships.suburban.map(township => (
// <option key={township} value={township}>{township}<option>
// )}}
// </optgroup>
// </select>
// </div>
// )
// {/* Weight */}
// <div>
// <label className="block text-sm font-medium text-gray-300 mb-2">
// Weight (Kg) /
//
// <label>
// <input type="number" value={formData.weight}
// onChange={(e) => handleInputChange('weight', e.target.value)}
// className="form-elegant w-full"
// placeholder="Enter weight /
//
// </div>
//
// {/* Dimensions */}
// <div>
// <label className="block text-sm font-medium text-gray-300 mb-2">
// Dimensions (L x W x H cm) - Optional /
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
```

<!-- BEDA - Combined Source Code -->

Page 64

<!-- Page: 65 -->

```
<input type="number" value={formData.height}
onChange={(e) => handleInputChange('height', e.target.value)}
className="form-elegant"
     placeholder="Height"
/>
</div>
</div>
<button
     onClick={calculateRate}
     className="w-full bg-gradient-to-r from-gold-500 to-gold-600 ... hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold py-4 ... px-6 rounded-xl transition-all duration-300 transform hover:scale-105'
>
    <Calculator className="w-5 h-5 inline mr-2" />
    <Calculate Rate /
        <button>
        </button>
    </CalculateRate>
</button>
</div>
</div>
{/* Results Section */}
<div className="space-y-8">
    <div className="bg-navy-800/50 backdrop-blur-sm border border-gold-500/20 ... rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-6">
            <span className="text-2xl">
                <h2 className="text-2xl font-bold text-white">Estimated Delivery Cost</h2>
            </div>
            <p className="text-gray-300 mb-8">Your shipping quote will appear here</p>
        </div>
    </div>
</div>
<div className="space-y-6">
    <div className="text-center">
        <div className="text-4xl font-bold text-gold-400 mb-2">
            {calculatedRate.price}
        </div>
        <p className="text-gray-300">
            <p className="text-gray-400">Estimated Delivery Time: {calculatedRate.time}
            </p>
            <p className="text-sm text-gray-400 mt-2">
                {calculatedRate.note}
            </p>
        </div>
    </div>
</div>
<div className="grid grid-cols-3 gap-4 py-6 border-t border-gold-500/20">
    <div className="text-center">
        <div className="text-sm text-gray-400">Service Type</div>
        <div className="text-white font-medium">Express Delivery</div>
    </div>
    <div className="text-center">
        <div className="text-sm text-gray-400">Insurance</div>
        <div className="text-white font-medium">Included</div>
    </div>
    <div className="text-center">
        <div className="text-sm text-gray-400">Tracking</div>
        <div className="text-white font-medium">Real-time</div>
    </div>
</div>
<button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 ... hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 ... rounded-xl transition-all duration-300">
        BOOK NOW /
        <button>
        </button>
    </div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</
```

<!-- BEDA - Combined Source Code -->

Page 65

<!-- Page: 66 -->

```
<Calculator className="w-16 h-16 text-gray-500 mx-auto mb-4" />
<p className="text-gray-400 mb-2">
    Select a destination and enter weight to see pricing
</p>
<p className="text-gray-500 text-sm">
    //
</p>
</div>
}
</div>

{/* Service Features */}
<div className="bg-navy-800/50 backdrop-blur-sm border border-gold-500/20 ... rounded-2xl p-8">
    <h3 className="text-xl font-bold text-white mb-4">
        Why Choose Britium Express?
    </h3>
    <p className="text-gray-300 mb-6">
        Premium logistics services with Myanmar's golden standard
    </p>
    <div className="space-y-4">
        <div className="flex items-start space-x-3">
            <Truck className="w-5 h-5 text-gold-400 mt-1" />
            <div>
                <h4 className="font-semibold text-white">Door-to-Door</h4>
                <p className="text-sm text-gray-400">We pick up from your doorstep and ... deliver directly to the receiver. No need to visit a station.</p>
                </div>
            </div>
            <div className="flex items-start space-x-3">
                <Package className="w-5 h-5 text-gold-400 mt-1" />
                <div>
                    <h4 className="font-semibold text-white">Secure Handling</h4>
                    <p className="text-sm text-gray-400">From documents to fragile parcels, ... our trained staff ensures your items arrive intact.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<Clock className="w-5 h-5 text-gold-400 mt-1" />
<div>
    <h4 className="font-semibold text-white">Real-Time Updates</h4>
    <p className="text-sm text-gray-400">Track your shipment status via our ... Website or Mobile App at any time.</p>
</div>

</div>

</div>

</section>

{/* Header */}
<footer className="bg-navy-900 border-t border-gold-500/20 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
            <div>
                <h3 className="text-xl font-bold text-white mb-4">Britium Express</h3>
                <p className="text-gray-400 text-sm">
                    A dedicated delivery arm of Britium Ventures Company Limited. Providing fast, ... secure, and compliant logistics solutions.
                </p>
            </div>
        </div>
    </div>
</footer>

</结算表>
```

<!-- BEDA - Combined Source Code -->

Page 66

<!-- Page: 67 -->

```
<a href="..." className="text-gray-400 hover:text-gold-400 block">Get Quote</a>
</div>
</div>
<div className="font-semibold text-white mb-4">Reach Out</div>
<div className="space-y-2 text-sm text-gray-400">
    <p>Britium Ventures Company Limited, YANGON, Yangon 11451 My.</p>
    <p>+95-9-897447744, +95-9-897447755</p>
</div>
</div>
<div className="border-t border-gold-500/20 mt-8 pt-8 text-center text-sm ... text-gray-400">
    <p>2026 Britium Ventures Company Limited. All Rights Reserved.</p>
</div>
</div>
</footer>
</div>
};
```

<!-- BEDA - Combined Source Code -->

Page 67

<!-- Page: 68 -->

```
src/components/SignaturePad.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { PenTool, RotateCcw, Check, X } from 'lucid-react';
import { cn } from '@/lib/utils';

interface SignaturePadProps {
    onSignature: (signature: string) => void;
    required?: boolean;
}

export default function SignaturePad({ onSignature, required = true }: SignaturePadProps) {
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize canvas size based on container
    useEffect(() => {
        const updateCanvasSize = () => {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (canvas && container) {
                const rect = container.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = 200; // Fixed height for consistency
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.strokeStyle = '#000000';
                    ctx.lineWidth = 3;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
            }
        };
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as MouseEvent).clientX;
            clientY = (e as MouseEvent).clientY;
        }
        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
    };
}
```

<!-- BEDA - Combined Source Code -->

Page 68

<!-- Page: 69 -->

```
if (!canvas || !ctx) return;
const { x, y } = getCoordinates(e);
ctx.beginPath();
ctx.moveTo(x, y);
setIsDrawing(true);
};
const draw = (e: React.MouseEvent | React.TouchEvent) => {
  if (!isDrawing) return;
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;

  // Prevent scrolling when signing on mobile
  if (e.cancelable) e.preventDefault();

  const { x, y } = getCoordinates(e);
  ctx.lineTo(x, y);
  ctx.stroke();
  setHasSignature(true);
};
const stopDrawing = () => {
  if (isDrawing) {
    setIsDrawing(false);
    saveSignature();
  }
};
const clearSignature = () => {
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext('2d');
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onSignature('');
  }
};
const saveSignature = () => {
  const canvas = canvasRef.current;
  if (canvas && hasSignature) {
    const dataUrl = canvas.toDataURL('image/png');
    onSignature(dataUrl);
  }
};
return (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <Label className="text-sm font-medium flex items-center gap-2">
        <PenTool className="w-4 h-4 text-primary"/>
        Recipient Signature {required && <span className="text-destructive">*/span>}<Label>
        {hasSignature && (<Button variant="ghost" size="sm" onClick={clearSignature} className="h-8 text-xs text-muted-foreground hover:text-destructive">
          <RotateCcw className="w-3 h-3 mr-1"/>
          Clear</Button>
        <//Button>
    </div>
  </div>
  <Card className={cn("overflow-hidden border-2 transition-all duration-200",
```

<!-- BEDA - Combined Source Code -->

Page 69

<!-- Page: 70 -->

```
hasSignature ? "border-primary/20" : "border-dashed border-muted-foreground/30",
isDrawing && "ring-2 ring-primary/20 border-primary"
}>
<CardContent className="p-0 relative">
<div
    ref={containerRef}
    className="w-full bg-white touch-none cursor-crosshair"
    style={{ height: '200px' }}
>
    <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="block w-full h-full"
    />
</div>

{!hasSignature && !isDrawing && (
    <div className="absolute inset-0 flex items-center justify-center ... pointer-events-none opacity-40">
        <div className="text-center">
            <PenTool className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Sign here</p>
        </div>
    </div>
)}

{hasSignature && !isDrawing && (
    <div className="absolute bottom-2 right-2">
        <div className="bg-primary/10 text-primary rounded-full p-1">
            <Check className="w-4 h-4" />
        </div>
    </div>
)}

</CardContent>

</Card>

<p className="text-[10px] text-muted-foreground italic">
    By signing, the recipient confirms the physical condition of the parcel matches the ... recorded status.
</p>
</div>
```

<!-- BEDA - Combined Source Code -->

Page 70

<!-- Page: 71 -->

```
src/components/StatusBadge.tsx

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CheckCircle2, Clock, AlertTriangle, Truck, Package, FileText, Printer, MapPin, UserCheck, XCircle, ShieldAlert, Archive, PackageCheck } from 'lucid-react';
import { SHIPMENT_STATUS, TAG_STATUS, type ShipmentStatus, type TagStatus } from @/lib/index';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface StatusBadgeProps {
    status: ShipmentStatus | TagStatus;
    size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<
    ShipmentStatus | TagStatus,
    { label: string; icon: React.ElementType; color: string }
> = {
    // Shipment Statuses
    [SHIPMENT_STATUS.TT_ASSIGNED_AT_PICKUP]: {
        label: 'Tag Assigned',
        icon: ShieldAlert,
        color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    [SHIPMENT_STATUS.PICKED_UP_PENDING_REGISTRATION]: {
        label: 'Pending Registration',
        icon: Clock,
        color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
    [SHIPMENT_STATUS.REGISTERED_READY_FOR_LABEL]: {
        label: 'Registered',
        icon: FileText,
        color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
    },
    [SHIPMENT_STATUS.LABEL_PRINTED]: {
        label: 'Label Printed',
        icon: Printer,
        color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
    },
    [SHIPMENT_STATUS.LABEL_APPLIED_VERIFIED]: {
        label: 'Label Verified',
        icon: PackageCheck,
        color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    [SHIPMENT_STATUS.ARRIVED_WAREHOUSE_GATE]: {
        label: 'At WH Gate',
        icon: MapPin,
        color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
    }
};
```

<!-- BEDA - Combined Source Code -->

Page 71

<!-- Page: 72 -->

```
},
[SHIPMENT_STATUS.WAREHOUSE_RECEIVED_VERIFIED]: {
    label: 'WH Received',
    icon: Archive,
    color: 'text-primary bg-primary/10 border-primary/20',
},
[SHIPMENT_STATUS.WAREHOUSE_DISPATCHED]: {
    label: 'Dispatched',
    icon: Truck,
    color: 'text-blue-600 bg-blue-600/10 border-blue-600/20',
},
[SHIPMENT_STATUS.IN_TRANSIT_TO_SUBSTATION]: {
    label: 'In Transit',
    icon: Truck,
    color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
},
[SHIPMENT_STATUS.SUBSTATION_RECEIVED_VERIFIED]: {
    label: 'SS Received',
    icon: Package,
    color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
},
[SHIPMENT_STATUS.OUT_FOR_DELIVERY]: {
    label: 'Out for Delivery',
    icon: Truck,
    color: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
},
[SHIPMENT_STATUS.DELIVERED_POD_CAPTURED]: {
    label: 'Delivered',
    icon: CheckCircle2,
    color: 'text-success bg-success/10 border-success/20',
},
[SHIPMENT_STATUS.DELIVERY_FAILED_NDR]: {
    label: 'Delivery Failed',
    icon: XCircle,
    color: 'text-destructive bg-destructive/10 border-destructive/20',
},
// Tag Statuses
[TAG_STATUS.IN_STOCK]: {
    label: 'In Stock',
    icon: Package,
    color: 'text-muted-foreground bg-muted border-border',
},
[TAG_STATUS.ISSUED_TO_RIDER]: {
    label: 'Issued',
    icon: UserCheck,
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
},
[TAG_STATUS.USED]: {
    label: 'Used',
    icon: CheckCircle2,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
},
[TAG_STATUS.VOID]: {
    label: 'Voided',
    icon: XCircle,
    color: 'text-destructive bg-destructive/10 border-destructive/20',
},
[TAG_STATUS.LOST_SUSPECT]: {
    label: 'Lost/Suspect',
    icon: AlertTriangle,
    color: 'text-destructive bg-destructive border-destructive/20... text-destructive-foreground',
},
[TAG_STATUS.RETURNED_TO_STOCK]: {
    label: 'Returned',
    icon: Archive,
    color: 'text-muted-foreground bg-muted border-border',
},
```

<!-- BEDA - Combined Source Code -->

Page 72

<!-- Page: 73 -->

```
export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
    const config = statusConfig[status];

    if (!config) return null;

    const Icon = config.icon;

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-[10px] gap-1',
        md: 'px-2.5 py-1 text-xs gap-1.5',
        lg: 'px-3 py-1.5 text-sm gap-2',
    };

    const iconSizes = {
        sm: 12,
        md: 14,
        lg: 16,
    };

    return (
        <div className={cn('inline-flex items-center font-medium rounded-full border transition-colors', config.color, sizeClasses[size]})}
    >
    <Icon size={iconSizes[size]} className="shrink-0" />
    <span className="whitespace-nowrap">{{config.label}</span>
</div>
```

<!-- BEDA - Combined Source Code -->

Page 73

<!-- Page: 74 -->

```
src/components/ui/accordion.tsx

import * as React from "react"
import * as AccordionPrimitive from "@使用时使用@radix-ui/react-accordion"
import { ChevronDown } from "lucid-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
    <AccordionPrimitive.Item
        ref={ref}
        className={cn("border-b", className)}
        { ...props }
    />
})

AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn("flex flex-1 items-center justify-between py-4 font-medium transition-all ... hover:underline [&[data-state=open]>svg]:rotate-180",
                   className 
            })
            { ...props }
        >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
})

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
    <AccordionPrimitive.Content
        ref={ref}
        className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up ... data-[state=open]:animate-accordion-down"
            { ...props }
        >
        <div className={cn("pb-4 pt-0", className}>{children}<div>
            <AccordionPrimitive.Content>
                {
                    {
                        {
                            {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                                {
                
```

<!-- BEDA - Combined Source Code -->

Page 74

<!-- Page: 75 -->

```
src/components/ui/alert-dialog.tsx

import * as React from "react"
import * as AlertDialogPrimitive from "@oux-ui/react-alert-dialog"

import { cn } from "@lib/utils"
import { buttonVariants } from @/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger
const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
    <AlertDialogPrimitive.Overlay
        className={cn(
            "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in ... data-[state=closed]:animate-out data-[state=closed]:fade-out-0 ... data-[state=open]:fade-in-0",
            className
        })
        { ...props }
        ref={ref}
    }
});

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => {
    <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[50%] ... translate-y-[50%] gap-4 border bg-background p-6 shadow-lg duration-200 ... data-[state=open]:animate-in data-[state=closed]:animate-out ... data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ... data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ... data-[state=closed]:slide-out-to-left-1/2 ... data-[state=closed]:slide-out-to-top-[48%] ... data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] ... sm:rounded-lg",
            className
        })
        { ...props }
    }
    <AlertDialogPortal>
        {
            AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName
        }
        const AlertDialogHeader = (
            className,
            ...props
        }
        : React.HTMLAttributes<HTMLDivElement> => (
            <div
                className={cn(
                "flex flex-col space-y-2 text-center sm:text-left",
                className
            })
            { ...props }
        </div>
    )
}

AlertDialogHeader.displayName = "AlertDialogHeader"
```

<!-- BEDA - Combined Source Code -->

Page 75

<!-- Page: 76 -->

```
const AlertDialogFooter = (
{
    className,
    ...props
}, React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
    {...props}
</div>

AlertDialogFooter.displayName = "AlertDialogFooter"
const AlertDialogTitle = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({
    className, ...props }, ref) => (
        <AlertDialogPrimitive.Title
            ref={ref}
            className={cn("text-lg font-semibold", className)}
            {...props}
        </div>
    </div>
)

AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName
const AlertDialogDescription = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({
    className, ...props }, ref) => (
        <AlertDialogPrimitive.Description
            ref={ref}
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        </div>
    </div>
)

AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName
const AlertDialogAction = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Action>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({
    className, ...props }, ref) => (
        <AlertDialogPrimitive.Action
            ref={ref}
            className={cn(buttonVariants(), className)}
            {...props}
        </div>
    </div>
)

AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName
const AlertDialogCancel = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({
    className, ...props }, ref) => (
        <AlertDialogPrimitive.Cancel
            ref={ref}
            className={cn(
                buttonVariants({ variant: "outline" })
                "mt-2 sm:mt-0",
                className
            })
            {...props}
        </div>
    </div>
)

AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName
export {
    AlertDialog,
}
```

<!-- BEDA - Combined Source Code -->

Page 76

<!-- Page: 77 -->

- AlertDialogPortal,

- AlertDialogOverlay,

- AlertDialogTrigger,

- g gg AlertDialogContent,

- AlertDialogHeader,

- AlertDialogFooter,

- AlertDialogTitle,

- g AlertDialogDescription,

- AlertDialogAction,

- AlertDialogCancel,

<!-- BEDA - Combined Source Code -->

Page 77

<!-- Page: 78 -->

```
src/components/ui/alert.tsx

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
    "relative w-full rounded-lg border p-4 [&>svg~]:pl-7 [&>svg+div]:translate-y-[-3px] ... [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                destructive: "border-destructive/50 text-destructive dark:border-destructive ... [&>svg]:text-destructive",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> >({
    className, variant, ...props }, ref) => (
        <div
            ref={ref}
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        />
    )
    Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement> >({
    className, ...props }, ref) => (
        <h5
            ref={ref}
            className={cn("mb-1 font-medium leading-none tracking-tight", className)}
            {...props}
        />
    )
    AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement> >({
    className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("text-sm [&_p]:leading-relaxed", className)}
            {...props}
        />
    )
    AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
```

<!-- BEDA - Combined Source Code -->

Page 78

<!-- Page: 79 -->

<!-- src/components/ui/aspect-ratio.tsx -->

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }

<!-- BEDA - Combined Source Code -->

Page 79

<!-- Page: 80 -->

```
src/components/ui/avatar.tsx

import * as React from "react"
import * as AvatarPrimitive from "@使用时使用"
import { cn } from "@使用时使用"

const Avatar = React.forwardRef<
    React.ElementRef<type> of AvatarPrimitive.Root>,
    React.ComponentPropsWithoutRef<type> of AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
    ref={ref}
    className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
    })
    { ...props }
</AvatarPrimitive.Root>

const AvatarImage = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
    React.ElementRef<type> of AvatarPrimitive.Image>,
    React.ComponentPropsWithoutRef<type> of AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    { ...props }
</AvatarPrimitive.Image>

const AvatarFallback = React.forwardRef<
    React.ElementRef<type> of AvatarPrimitive.Fallback>,
    React.ComponentPropsWithoutRef<type> of AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
    })
    { ...props }
</Avatar保底. Fallback>

const AvatarFallback.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
    React.ElementRef<type> of AvatarPrimitive.Fallback>,
    React.ComponentPropsWithoutRef<type> of AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
    })
    { ...props }
</Avatar保底. Fallback>

const AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
```

<!-- BEDA - Combined Source Code -->

Page 80

<!-- Page: 81 -->

```
src/components/ui/badge.tsx

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ... transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive: "border-transparent bg-destructive text-destructive-foreground ... hover:bg-destructive/80",
                outline: "text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }{ BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    }
}

export { Badge, badgeVariants }
```

<!-- BEDA - Combined Source Code -->

Page 81

<!-- Page: 82 -->

```
src/components/ui/breadcrumb.tsx

import * as React from "react"
import { Slot } from "@ 代际 "
import { ChevronRight, MoreHorizontal } from "lucid-react"
import { cn } from "@lib/utils"

const Breadcrumb = React.forwardRef<
    HTMLElement,
    React.ComponentPropsWithoutRef<"nav"> & {
        separator: React.ReactNode
    }
>(({...props}, ref) => <nav ref={ref} aria-label="breadcrumb" {...props}/>)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
    HTMLListElement,
    React.ComponentPropsWithoutRef<"ol">
    >(({
        className, ...props, ref) => (
            <ol>
                ref={ref}
                className={cn(
                    "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground ... sm:gap-2.5",
                    className 
                })
                {...props}
            />
        )
    )

BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
    HTMLElement,
    React.ComponentPropsWithoutRef<"li">
    >(({
        className, ...props, ref) => (
            <li>
                ref={ref}
                className={cn("inline-flex items-center gap-1.5", className)}
                {...props}
            />
        )
    )

BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<"a"> & {
        asChild?: boolean
    }
    >(({
        asChild,
        className, ...props, ref) => {
            const Comp = asChild ? Slot : "a"
            return (
                <Comp>
                    ref={ref}
                    className={cn("transition-colors hover:text-foreground", className)}
                    {...props}
                </Comp>
            )
        }
    )

BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
    HTMLSpanElement,
    React.ComponentPropsWithoutRef<"span">
    >(({
        className, ...props, ref) => (
            <span>
                ref={ref}
                role="link"
                aria-disabled="true"
            </span>
        )
    })
```

<!-- BEDA - Combined Source Code -->

Page 82

<!-- Page: 83 -->

```
aria-current="page"
className={cn("font-normal text-foreground", className)}
{...props}

)}

BreadcrumbPage.displayName = "BreadcrumbPage"
const BreadcrumbSeparator = (
{
    children,
    className,
    ...props
} : React.ComponentProps<"li">) => (
    <li
        role="presentation"
        aria-hidden="true"
        className={cn([&>svg]:size-3.5", className)}
    {...props}
    >
    {children ?? <ChevronRight />}
</li>

BreadcrumbSeparator.displayName = "BreadcrumbSeparator"
const BreadcrumbEllipsis = (
{
    className,
    ...props
} : React.ComponentProps<"span">) => (
    <span
        role="presentation"
        aria-hidden="true"
        className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
    >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
</span>

BreadcrumbEllipsis.displayName = "BreadcrumbElipsis"
export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
}
```

<!-- BEDA - Combined Source Code -->

Page 83

<!-- Page: 84 -->

```
src/components/ui/button.tsx

import * as React from "react"
import { Slot } from "@ 代际 x-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@ lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm ... font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 ... focus-visible:ring-luxury-gold/40 disabled:pointer-events-none disabled:opacity-50 ... [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-luxury-gold text-luxury-obsidian hover:bg-amber-500",
                destructive: "bg-red-600 text-white hover:bg-red-500",
                outline: "border border-white/10 bg-transparent text-white/80 hover:bg-white/5 ... hover:text-white",
                secondary: "bg-white/10 text-white hover:bg-white/15",
                ghost: "bg-transparent text-white/70 hover:bg-white/5 hover:text-white",
                link: "bg-transparent text-luxury-gold underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    VariantProps<type> of buttonVariants> {
        asChild?: boolean
    }

    const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
        ({ className, variant, size, asChild = false, ...props }, ref) => {
            const Comp = asChild ? Slot : "button"
            return (
                <Comp
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref}
                    { ...props }
            </Comp>
        })
    }
)

Button.displayName = "Button"

export { Button, buttonVariants }
```

<!-- BEDA - Combined Source Code -->

Page 84

<!-- Page: 85 -->

```
src/components/ui/calendar.tsx

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucid-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}); CalendarProps {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    buttonVariants({ variant: "outline" },
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                    ),
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "h-9 w-9 text-center text-sm p-0 relative
                    ... [&:has([aria-selected].day-range-end]):rounded-r-md
                    ... [&:has([aria-selected].day-outside]):bg-accent/50
                    ... [&:has([aria-selected]).bg-accent first:[&:has([aria-selected])]:rounded-l-md
                    ... last:[&:has([aria-selected])]:rounded-r-md focus-within:relative
                    ... focus-within:z-20",
                    day: cn(
                        buttonVariants({ variant: "ghost" },
                        "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
                    ),
                    day_range_end: "day-range-end",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground
                    ... focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                    day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50
                    ... aria-selected:text-muted-foreground aria-selected:opacity-30",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                    ... classNames,
                })
            components={
                IconLeft: { ..._props } => <ChevronLeft className="h-4 w-4" />,
                IconRight: { ..._props } => <ChevronRight className="h-4 w-4" />,
            }
        }
    };
}
```

<!-- BEDA - Combined Source Code -->

Page 85

<!-- Page: 86 -->

Calendar.displayName = "Calendar";

export { Calendar };

<!-- BEDA - Combined Source Code -->

Page 86

<!-- Page: 87 -->

```
src/components/ui/card.tsx

import * as React from "react"
import { cn } from @/lib/utils

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>> >(({ className, ...props }, ref) => (<div ref={ref}>className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className}>){...props}/>))

Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>> >(({ className, ...props }, ref) => (<div ref={ref}>className={cn("flex flex-col space-y-1.5 p-6", className}>{...props}/>))

CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>> >(({ className, ...props }, ref) => (<h3 ref={ref}>className={cn("text-2xl font-semibold leading-none tracking-tight", className}>){...props}/>))

CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>> >(({ className, ...props }, ref) => (<p ref={ref}>className={cn("text-sm text-muted-foreground", className}>{...props}/>))

CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>> >(({ className, ...props }, ref) => (<div ref={ref}>className={cn("p-6 pt-0", className}>{...props}/>))

CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement,
```

<!-- BEDA - Combined Source Code -->

Page 87

<!-- Page: 88 -->

```
React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
<div 
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    { ...props}
</div>
))

CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

<!-- BEDA - Combined Source Code -->

Page 88

<!-- Page: 89 -->

## src/components/ui/carousel.tsx

```
import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucid-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<type of useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]
type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}
type CarouselContextProps = {
  carouselRef: ReturnType<type of useEmblaCarousel>[0]
  api: ReturnType<type of useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps
const CarouselContext = React.createContext<CarouselContextProps | null>(null)
function useCarousel() {
  const context = React.useContext(CarouselContext)
    if (!context) {
      throw new Error("useCarousel must be used within a <Carousel />")
    }
    return context
}
const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>((
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel({
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)
```

<!-- BEDA - Combined Source Code -->

Page 89

<!-- Page: 90 -->

```
const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) {
        return
    }
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
}, [])

const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
}, [api])

const scrollNext = React.useCallback(() => {
    api?.scrollNext()
}, [api])

const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault()
            scrollPrev()
        } else if (event.key === "ArrowRight") {
            event.preventDefault()
            scrollNext()
        }
    },
    [scrollPrev, scrollNext]
)

React.useEffect(() => {
    if (!api || !setApi) {
        return
    }
    setApi(api)
}, [api, setApi])

React.useEffect(() => {
    if (!api) {
        return
    }
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)
    return () => {
        api?.off("select", onSelect)
    }
}, [api, onSelect])

return (
    <CarouselContext.Provider value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
    }}
)

<div>
    ref={ref}
    onKeyDownCapture={handleKeyDown}
    className={cn("relative", className)}
</div>
```

<!-- BEDA - Combined Source Code -->

Page 90

<!-- Page: 91 -->

```
role="region"
aria-roledescription="carousel"
{...props}

{children}

</div>

</CarouselContext.Provider>

)

Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel()
    return (
        <div ref={carouselRef} className="overflow-hidden">
            <div>
                ref={ref}
                className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
                {...props}
            </div>
        </div>
    )
    )
    CarouselContent.displayName = "CarouselContent"
    const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
        const { orientation } = useCarousel()
        return (
            <div>
                ref={ref}
                role="group"
                aria-roledescription="slide"
                className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
            </div>
        </div>
    )
})

CarouselItem.displayName = "CarouselItem"
const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
        const { orientation, scrollPrev, canScrollPrev } = useCarousel()
        return (
            <Button>ref={ref} variant={variant} size={size} className={cn("absolute h-8 w-8 rounded-full", orientation === "horizontal" ? "min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
        {...props}
    </div>
</CarouselContext.Provider>
```

<!-- BEDA - Combined Source Code -->

Page 91

<!-- Page: 92 -->

```
? "-left-12 top-1/2 -translate-y-1/2"
: "-top-12 left-1/2 -translate-x-1/2 rotate-90",
className
)}
disabled={!canScrollPrev}
onClick={scrollPrev}
{...props}

<ArrowLeft className="h-4 w-4" />
<span className="sr-only">Previous slide</span>
</Button>

)

CarouselPrevious.displayName = "CarouselPrevious"
const CarouselNext = React.forwardRef<HTMLButtonElement,
React.ComponentProps<typeof Button>>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
const { orientation, scrollNext, canScrollNext } = useCarousel()

return (
<Button
ref={ref}
variant={variant}
size={size}
className={cn(
"absolute h-8 w-8 rounded-full",
orientation === "horizontal"
? "-right-12 top-1/2 -translate-y-1/2"
: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
className
)}
disabled={!canScrollNext}
onClick={scrollNext}
{...props}

>
<ArrowRight className="h-4 w-4" />
<span className="sr-only">Next slide</span>
</Button>

)

CarouselNext.displayName = "CarouselNext"
export {
type CarouselApi,
Carousel,
CarouselContent,
CarouselItem,
CarouselPrevious,
CarouselNext,
}
```

<!-- BEDA - Combined Source Code -->

Page 92

<!-- Page: 93 -->

```
src/components/ui/chart.tsx

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
    [k in string]: {
        label?: React.ReactNode
        icon?: React.ComponentType
    } &amp; (
        | { color?: string; theme?: never }
        | { color?: never; theme: Record<keyof typeof THEMES, string> }
    )
}

type ChartContextProps = {
    config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
    const context = React.useContext(ChartContext)

    if (!context) {
        throw new Error("useChart must be used within a <ChartContainer/>")
    }

    return context
}

const ChartContainer = React.forwardRef<HTMLDivElement,
    React.ComponentProps<"div"> &amp; {
        config: ChartConfig
        children: React.ComponentProps<
            typeof RechartsPrimitive.ResponsiveContainer>["children"]
        }
    }(({ id, className, children, config, ...props }, ref) => {
        const uniqueId = React.useId()
        const chartId = `chart-${id || uniqueId.replace(/:/g, "")`
        return (
            <ChartContext.Provider value={{ config }}>
            <div 
                data-chart={chartId}
                ref={ref}
                className={cn(
                  "flex aspect-video justify-center text-xs 
                  ... [&_recharts-cartesian-axis-tick_text]: fill-muted-foreground 
                  ... [&_recharts-cartesian-grid_line[stroke='#ccc']]: stroke-border/50 
                  ... [&_recharts-curve.recharts-toolkit-cursor]: stroke-border 
                  ... [&_recharts-dot[stroke='#fff']]: stroke-transparent 
                  ... [&_recharts-layer]: outline-none 
                  ... [&_recharts-polar-grid[stroke='#ccc']]: stroke-border 
                  ... [&_recharts-radial-bar-background-sector]: fill-muted 
                  ... [&_recharts-rectangle.recharts-toolkit-cursor]: fill-muted 
                  ... [&_recharts-reference-line_[stroke='#ccc']]: stroke-border 
                  ... [&_recharts-sector[stroke='#fff']]: stroke-transparent 
                  ... [&_recharts-sector]: outline-none [&_recharts-surface]: outline-none",
                  className
                )}
            { ...props }
        }
    }
}
```

<!-- BEDA - Combined Source Code -->

Page 93

<!-- Page: 94 -->

```
<ChartStyle id={chartId} config={config} />
<RechartsPrimitive.ResponsiveContainer>
{children}
</RechartsPrimitive.ResponsiveContainer>
</div>
</ChartContext.Provider>

)

ChartContainer.displayName = "Chart"

const ChartStyle = ( { id, config }: { id: string; config: ChartConfig }) => {
    const colorConfig = Object.entries(config).filter([_, config]) => config.theme || config.color
  )
  if (!colorConfig.length) {
    return null
  }
  return (
    <style
      dangerousSetInnerHTML={
        __html: Object.entries(THEMES)
          .map([theme, prefix]) =>
          ${prefix}[data-chart=${{id}}] {
            ${colorConfig}.map([key, itemConfig]) => {
              const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color
              return color ? --color-${key}: ${color}; : null
            }
          ).join("\n")
        }
      )
      .join("\n"),
    }
  }
  />
)

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<HTMLDivElement, React.ComponentProps<type> of RechartsPrimitive.Tooltip> & React.ComponentProps<div> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  }
  >(
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formats,
      color,
      nameKey,
    }
  );
}
```

<!-- BEDA - Combined Source Code -->

Page 94

<!-- Page: 95 -->

```
labelKey,
},
ref
) => {
const { config } = useChart()
const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
        return null
    }
    const [item] = payload
    const key = $labelKey || item.dataKey || item.name || "value";
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" ? config[label as keyof typeof config] ? .label || label : itemConfig ? .label;
    if (labelFormatter) {
        return (
            <div className={cn("font-medium", labelClassName)} > {labelFormatter(value, payload)}
        </div>
    )
}
if (!value) {
    return null
}
return <div className={cn("font-medium", labelClassName)}> {value} <div>
}, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
])
if (!active || !payload?.length) {
    return null
}
const nestLabel = payload.length === 1 && indicator === "dot"
return (
    <div>
        ref={ref}
        className={cn("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50... bg-background px-2.5 py-1.5 text-xs shadow-xl",
            className
        )}
    >
    {!nestLabel ? tooltipLabel : null}
    <div className="grid gap-1.5">
        {payload.map((item, index) => {
            const key = $nameKey || item.name || item.dataKey || "value";
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;
            return (
                <div>
                    key={item.dataKey}
                    className={cn("flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5... [&>svg]:text-muted-foreground",
```

<!-- BEDA - Combined Source Code -->

Page 95

<!-- Page: 96 -->

```
indicator === "dot" && "items-center"

{
    formatter && item?.value != undefined && item.name ? (
        formatter(item.value, item.name, item, index, item.payload)
    ) : (
        <itemConfig>.icon ? (
            <itemConfig.icon />
        ) : (
            !hideIndicator && (
                <div 
                    className={cn(
                        "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                        {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent":
                            indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                        }
                    })
                    style={
                        {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor,
                        }
                    }
                }
            }
        }
    }
    <div 
        className={cn(
            "flex flex-1 justify-between leading-none",
            nextLabel ? "items-end" : "items-center"
        })
    >
    <div className="grid gap-1.5">
        {
            nextLabel ? tooltipLabel : null
            <span className="text-muted-foreground">
                {itemConfig?.label || item.name}
            </span>
        </div>
        {
            item.value && (
                <span className="font-mono font-medium tabular-nums text-foreground">
                    {item.value.toLocaleString()
                    </span>
            }
        }
    </div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
```

<!-- BEDA - Combined Source Code -->

Page 96

<!-- Page: 97 -->

```
>(
{
    className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }
    ref
) => {
    const { config } = useChart()

    if (!payload?.length) {
        return null
    }

    return (
        <div
            ref={ref}
            className={cn(
                "flex items-center justify-center gap-4",
                verticalAlign === "top" ? "pb-3" : "pt-3",
                className
            )}
        >
        {payload.map((item) => {
            const key = $nameKey || item.dataKey || "value";
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            return (
                <div
                    key={item.value}
                    className={cn(
                        "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 ... [&>svg]:text-muted-foreground"
                    )}
                >
                    {itemConfig?.icon && !hideIcon ? (
                        <itemConfig.icon />
                    ) : (
                        <div
                            className="h-2 w-2 shrink-0 rounded-[2px]"
                            style={
                                backgroundColor: item.color,
                            }
                        }
                    }
                )
                }
            }
        </div>
    </div>
)
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
    config: ChartConfig,
    payload: unknown,
    key: string
) {
    if (typeof payload === "object" || payload === null) {
        return undefined
    }

    const payloadPayload = "payload" in payload &&
        typeof payload.payload === "object" &&
        payload.payload === null
        ? payload.payload
        : undefined
    }

    let configLabelKey: string = key;
}
```

<!-- BEDA - Combined Source Code -->

Page 97

<!-- Page: 98 -->

```
if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
) {
    configLabelKey = payload[key as keyof typeof payload] as string
} else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
) {
    configLabelKey = payloadPayload[
        key as keyof typeof payloadPayload
    ] as string
}

return configLabelKey in config
? config[configLabelKey]
: config[key as keyof typeof config]

export {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    ChartStyle,
}
```

<!-- BEDA - Combined Source Code -->

Page 98

<!-- Page: 99 -->

```
src/components/ui/checkbox.tsx

import * as React from "react"
import * as CheckboxPrimitive from "@使用时使用@radio"
import { Check } from "lucid-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
    <checkboxPrimitive.Root>
        ref={ref}
        className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background ... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ... focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ... data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
    )}
    {...props}

    <checkboxPrimitive.Indicator>
        className={cn("flex items-center justify-center text-current")}
    >
    <check className="h-4 w-4" />
    </checkboxPrimitive.Indicator>
</checkboxPrimitive.Root>

)

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓

✓


```

<!-- BEDA - Combined Source Code -->

Page 99

<!-- Page: 100 -->

## src/components/ui/collapsible.tsx

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

<!-- BEDA - Combined Source Code -->

Page 100

<!-- Page: 101 -->

```
src/components/ui/command.tsx

import * as React from "react"
import { type DialogProps } from "@oux-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucid-react"

import { cn } from "@lib/utils"
import { Dialog, DialogContent } from "@components/ui/dialog"

const Command = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive>,
    React.ComponentProps.WithoutRef<typeof CommandPrimitive>
> (({ className, ...props }, ref) => {
    <CommandPrimitive
        ref={ref}
        className={cn(
            "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover
            ... text-popover-foreground",
            className 
        })
    {...props}
</>

<CommandPrimitive
    ref={ref}
    className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover
        ... text-popover-foreground",
        className 
    })
    {...props}
</Command>

<CommandDialog
    ref={ref}
    className = CommandPrimitive.displayName

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ( { children, ...props }: CommandDialogProps) => {
    return (
        <Dialog {...props}>
            <DialogContent className="overflow-hidden p-0 shadow-lg">
                <Command className="&_[cmdk-group-heading]": px-2 [&_[cmdk-group-heading]]: font-medium ... &_[cmdk-group-heading]]: text-muted-foreground ... &_[cmdk-group]: not([hidden]) ~[cmdk-group]: pt-0 [&_[cmdk-group]]: px-2 ... &_[cmdk-input-wrapper]_svg]: h-5 [&_[cmdk-input-wrapper]_svg]: w-5 ... &_[cmdk-input]]: h-12 [&_[cmdk-item]]: px-2 [&_[cmdk-item]]: py-3 ... &_[cmdk-item]_svg]: h-5 [&_[cmdk-item]_svg]: w-5">
                <children>
                </children>
            </DialogContent>
        </Dialog>
    )
}

const CommandInput = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Input>,
    React.ComponentProps.WithoutRef<typeof CommandPrimitive.Input>
> (({ className, ...props }, ref) => {
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <CommandPrimitive.Input
            ref={ref}
            className={cn(
                "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none ... placeholder:text-muted-foreground disabled:cursor-not-allowed ... disabled:opacity-50",
                className 
            })
            {...props}
        </Command>
    </div>
</CommandInput>
```

<!-- BEDA - Combined Source Code -->

Page 101

<!-- Page: 102 -->

```
<CommandPrimitive.List 
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
</CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Empty>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
    <CommandPrimitive.Empty 
        ref={ref}
        className="py-6 text-center text-sm"
        {...props}
    </CommandList.displayName = CommandPrimitive.List.displayName
)

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Group>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Group 
        ref={ref}
        className={cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 ... [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs ... [&_[cmdk-group-heading]]:font-medium ... [&_[cmdk-group-heading]]:text-muted-foreground",
    className 
    })
    {...props}
</CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Separator 
        ref={ref}
        className={cn("--mx-1 h-px bg-border", className)}
    {...props}
</CommandGroup.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Item 
        ref={ref}
        className={cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-s ... outline-none data-[disabled=true]:pointer-events-none ... data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground ... data-[disabled=true]:opacity-50",
    className 
    })
    {...props}
</CommandList.displayName = CommandPrimitive.List.displayName

const CommandList = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.List>
    ref={ref}
    className={cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-s ... outline-none data-[disabled=true]:pointer-events-none ... data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground ... data-[disabled=true]:opacity-50",
    className 
    })
</CommandList.displayName = CommandPrimitive.List.displayName
```

<!-- BEDA - Combined Source Code -->

Page 102

<!-- Page: 103 -->

```
CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = {
    className,
    ...props
}; React.HTMLAttributes<HTMLSpanElement> => {
    return (
        <span
            className={cn(
                "ml-auto text-xs tracking-widest text-muted-foreground",
                className
            )}
            {...props}
        />
    }
}; CommandShortcut.displayName = "CommandShortcut"
```

```
export {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
}
```

```
CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = {
    className,
    ...props
}; React.HTMLAttributes<HTMLSpanElement> => {
    return (
        <span
            className={cn(
                "ml-auto text-xs tracking-widest text-muted-foreground",
                className
            )}
            {...props}
        />
    )
};

CommandShortcut.displayName = "CommandShortcut"

export {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
}
```

<!-- BEDA - Combined Source Code -->

Page 103

<!-- Page: 104 -->

```
src/components/ui/context-menu.tsx

import * as React from "react"
import * as ContextMenuPrimitive from "@使用时使用times"
import { Check, ChevronRight, Circle } from "lucid-react"

import { cn } from "@/lib/utils"

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
    React.ElementRef<type> of ContextMenuPrimitive.SubTrigger>,
    React.ComponentPropsWithoutRef<type> of ContextMenuPrimitive.SubTrigger> & {
        inset?: boolean
    }
);

>(({ className, inset, children, ...props }, ref) => (
    <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn}
    "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm ... outline-none focus:bg-accent focus:text-accent-foreground ... data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
    inset && "pl-8",
    className
    })
    { ...props }
    >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
    </ContextMenuPrimitive.SubTrigger>
)

ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
    React.ElementRef<type> of ContextMenuPrimitive.SubContent>,
    React.ComponentPropsWithoutRef<type> of ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
    <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn}
    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 ... text-popover-foreground shadow-md data-[state=open]:animate-in ... data-[state=closed]:animate-out data-[state=closed]:fade-out-0 ... data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 ... data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 ... data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 ... data-[side=top]:slide-in-from-bottom-2",
    className
    })
    { ...props }
    />
)

ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
    React.ElementRef<type> of ContextMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<type> of ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
    <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content
    </ContextMenuPrimitive>
</ContextMenuCustom>
```

<!-- BEDA - Combined Source Code -->

Page 104

<!-- Page: 105 -->

```
ref={ref}

className={cn(
    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1
    ... text-popover-foreground shadow-md animate-in fade-in-80
    ... data-[state=open]:animate-in data-[state=closed]:animate-out
    ... data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
    ... data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
    ... data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
    ... data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    className
    )}
    {...props}
</ContextMenuPrimitive.Portal>

ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
        inset?: boolean
    }
    >(({
        className, inset, ...props }, ref) => (
        <ContextMenuPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm
            ... outline-none focus:bg-accent focus:text-accent-foreground
            ... data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            inset && "pl-8",
            className
        })
    }
    {...props}
</ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenu珊chexItem = React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
    React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
    >(({
        className, children, checked, ...props }, ref) => (
            <ContextMenuPrimitive.CheckboxItem
            ref={ref}
            className={cn(
                "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2
                ... text-sm outline-none focus:bg-accent focus:text-accent-foreground
                ... data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                className
            })
            checked={checked}
            {...props}
        >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <ContextMenuPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
                </ContextMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </ContextMenuPrimitive.CheckboxItem>
    )
    ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
    React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
    >(({
        className, children, ...props }, ref) => (
            <ContextMenuPrimitive.RadioItem
            ref={ref}
            className={cn(
```

<!-- BEDA - Combined Source Code -->

Page 105

<!-- Page: 106 -->

```
"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 ... text-sm outline-none focus:bg-accent focus:text-accent-foreground ... data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
className
)}
{...props}

<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
    <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current"/>
    </ContextMenuPrimitive.ItemIndicator>
</span>
{children}
</ContextMenuPrimitive.RadioItem>

ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName 
const ContextMenuLabel = React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
        inset?: boolean
    }
>(({
    className, inset, ...props }, ref) => (
        <ContextMenuPrimitive.Label
            ref={ref}
            className={cn(
                "px-2 py-1.5 text-sm font-semibold text-foreground",
                inset && "pl-8",
                className 
            })
            {...props}
        </ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName 
    const ContextMenuSeparator = React.forwardRef<
        React.ElementRef<typeof ContextMenuPrimitive.Separator>,
        React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
    >(({
        className, ...props }, ref) => (
            <ContextMenuPrimitive.Separator
                ref={ref}
                className={cn("--mx-1 my-1 h-px bg-border", className)}
            {...props}
        </ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName 
    const ContextMenuShortcut = (
        className,
        ...props 
    }
    : React.HTMLAttributes<HTMLSpanElement> => {
        return (
            <span
                className={cn(
                "ml-auto text-xs tracking-widest text-muted-foreground",
                className 
            })
            {...props}
        </span>
    }
}

ContextMenuShortcut.displayName = "ContextMenuShortcut"
export {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenu剧院Item,
    ContextMenuRadioItem,
    ContextMenuRadioItem,
}
```

<!-- BEDA - Combined Source Code -->

Page 106

<!-- Page: 107 -->

- ContextMenuShortcut,

- ContextMenuGroup,

- ContextMenuPortal,

- ContextMenuSub,

- ContextMenuSubContent,

- ContextMenuSubTrigger,

- gg ContextMenuRadioGroup,

<!-- BEDA - Combined Source Code -->

Page 107

<!-- Page: 108 -->

```
src/components/ui/dialog.tsx

import * as React from "react"
import * as DialogPrimitive from "@使用时"
import { X } from "lucid-react"

import { cn } from "@使用时"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
    React.ElementRef<type> of DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<type> of DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
    <DialogPrimitive.Overlay>
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in ... data-[state=closed]:animate-out data-[state=closed]:fade-out-0 ... data-[state=open]:fade-in-0",
            className
        })
        {...props}
    </>
})

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
    React.ElementRef<type> of DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<type> of DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content>
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[50%] ... translate-y-[50%] gap-4 border bg-background p-6 shadow-lg duration-200 ... data-[state=open]:animate-in data-[state=closed]:animate-out ... data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ... data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ... data-[state=closed]:slide-out-to-left-1/2 ... data-[state=closed]:slide-out-to-top-[48%] ... data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] ... sm:rounded-lg",
            className
        })
        {...props}
    }

    {children}
    <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ... ring-offset-background transition-opacity hover:opacity-100 focus:outline-none ... focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none ... data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
})

DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = (
    className,
)
```

<!-- BEDA - Combined Source Code -->

Page 108

<!-- Page: 109 -->

```
} : React.HTMLAttributes<HTMLDivElement> => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
    {...props}
</div>

DialogHeader.displayName = "DialogHeader"

const DialogFooter = (
    className,
    ...props
} : React.HTMLAttributes<HTMLDivElement> => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
    {...props}
</div>

DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
        })
    {...props}
</div>

DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
    {...props}
</div>

DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
}
```

<!-- BEDA - Combined Source Code -->

Page 109

<!-- Page: 110 -->

```
src/components/ui/drawer.tsx

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { cn } from "@/lib/utils"

const Drawer = (
    shouldScaleBackground = true,
    ...props
}; React.ComponentProps<type of DrawerPrimitive.Root> => (
    <DrawerPrimitive.Root
        shouldScaleBackground={shouldScaleBackground}
    {...props}
);

const Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
    React.ElementRef<type of DrawerPrimitive.Overlay>,
    React.ComponentProps<type of DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Overlay
        ref={ref}
        className={cn("fixed inset-0 z-50 bg-black/80", className})
    {...props}
);

const DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
    React.ElementRef<type of DrawerPrimitive.Content>,
    React.ComponentProps<type of DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DrawerPortal>
        <DrawerOverlay />
        <DrawerPrimitive.Content
            ref={ref}
            className={cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border ... bg-background",
                   className
            })
        {...props}
    );

    <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
    {children}
    </DrawerPrimitive.Content>
    </DrawerPortal>
);

const DrawerHeader = (
    className,
    ...props
); React.HTMLAttributes<HTMLDivElement> => (
    <div
        className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
);

const DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = (
    className,
    ...props
);

const DrawerFooter = (
    className,
    ...props
);
```

<!-- BEDA - Combined Source Code -->

Page 110

<!-- Page: 111 -->

```
className,
...props 
}: React.HTMLAttributes<HTMLDivElement> => (
<div 
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
/>
)

DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
<DrawerPrimitive.Title 
    ref={ref}
    className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className 
    })
    {...props}
/>
))

DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
<DrawerPrimitive.Description 
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
/>
))

DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
}
```

<!-- BEDA - Combined Source Code -->

Page 111

<!-- Page: 112 -->

```
src/components/ui/ dropdown-menu.tsx

import * as React from "react"
import * as DropdownMenuPrimitive from "@使用时"
import { Check, ChevronRight, Circle } from "lucid-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
    React.ElementRef<type> of DropdownMenuPrimitive.SubTrigger>,
    React.ComponentPropsWithoutRef<type> of DropdownMenuPrimitive.SubTrigger> & {
        inset?: boolean
    }
);

>(({ className, inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm ... outline-none focus:bg-accent data-[state=open]:bg-accent",
        inset && "pl-8",
        className
    })
    {...props}
    >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
    </DropdownMenuPrimitive.SubTrigger>
)

DropdownMenuSubTrigger.displayName =
DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
    React.ElementRef<type> of DropdownMenuPrimitive.SubContent>,
    React.ComponentPropsWithoutRef<type> of DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 ... text-popover-foreground shadow-lg data-[state=open]:animate-in ... data-[state=closed]:animate-out data-[state=closed]:fade-out-0 ... data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 ... data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 ... data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 ... data-[side=top]:slide-in-from-bottom-2",
    className
    })
    {...props}
    />
)

DropdownMenuSubContent.displayName =
DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
    React.ElementRef<type> of DropdownMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<type> of DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
```

<!-- BEDA - Combined Source Code -->

Page 112

<!-- Page: 113 -->

```
<DropdownMenuPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1
        ... text-popover-foreground shadow-md data-[state=open]:animate-in
        ... data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        ... data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
        ... data-[state=open]:zoom-in-95 data-[state=bottom]:slide-in-from-top-2
        ... data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
        ... data-[side=top]:slide-in-from-bottom-2",
        className
    )}
    {...props}
</DropdownMenuPrimitive.Portal>

<DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName 
    const DropdownMenuItem = React.forwardRef<
        React.ElementRef<typeof DropdownMenuPrimitive.Item>,
        React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
            inset?: boolean
        }
    >(({
        className, inset, ...props }, ref) => (
        <DropdownMenuPrimitive.Item
            ref={ref}
            className={cn(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm
                ... outline-none transition-colors focus:bg-accent focus:text-accent-foreground
                ... data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                inset && "pl-8",
                className
            })
        {...props}
    </DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName 
    const DropdownMenu珊珊珊珊珊珊珊珊珊珊珊珊珊珊珊珊珊珊珊珊珊珊珊珊珊
        React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
        React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
        >(({
            className, children, checked, ...props }, ref) => (
                <DropdownMenuPrimitive.CheckboxItem
                ref={ref}
                className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm px-1.5 pl-8 pr-2
                    ... text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground
                    ... data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    className
                })
                checked={checked}
                {...props}
            >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <DropdownMenuPrimitive.ItemIndicator>
                        <Check className="h-4 w-4" />
                    </DropdownMenuPrimitive.ItemIndicator>
                </span>
                {children}
                <DropdownMenuPrimitive.CheckboxItem>
                    {
                        const DropdownMenuRadioItem = React.forwardRef<
                            React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
                            React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
                        >(({
                        className, children, ...props }, ref) => (
                                <DropdownMenuPrimitive.RadioItem
                            )
                        }
                    );
                </DropdownMenuRadioItem>
            </DropdownMenu>
        );
    </DropdownMenu>
</DropdownMenu>
```

<!-- BEDA - Combined Source Code -->

Page 113

<!-- Page: 114 -->

```
ref={ref}

className={cn(
    "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 p... text-sm outline-none transition-colors focus:bg-accent focus:text-accent-font-size:10pt; data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className
)}

{...props}

<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
    <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current"/>
    </DropdownMenuPrimitive.ItemIndicator>
</span>

{children}

</DropdownMenuPrimitive.RadioItem>

)

DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName 
const DropdownMenuLabel = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
        inset?: boolean
    }
    >(({
        className, inset, ...props }, ref) => (
        <DropdownMenuPrimitive.Label
            ref={ref}
            className={cn(
                "px-2 py-1.5 text-sm font-semibold",
                inset && "pl-8",
                className
            })
            {...props}
        </...props>
    </DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName 
    const DropdownMenuSeparator = React.forwardRef<
        React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
        React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
    >(({
        className, ...props }, ref) => (
            <DropdownMenuPrimitive.Separator
            ref={ref}
            className={cn("--mx-1 my-1 h-px bg-muted", className)}
            {...props}
        </...props>
    </DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName 
    const DropdownMenuShortcut = (
        className,
        ...props 
    } : React.HTMLAttributes<HTMLSpanElement> => {
        return (
            <span
            className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
            {...props}
        </span>
    </DropdownMenuShortcut.displayName = "DropdownMenuShortcut"
    export {
        DropdownMenu,
        DropdownMenuTrigger,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenu珊珊Item,
        DropdownMenuRadioItem,
        DropdownMenuLabel,
    }
}
```

<!-- BEDA - Combined Source Code -->

Page 114

<!-- Page: 115 -->

- DropdownMenuSeparator,

- DropdownMenuShortcut,

- DropdownMenuGroup,

- DropdownMenuPortal,

- DropdownMenuSub,

- DropdownMenuSubContent,

- DropdownMenuSubTrigger,

- DropdownMenuRadioGroup,

<!-- BEDA - Combined Source Code -->

Page 115

<!-- Page: 116 -->

```
src/components/ui/form.tsx

import * as React from "react"
import * as LabelPrimitive from "@使用时"
import { Slot } from @使用时
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext, } from "实时hook-form"
import { cn } from @实时hook-form
import { Label } from @实时hook-label
const Form = FormProvider

type FormContextValue<T>
TFieldValues extends FieldValues = FieldValues,
TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>= {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}): ControllerProps<TFieldValues, TName> => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
      </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()
  const fieldState = getFieldState(fieldContext.name, formState)
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }
  const { id } = itemContext
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}
```

<!-- BEDA - Combined Source Code -->

Page 116

<!-- Page: 117 -->

```
const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue
})

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    const id = React.useId()
    return (
        <FormItemContext.Provider value={{ id }}>
            <div ref={ref} className={cn("space-y-2", className)} {...props} />
        </FormItemContext.Provider>
    )
})

FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(({ className, ...props }, ref) => {
        const { error, formItemId } = useFormField()
        return (
            <Label
                ref={ref}
                className={cn(error && "text-destructive", className)}
                htmlFor={formItemId}
                {...props}
            />
        )
    })

FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(({ ...props }, ref) => {
        const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
        return (
            <Slot
                ref={ref}
                id={formItemId}
                aria-describedby={
                    !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
                }
                aria-invalid={!!error}
                {...props}
            />
        )
    })

FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => {
        const { formDescriptionId } = useFormField()
        return (
            <p
                ref={ref}
                id={formDescriptionId}
                className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    })
```

<!-- BEDA - Combined Source Code -->

Page 117

<!-- Page: 118 -->

```
}
FormDescription.displayName = "FormDescription"
const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>> >({ { className, children, ...props }, ref) => { const { error, formMessageId } = useFormField() const body = error ? String(error?.message) : children
    if (!body) {
        return null
    }
    return (
        <p>ref={ref}>id={formMessageId}>className={cn("text-sm font-medium text-destructive", className)} {...props}>
        {body}<p>
    </p>
})
FormMessage.displayName = "FormMessage"
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
```

<!-- BEDA - Combined Source Code -->

Page 118

<!-- Page: 119 -->

```
src/components/ui/hover-card.tsx

import * as React from "react"
import * as HoverCardPrimitive from "@使用时使用@card"
import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
    React.ElementRef<typeof HoverCardPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn}
    "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md
    ... outline-none data-[state=open]:animate-in data-[state=closed]:animate-out
    ... data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
    ... data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
    ... data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
    ... data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    className
    })
    { ...props }
</div>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

>

```

<!-- BEDA - Combined Source Code -->

Page 119

<!-- Page: 120 -->

```
src/components/ui/input-otp.tsx

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucid-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
    React.ElementRef<typeof OTPInput>,
    React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => {
    <OTPInput>
        ref={ref}
        containerClassName={cn(
            "flex items-center gap-2 has-[disabled]:opacity-50",
            containerClassName
        })
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
    }
})

InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
    React.ElementRef<"div">
        React.ComponentPropsWithoutRef<"div">
    >(({ className, ...props }, ref) => {
        <div ref={ref} className={cn("flex items-center", className)} {...props} />
    })

InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
    React.ElementRef<"div">
        React.ComponentPropsWithoutRef<"div"> & { index: number }
    >(({ index, className, ...props }, ref) => {
        const inputOTPContext = React.useContext(OTPInputContext)
        const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]
        return (
            <div>
                ref={ref}
                className={cn(
                    "relative flex h-10 w-10 items-center justify-center border-y border-r border-input... text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                    isActive && "z-10 ring-2 ring-ring ring-offset-background",
                    className
                })
                {...props}
            >
                {char}
                {hasFakeCaret && (
                    <div className="pointer-events-none absolute inset-0 flex items-center... justify-center">
                        <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
                    </div>
                })
            </div>
        })
    }

    InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
    React.ElementRef<"div">
        React.ComponentPropsWithoutRef<"div">
    >(({ ...props }, ref) => {
        <div ref={ref} role="separator" {...props}>
            <Dot />
        </div>
    })
```

<!-- BEDA - Combined Source Code -->

Page 120

<!-- Page: 121 -->

InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

<!-- BEDA - Combined Source Code -->

Page 121

<!-- Page: 122 -->

## src/components/ui/input.tsx

```
src/components/ui/input.tsx

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
{ className, type, ...props }, ref) => {
    return (
        <input type={type}
        className={cn("flex h-10 w-full rounded-md border px-3 py-2", className)}
        ref={ref}
        { ...props}
    />
);

);

Input.displayName = "Input";

export { Input };
```

<!-- BEDA - Combined Source Code -->

Page 122

<!-- Page: 123 -->

```
src/components/ui/label.tsx

import * as React from "react"
import * as LabelPrimitive from "@使用时"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@lib/utils"

const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
    React.ElementRef<typeOf LabelPrimitive.Root>,
    React.ComponentProps.WithoutRef<typeOf LabelPrimitive.Root> &
    VariantProps<typeOf labelVariants>
>(({ className, ...props }, ref) => {
    <LabelPrimitive.Root>
        ref={ref}
        className={cn(labelVariants(), className)}
        {...props}
    })

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
```

<!-- BEDA - Combined Source Code -->

Page 123

<!-- Page: 124 -->

```
src/components/ui/menubar.tsx

import * as React from "react"
import * as MenubarPrimitive from "@使用时"
import { Check, ChevronRight, Circle } from "lucid-react"
import { cn } from "@/lib/utils"

const MenubarMenu = MenubarPrimitive.Menu
const MenubarGroup = MenubarPrimitive.Group
const MenubarPortal = MenubarPrimitive.Portal
const MenubarSub = MenubarPrimitive.Sub
const MenubarRadioGroup = MenubarPrimitive.RadioGroup
const Menubar = React.forwardRef<
    React.ElementRef<type> of MenubarPrimitive.Root>,
    React.ComponentPropsWithoutRef<type> of MenubarPrimitive.Root>
>(({ className, ...props }, ref) => {
    <MenubarPrimitive.Root
        ref={ref}
        className={cn(
            "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
            className
        })
        {...props}
    />
)

Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
    React.ElementRef<type> of MenubarPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<type> of MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => {
    <MenubarPrimitive.Trigger
        ref={ref}
        className={cn(
            "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium
            ... outline-none focus:bg-accent focus:text-accent-foreground
            ... data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
            className
        })
        {...props}
    />
)

MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
    React.ElementRef<type> of MenubarPrimitive.SubTrigger>,
    React.ComponentPropsWithoutRef<type> of MenubarPrimitive.SubTrigger> & {
        inset?: boolean
    }
>(({ className, inset, children, ...props }, ref) => {
    <MenubarPrimitive.SubTrigger
        ref={ref}
        className={cn(
            "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm
            ... outline-none focus:bg-accent focus:text-accent-foreground
            ... data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
            inset && "pl-8",
            className
        })
        {...props}
    >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
</MenubarPrimitive.SubTrigger>
```

<!-- BEDA - Combined Source Code -->

Page 124

<!-- Page: 125 -->

```
)

MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.SubContent>,
                      React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
<MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1
        ... text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out
        ... data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
        ... data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
        ... data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
        ... data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
             className 
        })
    {...props}
</MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.Content>,
                      React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>((
{ className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref 
) => (
<MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
            "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1
            ... text-popover-foreground shadow-md data-[state=open]:animate-in
            ... data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
            ... data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
            ... data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
            ... data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className 
        })
    {...props}
</MenubarPrimitive.Portal>

<MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.Item>,
                      React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean 
}

>(({ className, inset, ...props }, ref) => (
<MenubarPrimitive.Item
    ref={ref}
    className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm
        ... outline-none focus:bg-accent focus:text-accent-foreground
        ... data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
             inset && "pl-8",
             className 
        })
    {...props}
</MenubarPrimitive.Content.displayName>
```

<!-- BEDA - Combined Source Code -->

Page 125

<!-- Page: 126 -->

```
)

MenubarItem.displayName = MenubarPrimitive.Item.displayName

const Menubar德尔撒Item = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.德尔撒BoxItem>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.德尔撒BoxItem>>(({ className, children, checked, ...props }, ref) => {
<MenubarPrimitive.德尔撒BoxItem>ref={ref}

className={cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2...text-sm outline-none focus:bg-accent focus:text-accent-foreground...data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className })

checked={checked}

{...props}

<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
<MenubarPrimitive.ItemIndicator>
<Check className="h-4 w-4" />
</MenubarPrimitive.ItemIndicator>

</span>

{children}

</MenubarPrimitive.CheckboxItem>

MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.RadioItem>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>>(({ className, children, ...props }, ref) => {
<MenubarPrimitive.RadioItem>ref={ref}

className={cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2...text-sm outline-none focus:bg-accent focus:text-accent-foreground...data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className })

{...props}

<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
<MenubarPrimitive.ItemIndicator>
<Circle className="h-2 w-2 fill-current" />
</MenubarPrimitive.ItemIndicator>

</span>

{children}

</MenubarPrimitive.RadioItem>

MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.Label>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
inset?: boolean
}

>(({ className, inset, ...props }, ref) => {
<MenubarPrimitive.Label>ref={ref}

className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className })

{...props}

/>

MenubarLabel.displayName = MenubarPrimitive.Label.displayName
```

<!-- BEDA - Combined Source Code -->

Page 126

<!-- Page: 127 -->

```
const MenubarSeparator = React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => {
    <MenubarPrimitive.Separator
        ref={ref}
        className={cn("--mx-1 my-1 h-px bg-muted", className)}
        { ...props }
    />
})

MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName
const MenubarShortcut = (
    className,
    ...props
);
React.HTMLAttributes<HTMLSpanElement> => {
    return (
        <span
            className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
        { ...props }
    />
})

MenubarShortcut.displayName = "MenubarShortcut"
export {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
    MenubarLabel,
    Menubar剧院,
    MenubarCheckboxItem,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarPortal,
    MenubarSubContent,
    MenubarTrigger,
    MenubarGroup,
    MenubarSub,
    MenubarShortcut,
}
```

```
export {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
    MenubarLabel,
    Menubar剧院BoxItem,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarPortal,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarGroup,
    MenubarSub,
    MenubarShortcut,
}
```

<!-- BEDA - Combined Source Code -->

Page 127

<!-- Page: 128 -->

```
src/components/ui/navigation-menu.tsx

import * as React from "react"
import * as NavigationMenuPrimitive from "@使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时
```

<!-- BEDA - Combined Source Code -->

Page 128

<!-- Page: 129 -->

```
const NavigationMenuContent = React.forwardRef<
    React.ElementRef<type> of NavigationMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<type> of NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => {
    <NavigationMenuPrimitive.Content
        ref={ref}
        className={cn(
            "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out
            ...data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out
            ...data-[motion=from-end]:slide-in-from-right-52
            ...data-[motion=from-start]:slide-in-from-left-52
            ...data-[motion=to-end]:slide-out-to-right-52
            ...data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
            className
        })
        {...props}
    }
})

NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName
const NavigationMenuLink = NavigationMenuPrimitive.Link
const NavigationMenuViewport = React.forwardRef<
    React.ElementRef<type> of NavigationMenuPrimitive.Viewport>,
    React.ComponentPropsWithoutRef<type> of NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => {
    <div className={cn("absolute left-0 top-full flex justify-center")}>
        <NavigationMenuPrimitive.Viewport
            className={cn(
                "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)]
                ...w-full overflow-hidden rounded-md border bg-popover text-popover-foreground
                ...shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out
                ...data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90
                ...md:w-[var(--radix-navigation-menu-viewport-width)]",
                className
            })
            ref={ref}
            {...props}
        </div>
    </div>
})

NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName
const NavigationMenuIndicator = React.forwardRef<
    React.ElementRef<type> of NavigationMenuPrimitive.Indicator>,
    React.ComponentPropsWithoutRef<type> of NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => {
    <NavigationMenuPrimitive.Indicator
        ref={ref}
        className={cn(
            "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden
            ...data-[state=visible]:animate-in data-[state=hidden]:animate-out
            ...data-[state=hidden]:fade-out data-[state=visible]:fade-in",
            className
        })
        {...props}
    </div>
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
</NavigationMenuPrimitive.Indicator>
)

NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName
export {
    navigationMenuTriggerStyle,
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
}
```

<!-- BEDA - Combined Source Code -->

Page 129

<!-- Page: 130 -->

- NavigationMenuLink,

- NavigationMenuContent,

- NavigationMenuTrigger,

- NavigationMenuIndicator,

<!-- BEDA - Combined Source Code -->

Page 130

<!-- Page: 131 -->

```
src/components/ui/pagination.tsx

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucid-react"
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ( { className, ...props }: React.ComponentProps<"nav">) => (
<nav
  role="navigation"
  aria-label="pagination"
  className={cn("mx-auto flex w-full justify-center", className)}
  { ...props}
  />
)

Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
<ul
  ref={ref}
  className={cn("flex flex-row items-center gap-1", className)}
  { ...props}
  />
)

PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<HTMLUListElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
<li ref={ref} className={cn("", className)} { ...props} />
)

PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ( {
  className,
  isActive,
  size = "icon",
  ...props
}): PaginationLinkProps) => (
<a
  aria-current={isActive ? "page" : undefined}
  className={cn(
    buttonVariants({
      variant: isActive ? "outline" : "ghost",
      size,
    }),
    className
  }
  { ...props}
  />
)

PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ( {
  className,
  ...props
}): React.ComponentProps<type of PaginationLink> => (
<PaginationLink
  aria-label="Go to previous page"
  size="default"
)
)
```

<!-- BEDA - Combined Source Code -->

Page 131

<!-- Page: 132 -->

```
className={cn("gap-1 pl-2.5", className)}
{...props}

<ChevronLeft className="h-4 w-4" />
<span>Previous</span>
</PaginationLink>

PaginationPrevious.displayName = "PaginationPrevious"
const PaginationNext = (className,
...props}
: React.ComponentProps<typeof PaginationLink> => (
<PaginationLink
aria-label="Go to next page"
size="default"
className={cn("gap-1 pr-2.5", className)}
{...props}
>
<span>Next</span>
<ChevronRight className="h-4 w-4" />
</PaginationLink>

PaginationNext.displayName = "PaginationNext"
const PaginationEllipsis = (className,
...props}
: React.ComponentProps<"span"> => (
<span
aria-hidden
className={cn("flex h-9 w-9 items-center justify-center", className)}
{...props}
>
<MoreHorizontal className="h-4 w-4" />
<span className="sr-only">More pages</span>
</span>
)

PaginationEllipsis.displayName = "PaginationEllipsis"
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
```

<!-- BEDA - Combined Source Code -->

Page 132

<!-- Page: 133 -->

```
src/components/ui/popover.tsx

import * as React from "react"
import * as PopoverPrimitive from "@使用时"
import { cn } from "@使用时"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content>
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={cn(
                "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md ... outline-none data-[state=open]:animate-in data-[state=closed]:animate-out ... data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ... data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ... data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 ... data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
        })
    },
    { ...props }
</PopoverPrimitive.Portal>

)

PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
```

<!-- BEDA - Combined Source Code -->

Page 133

<!-- Page: 134 -->

```
src/components/ui/progress.tsx

import * as React from "react"
import * as ProgressPrimitive from "@使用时使用@�"
import { cn } from @/lib/utils

const Progress = React.forwardRef<
    React.ElementRef<type>of ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<type>of ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
    <ProgressPrimitive.Root>
        ref={ref}
        className={cn(
            "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
            className
        )}
        {...props}
    >
    <ProgressPrimitive.Indicator>
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
</ProgressPrimitive.Root>

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
```

<!-- BEDA - Combined Source Code -->

Page 134

<!-- Page: 135 -->

```
src/components/ui/radio-group.tsx

import * as React from "react"
import * as RadioGroupPrimitive from "@风险管理"
import { Circle } from "押韵"

import { cn } from "@lib/utils"

const RadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn("grid gap-2", className)}
            { ...props }
            ref={ref}
        />
    )
})

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary ...ring-offset-background focus:outline-none focus-visible:ring-2 ...focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed ...disabled:opacity-50",
            className
        })
        { ...props }
    >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
        </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
})

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
```

<!-- BEDA - Combined Source Code -->

Page 135

<!-- Page: 136 -->

```
src/components/ui/resizable.tsx

import { GripVertical } from "lucid-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = (
    className,
    ...props
);

: React.ComponentProps<type of ResizablePrimitive.PanelGroup> => (
    <ResizablePrimitive.PanelGroup 
        className={cn}
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className 
    )}
    { ...props }
);

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = (
    withHandle,
    className,
    ...props
);

: React.ComponentProps<type of ResizablePrimitive.PanelResizeHandle> & {
    withHandle?: boolean
}) => (
    <ResizablePrimitive.PanelResizeHandle 
        className={cn}
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 ... after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none ... focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 ... data-[panel-group-direction=vertical]:h-px ... data-[panel-group-direction=vertical]:w-full ... data-[panel-group-direction=vertical]:after:left-0 ... data-[panel-group-direction=vertical]:after:h-1 ... data-[panel-group-direction=vertical]:after:w-full ... data-[panel-group-direction=vertical]:after:-translate-y-1/2 ... data-[panel-group-direction=vertical]:after:translate-x-0 ... [&[data-panel-group-direction=vertical]>div]:rotate-90",
    className 
    )}
    { ...props }
);

{ withHandle && (
    <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border ... bg-border">
        <GripVertical className="h-2.5 w-2.5" />
    </div>
});

</ResizablePrimitive.PanelResizeHandle>

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
```

<!-- BEDA - Combined Source Code -->

Page 136

<!-- Page: 137 -->

```
src/components/ui/scroll-area.tsx

import * as React from "react"
import * as ScrollAreaPrimitive from "@使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时，使用时
```

<!-- BEDA - Combined Source Code -->

Page 137

<!-- Page: 138 -->

```
src/components/ui/select.tsx

import * as React from "react"
import * as SelectPrimitive from "@使用时使用@config.config"
import { Check, ChevronDown, ChevronUp } from "lucid-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({
    className, children, ...props }, ref) => {
        <SelectPrimitive.Trigger
            ref={ref}
            className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input
                ... bg-background px-3 py-2 text-sm ring-offset-background
                ... placeholder:text-muted-foreground focus:outline-none focus:ring-ring
                ... focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                ... [&>span]:line-clamp-1",
                className
            })
            {...props}
        >
        {children}
        <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
)

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({
    className, ...props }, ref) => {
        <SelectPrimitive.ScrollUpButton
            ref={ref}
            className={cn(
                "flex cursor-default items-center justify-center py-1",
                className
            })
            {...props}
        >
        <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
)

SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({
    className, ...props }, ref) => {
        <SelectPrimitive.ScrollDownButton
            ref={ref}
            className={cn(
                "flex cursor-default items-center justify-center py-1",
                className
            })
            {...props}
        >
        <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
)
```

<!-- BEDA - Combined Source Code -->

Page 138

<!-- Page: 139 -->

```
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
    React.ElementRef<type> of SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<type> of SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            ref={ref}
            className={cn(
                "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover
                ... text-popover-foreground shadow-md data-[state=open]:animate-in
                ... data-[state=closed]:animate-out data-[state=closed]:fade-out-0
                ... data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
                ... data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2
                ... data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
                ... data-[side=top]:slide-in-from-bottom-2",
                position === "popper" &&
                "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1
                ... data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                className
            )}
            position={position}
            {...props}
        >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
            className={cn(
                "p-1",
                position === "popper" &&
                "h-[var(--radix-select-trigger-height)] w-full
                ... min-w-[var(--radix-select-trigger-width)]"
            )}
        >
        {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
)

SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
    React.ElementRef<type> of SelectPrimitive.Label>,
    React.ComponentPropsWithoutRef<type> of SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Label
        ref={ref}
        className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
</SelectPrimitive.Label>
)

SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
    React.ElementRef<type> of SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<type> of SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8
            ... pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground
            ... data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        })
    {...props}
</SelectPrimitive.Item>

const SelectItem = React.forwardRef<
    React.ElementRef<type> of SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<type> of SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8
            ... pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground
            ... data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        })
    {...props}
</SelectPrimitive.Item>
```

<!-- BEDA - Combined Source Code -->

Page 139

<!-- Page: 140 -->

```
<SelectPrimitive.ItemIndicator>
    <Check className="h-4 w-4" />
</SelectPrimitive.ItemIndicator>

</span>

<SelectPrimitive.ItemText>
{children}
</SelectPrimitive.ItemText>
</SelectPrimitive.Item>

SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({
    className, ...props }, ref) => (
        <SelectPrimitive.Separator
            ref={ref}
            className={cn("--mx-1 my-1 h-px bg-muted", className)}
        {...props}
    </SelectPrimitive.Separator>
);

SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
}
```

<!-- BEDA - Combined Source Code -->

Page 140

<!-- Page: 141 -->

```
src/components/ui/separator.tsx

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from @/lib/utils

const Separator = React.forwardRef<
    React.ElementRef<typeof SeparatorPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
) => (
    <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
            "shrink-0 bg-border",
            orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
            className
        })
        { ...props }
    />
)

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
```

<!-- BEDA - Combined Source Code -->

Page 141

<!-- Page: 142 -->

```
src/components/ui/sheet.tsx

import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucid-react"
import * as React from "react"

import { cn } from "@lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
    React.ElementRef<typeOf SheetPrimitive.Overlay>,
    React.ComponentProps.WithoutRef<typeOf SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => {
    <SheetPrimitive.Overlay
        className={cn(
            "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in ... data-[state=closed]:animate-out data-[state=closed]:fade-out-0 ... data-[state=open]:fade-in-0",
            className 
        })
        { ...props }
        ref={ref}
    />
)

SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
    "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out ... data-[state=open]:animate-in data-[state=closed]:animate-out ... data-[state=closed]:duration-300 data-[state=open]:duration-500",
    {
        variants: {
            side: {
                top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top ... data-[state=open]:slide-in-from-top",
                bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom ... data-[state=open]:slide-in-from-bottom",
                left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left ... data-[state=open]:slide-in-from-left sm:max-w-sm",
                right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right ... data-[state=open]:slide-in-from-right sm:max-w-sm",
            },
            },
            defaultVariants: {
                side: "right",
            }
        }
    )

interface SheetContentProps
    extends React.ComponentProps.WithoutRef<typeOf SheetPrimitive.Content>,
    VariantProps<typeOf sheetVariants> { }

const SheetContent = React.forwardRef<
    React.ElementRef<typeOf SheetPrimitive.Content>,
    SheetContentProps
    >(({ side = "right", className, children, ...props }, ref) => {
        <SheetPortal>
            <SheetOverlay />
            <SheetPrimitive.Content
        }
    </SheetPortal>
</SheetOverlay>
```

<!-- BEDA - Combined Source Code -->

Page 142

<!-- Page: 143 -->

```
ref={ref}

className={cn(sheetVariants({ side })}, className}
{...props}

{children}

<SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ... ring-offset-background transition-opacity hover:opacity-100 focus:outline-none ... focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none ... data-[state=open]:bg-secondary">
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
</SheetPrimitive.Close>

</SheetPrimitive.Content>

</SheetPortal>

)

SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ( {
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )}
    {...props}
  />
)

SheetHeader.displayName = "SheetHeader"

const SheetFooter = ( {
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
    {...props}
  />
)

SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
    <SheetPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
  />
)

SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
    <SheetPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
  />
)

SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
```

<!-- BEDA - Combined Source Code -->

Page 143

<!-- Page: 144 -->

- , , SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal,  ... SheetTitle, SheetTrigger

- Sheet, SheetClose,

<!-- BEDA - Combined Source Code -->

Page 144

<!-- Page: 145 -->

```
src/components/ui/sidebar.tsx

import * as React from "react"
import { Slot } from "@风险管理"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucid-react"

import { useIsMobile } from @/hooks/use-mobile
import { cn } from @/lib/utils
import { Button } from @/components/ui/button
import { Input } from @/components/ui/input
import { Separator } from @/components/ui/separator
import { Sheet, SheetContent } from @/components/ui/sheet
import { Skeleton } from @/components/ui/skeleton
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from @/components/ui/Tooltip

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
    state: "expanded" | "collapsed"
    open: boolean
    setOpen: (open: boolean) => void
    openMobile: boolean
    setOpenMobile: (open: boolean) => void
    isMobile: boolean
    toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
    const context = React.useContext(SidebarContext)
        if (!context) {
            throw new Error("useSidebar must be used within a SidebarProvider."
        }
        return context
    }

    const SidebarProvider = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & {
        defaultOpen?: boolean
        open?: boolean
        onOpenChange?: (open: boolean) => void
    }
    > (
        {
            defaultOpen = true,
            open: openProp,
            onOpenChange: setOpenProp,
            className,
            style,
            children,
            ...props
        },
        ref
    ) => {
        const isMobile = useIsMobile()
    }
}
```

<!-- BEDA - Combined Source Code -->

Page 145

<!-- Page: 146 -->

```
const [openMobile, setOpenMobile] = React.useState(false)

// This is the internal state of the sidebar.
// We use openProp and setOpenProp for control from outside the component.
const [_open, _setOpen] = React.useState(defaultOpen)
const open = openProp ??_open
const setOpen = React.useCallback(
(value: boolean | ((value: boolean) => boolean)) => {
    const openState = typeof value === "function" ? value(open) : value
    if (setOpenProp) {
        setOpenProp(openState)
    } else {
        _setOpen(openState)
    }

    // This sets the cookie to keep the sidebar state.
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; ... max-age=$${SIDEBAR_COOKIE_MAX_AGE}`
},
[setOpenProp, open]

// Helper to toggle the sidebar.
const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
}, [isMobile, setOpen, setOpenMobile])

// Adds a keyboard shortcut to toggle the sidebar.
React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (
            event.key === SIDEBAR_KEYBOARD_SHORTCUT && 
            (event.metaKey || event.ctrlKey)
        ) {
            event.preventDefault()
            toggleSidebar()
        }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
}, [toggleSidebar])

// We add a state so that we can do data-state="expanded" or "collapsed".
// This makes it easier to style the sidebar with Tailwind classes.
const state = open ? "expanded" : "collapsed"

const contextValue = React.useMemo<SidebarContext>(
(() => {
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
}),
[state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar])

return (
    <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
            <div style={
                "sidebar-width": SIDEBAR_WIDTH,
                "sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            }
        );
    }
)
```

<!-- BEDA - Combined Source Code -->

Page 146

<!-- Page: 147 -->

```
...style,
} as React.CSSProperties
}

className={cn(
  "group/sidebar-wrapper flex min-h-svh w-full ... has-[[data-variant=inset]]:bg-sidebar",
  className
})
ref={ref}
{...props}

{children}

</div>

<TooltipProvider>
</ 提供>

<SidebarContext.Provider>
)

SidebarProvider.displayName = "SidebarProvider"
const Sidebar = React.forwardRef<
HTMLDivElement,
React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}

(
  {
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
    ...props
  },
  ref
) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
    if (collapsible === "none") {
        return (
          <div
            <className={cn(
              "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
              className
          )}
          ref={ref}
          {...props}
        >
          {children}
          </div>
        )
    }
    if (isMobile) {
        return (
          <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
            <SheetContent
              data-sidebar="sidebar"
              data-mobile="true"
              className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground ... [&>button]:hidden"
              style={
                {
                  "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                  }
                  as React.CSSProperties
            }
          }
          side={side}
        )
    }
  }
)
```

<!-- BEDA - Combined Source Code -->

Page 147

<!-- Page: 148 -->

```
<div className="flex h-full w-full flex-col">{{children}}</div>
</SheetContent>
</Sheet>

return (
<div
    ref={ref}
    className="group peer hidden md:block text-sidebar-foreground"
    data-state={state}
    data-collapsible={state === "collapsed" ? collapsible : ""}
    data-variant={variant}
    data-side={side}
>
    {{/* This is what handles the sidebar gap on desktop */}}
<div
    className={cn(
        "duration-200 relative h-svh w-[[--sidebar-width] bg-transparent transition-[width]] ... ease-linear",
        "group-data-[collapsible=offcanvas]:w-0",
        "group-data-[side=right]:rotate-180",
        variant === "floating" || variant === "inset"
        ?
        ... "group-data-[collapsible=icon]:w-[calc(var([--sidebar-width-icon)__+_theme(spa ... cing.4))]": "group-data-[collapsible=icon]:w-[[--sidebar-width-icon]]"
    )
</div>
<div
    className={cn(
        "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[[--sidebar-width]] ... transition-[left,right,width] ease-linear md:flex",
        "left"
        ? "left-0"
        ... group-data-[collapsible=offcanvas]:left-[calc(var([--sidebar-width)*-1)]": "right-0"
        ... group-data-[collapsible=offcanvas]:right-[calc(var([--sidebar-width)*-1)]",
        // Adjust the padding for floating and inset variants.
        "left"
        ? "left-0"
        ... group-data-[collapsible=icon]:w-[calc(var([--sidebar-width-icon)__+_theme(spa ... ing.4)__+2px)]": "group-data-[collapsible=icon]:w-[[--sidebar-width-icon]]"
        ... group-data-[side=left]:border-r group-data-[side=right]:border-l",
        "right"
        ? "right-0"
        ... group-data-[collapsible=icon]:w-[[--sidebar-width-icon]]
        ... group-data-[side=left]:border-r group-data-[side=right]:border-l",
        "left"
        ? "left-0"
        ... group-data-[collapsible=icon]:w-[[--sidebar-width-icon)__+_theme(spa ... ing.4)__+2px)]": "group-data-[collapsible=icon]:w-[[--sidebar-width-icon]]"
    )
</div>
<div
    className="flex h-full w-full flex-col bg-sidebar"
    className="flex h-full w-full flex-col bg-sidebar"
    ... group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border-r group-data-[variant=floating]:shadow"
    ... group-data-[variant=floating]:shadow"
>
    {children}
</div>
</div>

Sidebar.displayName = "Sidebar"
const SidebarTrigger = React.forwardRef<React.ElementRef<typeof Button>,
        React.ComponentProps<typeof Button>
        >(({
            className,
            onClick,
            ...props }, ref) => {
```

<!-- BEDA - Combined Source Code -->

Page 148

<!-- Page: 149 -->

```
const { toggleSidebar } = useSidebar()

return (
    <Button
        ref={ref}
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        className={cn("h-7 w-7", className)}
        onClick={(event) => {
            onClick?.({ event })
            toggleSidebar()
        }}
    { ...props }
    >
    <PanelLeft />
    <span className="sr-only">Toggle Sidebar</span>
</Button>

SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar()

    return (
        <button
            ref={ref}
            data-sidebar="rail"
            aria-label="Toggle Sidebar"
            tabIndex={-1}
            onClick={toggleSidebar}
            title="Toggle Sidebar"
            className={cn("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear ... after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] ... hover:after:bg-sidebar-border group-data-[side=left:-right-4 ... group-data-[side=right]:left-0 sm:flex",
            [[data-side=left] &]:cursor-w-resize [[data-side=right] &]:cursor-e-resize",
            [[data-side=left][data-state=collapsed] &]:cursor-e-resize ... [[data-side=right][data-state=collapsed] &]:cursor-w-resize",
            "group-data-[collapsible=offcanvas]:translate-x-0 ... group-data-[collapsible=offcanvas]:after:left-full ... group-data-[collapsible=offcanvas]:hover:bg-sidebar",
            [[data-side=left][data-collapsible=offcanvas] &]:-right-2",
            [[data-side=right][data-collapsible=offcanvas] &]:-left-2",
            className
        })
    { ...props }
</Button>

SidebarRail.displayName = "SidebarRail"

const Sidebar inset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">({ className, ...props }, ref) => {
    return (
        <main
            ref={ref}
            className={cn("relative flex min-h-svh flex-1 flex-col bg-background",
                "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] ... md:peer-data-[variant=inset]:m-2 ... md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 ... md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl
        }
    )
}
```

<!-- BEDA - Combined Source Code -->

Page 149

<!-- Page: 150 -->

```
... md:peer-data-[variant=inset]:shadow",
className
)}
{...props}
/>
)}
SidebarInsert.displayName = "SidebarInsert"
const SidebarInput = React.forwardRef<
    React.ElementRef<typeof Input>,
    React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
    return (
        <Input
            ref={ref}
            data-sidebar="input"
            className={cn(
                "h-8 w-full bg-background shadow-none focus-visible:ring-2 ... focus-visible:ring-sidebar-ring",
                className 
            })
        }
    }
})
SidebarInput.displayName = "SidebarInput"
const SidebarHeader = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            data-sidebar="header"
            className={cn("flex flex-col gap-2 p-2", className)}
            {...props}
        }
    })
SidebarHeader.displayName = "SidebarHeader"
const SidebarFooter = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            data-sidebar="footer"
            className={cn("flex flex-col gap-2 p-2", className)}
            {...props}
        }
    })
SidebarFooter.displayName = "SidebarFooter"
const SidebarSeparator = React.forwardRef<
    React.ElementRef<typeof Separator>,
    React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
    return (
        <Separator
            ref={ref}
            data-sidebar="separator"
            className={cn("mx-2 w-auto bg-sidebar-border", className)}
            {...props}
        }
    })
```

<!-- BEDA - Combined Source Code -->

Page 150