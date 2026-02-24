<!-- Page: 1 -->

# Deep Dive into the Mobile App

# Structure for the Britium Delivery

Platform

An Architectural Blueprint for apps/mobile/

Project:Britium Delivery Platform

Focus:apps/mobile/Directory

Date:2026-01-29

## 1. Introduction and Project Context

This document provides a comprehensive analysis of the mobile application's directory structure, located at apps/mobile/, within the broader Britium Delivery Platform project. As established in the project's foundational plan, the platform is designed as a monorepo to efficiently manage a shared backend (Firebase) and two distinct frontends: a web application and a mobile application for both Android and iOS.

The mobile app is built using Expo and React Native, a choice that facilitates rapid development and cross-platform compatibility. The structure detailed below is not arbitrary; it is a deliberate architectural design intended to promote scalability, maintainability, and a clear separation of concerns. It leverages the monorepo's strengths by anticipating the use of shared packages for UI components, type definitions, and utility functions, thus ensuring consistency with its web counterpart and reducing code duplication.

## 2. High-Level Directory Overview

At the root of the mobile application workspace, we find a combination of source code, configuration files, and project metadata. Each file and folder plays a critical role in the application's lifecycle, from development and building to deployment.

```
apps/mobile/
src/
components/
screens/
services/
hooks/
store/
types/
utils/
App.tsx
app.json
package.json
tsconfig.json
README.md
```

<!-- Page: 2 -->

**Root-Level File Breakdown**

| File / Directory | Purpose |
| --- | --- |
| src/ | The heart of the application, containing all source code, including components, screens, services, and state management. |
| App.tsx | The main entry point component for the React Native application. It typically sets up navigation, state providers (like Redux or Zustand), and other global contexts. |
| app.json | The core configuration file for the Expo project. It defines metadata such as the app's name, icon, splash screen, version, and crucially, permissions required for native features like location and notifications. |
| package.json | Defines project dependencies (e.g., React, React Native, Expo libraries) and scripts for running, building, and testing the application. |
| tsconfig.json | Configures the TypeScript compiler, specifying rules for type checking, module resolution, and output compilation, ensuring code quality and robustness. |
| README.md | Essential documentation providing instructions on how to set up, run, and contribute to the mobile app project. |


## 3. The Core: A Deep Dive into thesrc/Directory

The src/ directory is meticulously organized to enforce a clean architecture. This separation allows developers to easily locate code, understand its purpose, and contribute without disrupting other parts of the system.

## Thecomponents/Directory: Building Blocks of the UI

This directory houses all reusable React components, forming the visual and interactive foundation of the app. It is further subdivided to distinguish between different types of components.

```
ui/
Button.tsx
Card.tsx
Input.tsx
index.ts
forms/
LoginForm.tsx
OrderForm.tsx
navigation/
TabNavigator.tsx
StackNavigator.tsx
```

## ui/- Atomic Design Principles

This folder contains atomic, presentational components. These are the most basic, reusable UI elements that are agnostic of business logic. Think of them as the app's design system primitives.

<!-- Page: 3 -->

The index.ts file serves as a barrel, exporting all components from a single point for cleaner import statements elsewhere in the app.

## forms/- Composite Components

Components in this folder are more complex. They assemble atomic components from ui/ to create complete forms like LoginForm.tsx. These components manage their own state, handle user input, and perform validation, encapsulating all form-related logic.

## navigation/- Charting the User's Journey

Navigation is a cornerstone of the mobile experience. This directory defines the app's navigational structure using libraries like React Navigation.

 StackNavigator.tsx: Defines stack-based navigation, ideal for flows where screens are pushed onto a stack and can be popped off (e.g., navigating from a list to a detail view, or through a multi- step authentication process).

 TabNavigator.tsx: Creates the main tab bar at the bottom of the screen, allowing users to switch between top-level sections of the app, such as the Rider Dashboard, Wallet, and Profile.

## Thescreens/Directory: The User's Viewport

While components/ contains reusable parts, screens/ contains the top-level components that represent a full screen of the application. A key architectural decision here is the organization by user role, which mirrors the platform's business logic.

```
screens/
auth/
LoginScreen.tsx
RegisterScreen.tsx
rider/
RiderDashboard.tsx
TaskList.tsx
JobDetail.tsx
PickupConfirm.tsx
DeliveryConfirm.tsx
RiderWallet.tsx
RiderProfile.tsx
customer/
TrackingScreen.tsx
OrderHistory.tsx
merchant/
MerchantDashboard.tsx
CreateOrder.tsx
OrderList.tsx
```

 auth/: Handles the user authentication journey.

 rider/: A comprehensive suite of screens for the delivery rider, covering their entire workflow from finding tasks to confirming deliveries and managing their profile.

 customer/: Provides functionality for the end customer, focusing on tracking shipments and viewing past orders.

 merchant/: Empowers merchants to manage their operations, including creating new orders and viewing their order history.

<!-- Page: 4 -->

## Theservices/Directory: The External Communications Layer

centralizing this logic, the rest of the application remains decoupled from the implementation details of data fetching or hardware interaction.

 api.ts: Configures the primary API client (e.g., Axios or Fetch), setting up the base URL, headers, and interceptors for handling authentication tokens or errors globally.

 auth.ts: Contains specific functions for authentication endpoints (e.g., login(email, password),

register(...)), which use the configured client from api.ts.

 location.ts: A critical service for a delivery app. It encapsulates logic for requesting location permissions, subscribing to location updates, and providing this data to the app.

 notifications.ts: Manages push notifications, including registering for a push token, handling incoming notifications when the app is in the foreground, and responding to notification opens.

## Thehooks/,store/,types/, andutils/Directories: The Support System

These directories provide the foundational logic, state, and tooling that support the entire application.

Monorepo Integration: While these directories are defined within apps/mobile/, in a mature monorepo, much of their content—especially in types/ and utils/ —would likely be moved to shared packages/ to be consumed by both the web and mobile apps. The local directories would then handle mobile-specific logic or re-export the shared code.

 hooks/: Contains custom React Hooks that encapsulate reusable stateful logic. For example, useAuth can provide authentication status and user data to any component, abstracting away the underlying state management.

 store/: Home to the global state management solution (e.g., Zustand, Redux Toolkit). authStore.ts would define the state and actions related to authentication, while index.ts would combine all state slices into a single store.

 types/: Centralizes TypeScript type and interface definitions. This ensures type safety across the application and serves as a form of documentation for data structures.

 utils/: A collection of pure, stateless helper functions ( helpers.ts) and application-wide constants ( constants.ts), promoting code reuse and maintainability.

## 4. Conclusion: A Cohesive and Scalable Architecture

The file structure for the apps/mobile/ project is a well-considered blueprint for building a robust and scalable React Native application. By adhering to a clear separation of concerns—dividing code into components, screens, services, hooks, and state—the architecture promotes maintainability and developer productivity. The role-based organization of screens directly reflects the business domains of the Britium Delivery Platform.

This structure is not only effective as a standalone system but is also perfectly positioned to integrate within the larger monorepo. It facilitates the sharing of logic and types with the web application, fulfilling the project's core goal of creating a unified, cross-platform product with maximum code reuse and consistency.