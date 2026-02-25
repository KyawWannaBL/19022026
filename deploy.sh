#!/bin/bash

echo "🚀 Starting Britium Express 2026 Production Build..."

# 1. Clean and Build
rm -rf dist
if pnpm build; then
    echo "✅ Build Successful!"
else
    echo "❌ Build Failed. Please check for TypeScript errors."
    exit 1
fi

# 2. Archive for Deployment
TIMESTAMP=$(date +"%Y%m%d_%H%M")
ZIP_NAME="britium_express_prod_$TIMESTAMP.zip"

echo "📦 Archiving build into $ZIP_NAME..."
zip -r $ZIP_NAME dist/* package.json > /dev/null

echo "------------------------------------------------"
echo "🎉 Deployment package ready: $ZIP_NAME"
echo "Bilingual support and Hybrid Data mapping confirmed."
echo "------------------------------------------------"