<!-- Page: 1 -->

# Britium Monorepo: Web Application Structure (apps/web/)

## Table of Contents

## Introduction

This document provides a comprehensive overview of the web application's directory structure, located at apps/web/ within the Britium Delivery Platform monorepo. As outlined in the project's execution plan, this web application is one of the primary frontends, built using a modern stack like Vite and React. The structure is designed to be scalable, maintainable, and logically organized to support multiple user-facing portals: Public, Merchant, Administrative, and Rider.

The goal is to establish a clear separation of concerns, making it easy for developers to locate files, understand data flow, and contribute to the codebase efficiently. This structure leverages best practices from the React ecosystem and is tailored to the specific needs of the Britium platform.

This detailed breakdown expands upon the initial structure provided, incorporating standard folders for hooks, state management, and routing to create a robust foundation for development.

<!-- Page: 2 -->

## High-Level Directory Structure

The following tree represents the complete, recommended file structure for the apps/web/ application. It organizes files by feature and function, promoting a clean and scalable architecture. / /

```
public/
    favicon.ico
    index.html
    assets/
        src/
        api/
            auth.ts
            orders.ts
            payments.ts
            tracking.ts
            assets/
                icons/
                images/
                styles/
                _variables.scss
                main.scss
            components/
                common/
                Button.tsx
                Input.tsx
                Modal.tsx
                layout/
                AdminLayout.tsx
                MerchantLayout.tsx
                PublicLayout.tsx
                RiderLayout.tsx

context/
    AuthContext.tsx
    ThemeContext.tsx

hooks/
    useAuth.ts
    useApi.ts

pages/
    admin/
        Dashboard.tsx
        UserManagement.tsx
        AdminSettings.tsx
        merchant/
        CreateShipment.tsx
        BulkUpload.tsx
        MerchantFinance.tsx
        MerchantPickups.tsx
        public/
        HomePage.tsx
        ShippingCalculator.tsx
        ReceiverTracking.tsx
        rider/
            ActiveDeliveries.tsx
            DeliveryHistory.tsx

routes/
    AppRouter.tsx
    types/
        index.ts
    utils/
        formats.ts
        validators.ts
    App.tsx
    main.tsx

package.json
tsconfig.json
vite.config.ts
```

<!-- Page: 3 -->

## Detailed Breakdown

Each directory and file within the structure serves a distinct purpose. Understanding these roles is key to maintaining the integrity of the architecture.

## public/ - The Public Root

This directory contains static assets that are not processed by the build tool (Vite). Files here are copied directly to the root of the build output folder. It's the right place for assets that must retain their exact file names or are referenced directly in index.html.

 index.html: The main HTML entry point for the application. The React app is mounted into a root element within this file.

 favicon.ico: The website's icon displayed in browser tabs.

## src/ - The Application Source

The src directory is the heart of the web application. It contains all the JavaScript/TypeScript code, styles, and assets that are bundled together to create the final product.

## src/api/ - Backend Communication Layer

This directory abstracts all interactions with the backend (Firebase). Each file typically groups related API calls, making the data-fetching logic reusable and easy to manage. This approach decouples the UI components from the specifics of the backend implementation.

 auth.ts: Functions for user authentication (e.g., login, logout, register).

 orders.ts: Functions for creating, reading, updating, and deleting orders/shipments.

 tracking.ts: Functions related to real-time shipment tracking.

 payments.ts: Functions for handling payment processing and financial data.

## src/assets/ - Processed Static Assets

Unlike the public folder, assets in src/assets are imported directly into your

JavaScript/TypeScript files. They are processed and optimized by Vite during the build, which can include hashing file names for better caching.

 images/: For static images like logos or background pictures.

 icons/: For SVG icons that can be imported as React components.

 styles/: For global stylesheets, CSS/Sass variables, and mixins.

## src/components/ - Reusable UI Elements

