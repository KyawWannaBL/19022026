<!-- Page: 1 -->

# Setting Up Your Monorepo: A Step-by-Step Guide for the Britium Delivery Platform

Table of Contents

Introduction: Why a Monorepo?

Choosing the Right Tools for Scalability

Package Manager: pnpm

Build System: Turborepo

Step-by-Step Implementation Guide

Step 1: Initializing the Root Project

Step 2: Configuring pnpm Workspaces

Step 3: Establishing the Directory Structure

Step 4: Integrating Turborepo for Task Orchestration

Step 5: Creating the Shared Packages

Step 6: Centralizing TypeScript Configuration

Managing Your Monorepo: Workflow and Scripts

Next Steps: Populating the Platform

Conclusion: A Foundation for Growth

Building a modern, multi-platform application like the Britium Delivery Platform requires a development strategy that prioritizes code sharing, consistency, and efficiency. The plan to develop distinct web and mobile frontends while sharing a common Firebase backend, along with utilities, types, and UI components, points directly to one of the most effective architectural patterns for this scenario: the monorepo.

A monorepo is a single version control repository that holds the code for many different projects. For Britium, this means the Vite/React web app, the Expo mobile app, and all shared libraries will coexist in one place, streamlining development and fostering collaboration.

This guide provides a detailed, step-by-step walkthrough for creating the foundational root structure of your monorepo. We will use a modern toolchain consisting of pnpm for efficient package management and Turborepo for high-performance build orchestration. By the end, you will have a robust and scalable skeleton for the Britium Delivery Platform, ready to be populated with applications and shared logic.

<!-- Page: 2 -->

# Choosing the Right Tools for Scalability

The success of a monorepo heavily relies on the tooling chosen to manage its complexities. For the Britium Delivery Platform, we'll select tools that are widely adopted and purpose-built for performance and developer experience in a monorepo context.

## Package Manager: pnpm

Unlike traditional package managers like npm or Yarn, pnpm is designed with monorepos in mind. Its primary advantages include:

 Disk Space Efficiency: pnpm uses a content-addressable store to save only one copy of a package version on disk, which is then hard-linked to projects. This drastically reduces disk space usage in a monorepo with many shared dependencies.

 Strictness: It creates a non-flat node_modules directory. This means packages can only access dependencies that are explicitly defined in their package.json, preventing phantom dependency issues and ensuring a more reliable build process.

g p  Workspace Support: pnpm has first-class support for workspaces, making it simple to link and manage local packages (e.g., your @britium/ui and @britium/shared libraries) within the monorepo.

## Build System: Turborepo

As a monorepo grows, build and test times can become a bottleneck. Turborepo is a high- performance build system that solves this problem by understanding the dependencies between your projects.

 Task Orchestration: It runs tasks (like build, lint, and test) across all your packages in the correct order and in parallel whenever possible.

 Intelligent Caching: Turborepo caches the output of tasks. If the source code or dependencies of a package haven't changed, it will restore the artifacts from the cache instead of re-running the task, leading to near-instantaneous subsequent builds. This is a game-changer for CI/CD pipelines.

 Dependency Graph Analysis: It visualizes the project graph, helping you understand how your apps and packages are interconnected and identify potential architectural issues like circular dependencies.

> Monorepo vs. Polyrepo: Key Characteristics

> Conceptual Comparison

