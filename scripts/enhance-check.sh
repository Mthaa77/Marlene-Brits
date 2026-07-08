#!/bin/bash
# Marlene Brits Attorneys - Continuous Enhancement Check Script
# Verifies website health and logs status

PROJECT_DIR="/home/z/my-project"
LOG_FILE="$PROJECT_DIR/enhancement-log.txt"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] Enhancement check started" >> "$LOG_FILE"

# Check 1: Verify dev server is running
if ! curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    echo "[$TIMESTAMP] WARNING: Dev server not responding" >> "$LOG_FILE"
else
    echo "[$TIMESTAMP] Dev server is healthy" >> "$LOG_FILE"
fi

# Check 2: Run lint check
cd "$PROJECT_DIR"
LINT_RESULT=$(bun run lint 2>&1)
if [ $? -eq 0 ]; then
    echo "[$TIMESTAMP] Lint check: PASSED" >> "$LOG_FILE"
else
    echo "[$TIMESTAMP] Lint check: ISSUES FOUND" >> "$LOG_FILE"
    echo "$LINT_RESULT" >> "$LOG_FILE"
fi

# Check 3: Verify key component files exist
KEY_FILES=(
    "src/app/page.tsx"
    "src/components/premium/Navigation.tsx"
    "src/components/sections/HeroSection.tsx"
    "src/components/sections/AboutSection.tsx"
    "src/components/sections/ProcessSection.tsx"
    "src/components/sections/TeamSection.tsx"
    "src/components/sections/ServicesSection.tsx"
    "src/components/sections/CaseResultsSection.tsx"
    "src/components/sections/WhyChooseUsSection.tsx"
    "src/components/sections/TestimonialsSection.tsx"
    "src/components/sections/ContactSection.tsx"
)

ALL_FILES_EXIST=true
for file in "${KEY_FILES[@]}"; do
    if [ ! -f "$PROJECT_DIR/$file" ]; then
        echo "[$TIMESTAMP] MISSING: $file" >> "$LOG_FILE"
        ALL_FILES_EXIST=false
    fi
done

if [ "$ALL_FILES_EXIST" = true ]; then
    echo "[$TIMESTAMP] All key files present" >> "$LOG_FILE"
fi

echo "[$TIMESTAMP] Enhancement check completed" >> "$LOG_FILE"
echo "---" >> "$LOG_FILE"