This directory is for all React components. To keep it organized, it's subdivided by function.

 common/: Contains highly reusable, "dumb" components that are shared across the entire application, such as buttons, inputs, modals, and spinners. These components are sourced from or are candidates for the shared packages/ui library in the monorepo.

 layout/: Components that define the structure of pages for different user portals (e.g., AdminLayout, MerchantLayout). They typically include headers, footers, and navigation sidebars.

<!-- Page: 4 -->

More complex, feature-specific components are often co-located with the pages that use them inside the src/pages/ directory to improve modularity.

## src/context/ - Global State Management

For managing global state using React's Context API. This is ideal for state that needs to be accessible by many components at different levels of the component tree, such as user authentication status or theme settings.

 AuthContext.tsx: Provides authentication state (e.g., current user, token) to the entire app.

 ThemeContext.tsx: Manages UI theme (e.g., light/dark mode).

## src/hooks/ - Custom React Hooks

Custom hooks allow you to extract component logic into reusable functions. This directory houses hooks that encapsulate business logic, API interactions, or complex state management.

 useAuth.ts: A hook that provides a simple interface to the AuthContext and its functions.

 useApi.ts: A generic hook for handling API requests, managing loading, error, and data states.

## src/pages/ - Application Screens & Portals

This directory contains the top-level components for each page or "screen" in the application. The structure is organized by user portal, reflecting the distinct sections of the Britium platform.

 admin/: Screens for the administrative portal (e.g., user management, system dashboard).

 merchant/: Screens for the merchant portal (e.g., creating shipments, viewing finances).

 public/: Screens accessible to everyone (e.g., homepage, package tracking).

 rider/: Screens for the rider-specific application (e.g., viewing assigned deliveries).

## src/routes/ - Routing Configuration

This directory centralizes the application's routing logic. Using a library like react-router-dom, it defines which component to render for each URL path and handles protected routes for different user roles.

 AppRouter.tsx: The main component that sets up all the routes, including public, private, and role-specific routes (e.g., redirecting non-admin users from admin pages).

## src/types/ - TypeScript Definitions

A central place for shared TypeScript interfaces and types. This promotes type safety and reusability across the application. Many of these types could eventually be moved to the packages/shared directory to be used by both the web and mobile apps.

## src/utils/ - Utility Functions

This directory is for pure, helper functions that can be used anywhere in the application. These functions should not have any side effects and are typically used for data transformation or formatting.

 formatters.ts: Functions for formatting dates, currencies, etc.

 validators.ts: Functions for validating form inputs like emails or passwords.

<!-- Page: 5 -->

## Key Configuration Files

Several configuration files at the root of apps/web/ are critical for the project's setup and build process.

 package.json: Defines project metadata, scripts (e.g., dev, build), and dependencies specific to the web application.

pp  vite.config.ts: The configuration file for Vite. It specifies build settings, plugins, and development server options.

p  tsconfig.json: The TypeScript compiler configuration file. It defines rules for how TypeScript code is transpiled into JavaScript.

## Architectural Flow Diagram

The following diagram illustrates the architectural flow and dependencies within the apps/web application and its relationship with other parts of the monorepo. It shows how user requests flow through the routing layer to pages, which in turn compose layouts and components. These components and pages leverage hooks for logic, context for state, and an API layer to communicate with the Firebase backend.

![image](https://static-us-img.skywork.ai/prod/nexus/1770143519/cropped_image_7_1770143519643850665.jpg)

**Diagram: Web Application Architectural Flow**

## Conclusion

The proposed directory structure for apps/web/ provides a robust and scalable foundation for the Britium Delivery Platform's web frontend. By adhering to a clear separation of concerns and organizing files by function and feature, this architecture promotes code reusability, simplifies maintenance, and enhances developer productivity. It is designed to integrate seamlessly into the larger monorepo, facilitating code sharing with the mobile app and other packages. As the project

<!-- Page: 6 -->

evolves, this structured approach will enable the team to build out the various portals and features in a clean and manageable way.