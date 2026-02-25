#!/bin/bash
# 1. Clear legacy JavaScript files causing duplicate errors
echo "Cleaning .js files..."
find src -name "*.js" -type f -delete
find src -name "*.jsx" -type f -delete

# 2. Inject translation hook into pages that need it
echo "Injecting translation context..."
grep -rl "t(" src/pages/ | xargs grep -L "useLanguageContext" | while read -r file; do
    sed -i '1i import { useLanguageContext } from "@/lib/LanguageContext";' "$file"
    sed -i '/export default function/a \  const { t } = useLanguageContext();' "$file"
done

# 3. Correct property typos
sed -i 's/destinationTownshipTownship/destinationTownship/g' $(grep -rl "destinationTownshipTownship" src/)

# 4. Final Type Install
pnpm add -D @types/recharts @types/react-signature-canvas @types/mapbox-gl