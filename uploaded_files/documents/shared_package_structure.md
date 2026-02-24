<!-- Page: 1 -->

# Setting Up the `packages/shared` Module for Britium Monorepo

## Table of Contents

Introduction: The Role of a Shared Package

Core File Structure

Configuration Files

package.json

tsconfig.json

Source Code Breakdown

The `types/` Directory

The `validation/` Directory

The `utils/` Directory

Barrel Files for Clean Exports

Integration and Usage

Conclusion

## Introduction: The Role of a Shared Package

In modern software development, especially within a monorepo architecture, a shared package is a cornerstone of efficiency and consistency. For the Britium Delivery Platform, which encompasses distinct frontend applications for the web ( apps/web) and mobile ( apps/mobile), this package serves as the single source of truth for common business logic, data structures, and utility functions.

By centralizing core elements like TypeScript types, validation schemas, and helper functions, we eliminate code duplication, reduce the risk of inconsistencies between platforms, and significantly streamline the development process. When a data model for an 'Order' changes, we update it once in@britium/shared, and both the web and mobile apps instantly inherit the change.

This document details the creation and contents of the packages/shared module, as requested, providing the complete code for each file. This setup is based on the project's overall structure and requirements outlined in previous discussions. For more context on the project's architecture, you can refer to the initial setup documentation britium_monorepo_setup.html.

<!-- Page: 2 -->

## Core File Structure

The following file structure forms the skeleton of our shared package. It is logically organized to separate concerns: types for data shapes, validation for data integrity, and utils for reusable logic. packages/shared/

```
src/
types/
auth.ts
orders.ts
users.ts
tracking.ts
index.ts
validation/
orderSchema.ts
userSchema.ts
index.ts
utils/
formats.ts
validators.ts
constants.ts
index.ts
package.json
tsconfig.json
```

## Configuration Files

These files define the package's identity, dependencies, and TypeScript compilation settings within the larger monorepo.

## package.json

This file identifies the package as @britium/shared, making it easily importable by other packages in the monorepo (e.g., import { Shipment } from '@britium/shared';). It declares zod as a dependency for schema validation.

```
{
    "name": "@britium/shared",
    "version": "1.0.0",
    "private": true,
    "main": "/dist/index.js",
    "types": "/dist/index.d.ts",
    "scripts": {
        "build": "tsc",
        "dev": "tsc -w"
    },
    "dependencies": {
        "zod": "^3.22.4"
    },
    "devDependencies": {
        "typescript": "^5.3.3"
    }
}
```

## tsconfig.json

This configuration extends the root tsconfig.base.json, ensuring consistent compiler rules across the project. It specifies that the source code is in src/ and the compiled JavaScript output will be placed in the dist/ directory.

<!-- Page: 3 -->

```
{
    "extends": "...//tsconfig.base.json",
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src",
        "composite": true
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
}
```

## Source Code Breakdown

Here is the detailed implementation for each file within the src/ directory.

## Thetypes/Directory

This directory contains all the core TypeScript interfaces and enums that define the data models for the Britium platform.

## src/types/auth.ts

Defines types related to user authentication and session management.

```
import { UserRole } from './users';

export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
}

export interface Session {
    user: AuthUser;
    accessToken: string;
    expiresAt: number;
}
```

## src/types/users.ts

Defines the various user roles and their corresponding data structures.

```
export interface BaseUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    createdAt: string;
}

export interface MerchantProfile extends BaseUser {
    role: 'MERCHANT';
    companyName: string;
    address: Address;
}

export interface RiderProfile extends BaseUser {
    role: 'RIDER';
    vehicleDetails: {
        type: string;
        licensePlate: string;
    };
    currentLocation?: {
```

<!-- Page: 4 -->

```
lat: number;
lng: number;
};
}
// A generic Address type used across different models
export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    contactName: string;
    contactPhone: string;
}
```

## src/types/orders.ts

The most critical types defining shipments, parcels, and their lifecycle. import { Address } from './users';

```
export type ShipmentStatus =
| 'PENDING'
| 'SCHEDULED_FOR_PICKUP'
| 'PICKED_UP'
| 'IN_TRANSIT'
| 'OUT_FOR_DELIVERY'
| 'DELIVERED'
| 'CANCELLED'
| 'FAILED_DELIVERY';

export interface ParcelDetails {
  weight: number; // in kg
  length: number; // in cm
  width: number; // in cm
  height: number; // in cm
  description: string;
  value: number; // declared value
}

export interface CodDetails {
  amount: number;
  isPaid: boolean;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  merchantId: string;
  sender: {
    name: string;
    phone: string;
  };
  pickupAddress: Address;
  receiver: {
    name: string;
    phone: string;
    email?: string;
  };
  deliveryAddress: Address;
  parcelDetails: ParcelDetails;
  status: ShipmentStatus;
  cod?: CodDetails;
  createdAt: string;
  updatedAt: string;
  deliveryNotes?: string;
}
```

## src/types/tracking.ts

Defines the structure for package tracking events. import { ShipmentStatus } from './orders';

<!-- Page: 5 -->

```
export interface TrackingEvent {
    timestamp: string;
    status: ShipmentStatus;
    location: string;
    description: string;
}

export interface TrackingInfo {
    trackingNumber: string;
    history: TrackingEvent[];
    estimatedDelivery: string;
}
```