![chart](https://static-us-img.skywork.ai/prod/nexus/1770143520/cropped_image_14_1770143520767289269.jpg)

<!-- Page: 3 -->

## Step-by-Step Implementation Guide

Now, let's translate theory into practice. Follow these steps to construct the skeleton of the britium- delivery-platform monorepo.

## Step 1: Initializing the Root Project

First, create the main directory for your project and initialize it with a root package.json file. This file will manage workspace-wide development dependencies and define global scripts.

```
# Create the project directory and navigate into it
mkdir britium-delivery-platform
cd britium-delivery-platform
```

```
# Initialize a pnpm project
pnpm init
```

This creates a basic package.json. We will modify it later to add scripts and development dependencies.

## Step 2: Configuring pnpm Workspaces

To inform pnpm that this is a monorepo, create a pnpm-workspace.yaml file in the root directory. This file defines the locations of your projects (workspaces).

```
# Create the workspace configuration file
touch pnpm-workspace.yaml
```

Add the following content to pnpm-workspace.yaml. This tells pnpm to find applications in the apps directory and reusable libraries in the packages directory.

```
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

This configuration is crucial for pnpm to correctly link your local packages together, as detailed in guides on setting up modern monorepos .

## Step 3: Establishing the Directory Structure

With the workspace configured, create the top-level directories as specified in your project plan. This structure provides a clear separation of concerns between deployable applications and shared code.

```
# Create directories for apps, packages, and documentation
mkdir apps packages docs
```

 apps/: Will contain your deployable applications ( web and mobile).

 packages/: Will house your shared libraries ( ui, shared, firebase).

 docs/: A dedicated space for project documentation.

## Step 4: Integrating Turborepo for Task Orchestration

Install Turborepo as a root-level development dependency. Then, create its configuration file to define your task pipeline.

```
# Add Turborepo to the root of the monorepo
pnpm add turbo -D -w
```

<!-- Page: 4 -->

```
# Create the Turborepo configuration file
touch turbo.json
```

Add the following configuration to turbo.json. This defines a basic pipeline for common tasks.

```
$schema": "https://turbo.build/schema.json",
"pipeline": {
    "build": {
        "dependsOn": ["^build"],
        "outputs": ["dist/**", ".next/**", "build/**"]
    },
    "lint": {
        "outputs": []
    },
    "dev": {
        "cache": false,
        "persistent": true
    }
}
```

The "dependsOn": ["^build"] directive is key; it tells Turborepo that before building any package, it must first build all of its internal dependencies . The outputs array specifies which directories to cache.

## Step 5: Creating the Shared Packages

Now, create the subdirectories for your shared packages and initialize each one with its own package.json. This gives each package its own identity and allows it to manage its specific dependencies.

```
For each package ( shared, Firebase, ui), follow these steps:
# Example for the 'shared' package
mkdir packages/shared
mkdir packages/shared/src

# Create a package.json for the 'shared' package
touch packages/shared/package.json
```

Add the following content to packages/shared/package.json. Using a scoped name like @britium/shared is a best practice to avoid conflicts and clearly group your internal packages.

```
{
    "name": "@britium/shared",
    "version": "1.0.0",
    "private": true,
    "main": "/src/index.ts",
    "types": "/src/index.ts",
    "scripts": {
        "lint": "eslint --max-warnings 0"
    },
    "devDependencies": {
        "typescript": "^5.0.0",
        "eslint": "^8.50.0"
    }
}
```

Create a placeholder entry file at packages/shared/src/index.ts. Repeat this process for packages/ui (with name @britium/ui) and packages/firebase (with name @britium/firebase).

## Step 6: Centralizing TypeScript Configuration

To ensure consistent TypeScript settings across all your packages, create a base configuration file in the root directory. Individual packages will then extend this file.

<!-- Page: 5 -->

Create tsconfig.base.json in the project root:

```
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "strict": true,
        "esModuleInterpol": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "declaration": true,
        "declarationMap": true,
        "sourceMap": true,
        "composite": true
    }
}
```

Now, in each of your packages (e.g., packages/shared), create a tsconfig.json that extends this base configuration.

```
// packages/shared/tsconfig.json
{
    "extends": ".../tsconfig.base.json",
    "compilerOptions": {
        "outDir": "dist",
        "rootDir": "src"
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
}
```

This strategy of shared configuration is a cornerstone of maintainable monorepos, preventing configuration drift between packages .

## Managing Your Monorepo: Workflow and Scripts

With the structure in place, the final step is to configure the root package.json to orchestrate tasks across the entire workspace using Turborepo. This provides a single entry point for common development commands.

Update your root package.json with the following scripts:

```
{
    "name": "britium-delivery-platform",
    "private": true,
    "scripts": {
        "build": "turbo build",
        "dev": "turbo dev",
        "lint": "turbo lint",
        "format": "prettier --write \"\*\//.*.{ts,tsx,md}\"
    },
    "devDependencies": {
        "prettier": "^3.2.5",
        "turbo": "^1.13.3",
        "typescript": "^5.4.5"
    },
    "packageManager": "pnpm@8.0.0"
}
```

Now you can run commands from the root directory:

 pnpm build: Builds all apps and packages in the correct order, using the cache for speed.

 pnpm dev: Starts the development servers for all applications simultaneously.

 pnpm lint: Lints all the code across the entire monorepo.

 To run a command for a single app, use the --filter flag: pnpm dev --filter=web.

<!-- Page: 6 -->

# Next Steps: Populating the Platform

Your monorepo is now a well-structured, empty canvas. The subsequent phases of development will involve:

## 1. Initializing Applications:

 In apps/web, run pnpm create vite@latest . -- --template react-ts to set up the React web application.

 In apps/mobile, run npx create-expo-app . to initialize the React Native mobile application.

## 2. Developing Shared Logic:

 Populate packages/shared with common types, validation schemas (e.g., with Zod), and utility functions.

 Develop React components in packages/ui that can be used by both the web and mobile apps.

 Create wrappers for the Firebase SDK in packages/firebase to provide a consistent data access layer.

## 3. Linking Dependencies:

 From within the apps/web directory, run pnpm add @britium/ui @britium/shared to consume the shared packages. pnpm will automatically create symlinks to the local versions.

## Conclusion: A Foundation for Growth

You have successfully established the root structure for the Britium Delivery Platform using a modern monorepo architecture. This setup, powered by pnpm and Turborepo, provides a scalable, efficient, and maintainable foundation. It directly addresses the core project requirement of sharing code and logic between a web and mobile application, setting the stage for rapid and consistent development across your entire platform.

## Reference

[1]Creating separate monorepo CI/CD pipelines with GitHub ...https://blog.logrocket.com/creating-separate-monorepo-

ci-cd-pipelines-github-actions/

[2]Using flat config in monorepo: one config file or multiple? https://github.com/eslint/eslint/discussions/16960

[3]Pattern: Microservice Architecturehttps://microservices.io/patterns/microservices.html

[4]Managing npm Packages in a Monorepository https://medium.com/@nikita-andreev/managing-npm-packages- in-a-monorepository-a-practical-guide-053e9c5ea2f6

<!-- Page: 7 -->

[7]Scaffolding a monorepo with multiple apps and shared ...https://vigerust.dev/articles/monorepo-architecture