## Thevalidation/Directory

Using Zod, we create reusable schemas to validate data at the edge—whether it's from an API request, a form submission, or a file upload. This ensures data integrity throughout the system.

## src/validation/userSchema.ts

Schemas for validating user-related data, such as during registration or profile updates. import { z } from 'zod';

```
export const addressSchema = z.object({
    street: z.string().min(5, "Street address is too short"),
    city: z.string().min(2, "City name is required"),
    state: z.string().min(2, "State is required"),
    postalCode: z.string().min(4, "Postal code is required"),
    country: z.string().min(2, "Country is required"),
    contactName: z.string().min(2, "Contact name is required"),
    contactPhone: z.string().min(8, "A valid phone number is required"),
});

export const createUserSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(8, "A valid phone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});
```

## src/validation/orderSchema.ts

Complex schemas for validating new shipment creation, ensuring all required fields are present and correctly formatted.

```
import { z } from 'zod';
import { addressSchema } from './userSchema';
```

```
export const parcelDetailsSchema = z.object({
    weight: z.number().positive("Weight must be a positive number"),
    length: z.number().positive("Length must be a positive number"),
    width: z.number().positive("Width must be a positive number"),
    height: z.number().positive("Height must be a positive number"),
    description: z.string().optional(),
    value: z.number().nonnegative("Value cannot be negative"),
});
```

```
export const createShipmentSchema = z.object({
    pickupAddress: addressSchema,
    deliveryAddress: addressSchema,
    parcelDetails: parcelDetailsSchema,
    cod: z.object({
        amount: z.number().nonnegative(),
    }).optional(),
    deliveryNotes: z.string().optional(),
});
```

<!-- Page: 6 -->

## Theutils/Directory

This directory holds miscellaneous helper functions and constants that can be used across both applications.

## src/utils/constants.ts

A centralized place for application-wide constants.

```
export const AppConfig = {
    appName: 'Britium Delivery',
    currency: 'USD',
};
export const UserRoles = {
    ADMIN: 'ADMIN',
    MERCHANT: 'MERCHANT',
    RIDER: 'RIDER',
    CUSTOMER: 'CUSTOMER',
} as const;
export const ShipmentStatuses = {
    PENDING: 'PENDING',
    SCHEDULED_FOR_PICKUP: 'SCHEDULED_FOR_PICKUP',
    PICKED_UP: 'PICKED_UP',
    IN_TRANSIT: 'IN_TRANSIT',
    OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED',
    FAILED_DELIVERY: 'FAILED_DELIVERY',
} as const;
```

## src/utils/formatters.ts

Functions for consistently formatting data like dates and currency.

```
export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    try {
        return new Intl.DateTimeFormat('en-US', options || defaultOptions).format(new Date(dateString));
    } catch (e) {
        return 'Invalid Date';
    }
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};
```

## src/utils/validators.ts

Custom, reusable validation functions that might be too specific for a general Zod schema.

```
* A simple validator for international phone numbers.
* This is a basic check and can be replaced with a more robust library if needed.
* @param phone The phone number string to validate.
* @returns boolean
*/
export const isValidPhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
};
```

<!-- Page: 7 -->

```
/**
 * Validates if a given string is a valid tracking number format for Britium.
 * Example format: BRT123456789
 * @param trackingNumber The tracking number to validate.
 * @returns boolean
 */
export const isValidTrackingNumber = (trackingNumber: string): boolean => {
    const tracking 分钟数 = /^BRT\d{9}$/;
    return tracking 分钟数.test(trackingNumber);
};
```

## Barrel Files for Clean Exports

Barrel files ( index.ts) are used to re-export modules from a directory, simplifying import statements in other parts of the application.

## src/types/index.ts

```
export * from './auth';
export * from './orders';
export * from './users';
export * from './tracking';
```

## src/validation/index.ts

```
export * from './orderSchema';
export * from './userSchema';
```

## src/index.ts(Main Entry Point)

The root index.ts file exports all public modules from the package, creating a single, clean entry point.

```
export * from './types';
export * from './validation';
export * from './utils/constants';
export * from './utils/formats';
export * from './utils/validators';
```

## Integration and Usage

With this structure in place, consuming the shared code in the web or mobile app becomes trivial. After the monorepo is set up (e.g., with pnpm workspaces), you can import anything exported from @britium/shared directly.

For example, in a React component within apps/web, you could write:

```
import { Shipment, createShipmentSchema, formatCurrency } from '@britium/shared';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
type FormData = z.infer;
const CreateShipmentForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(createShipmentSchema)
    });
    const onSubmit = (data: FormData) => {
        console.log('Validated data:', data);
        // API call to create shipment...
    };
};
```

<!-- Page: 8 -->

<!-- // ... form JSX -->

This example demonstrates importing a type ( Shipment), a validation schema ( createShipmentSchema), and a utility function ( formatCurrency), showcasing the power and convenience of the shared package.

## Conclusion

The packages/shared module is now fully defined and ready for integration. By establishing this robust foundation of shared types, validation rules, and utilities, the Britium Delivery Platform is well-positioned for scalable and maintainable development. This approach ensures that as the platform grows, the web and mobile applications will remain synchronized, reliable, and built upon a consistent set of business rules. The next logical steps would be to build out the packages/ui for shared UI components and packages/firebase for backend interactions, both of which can now leverage the types defined here.