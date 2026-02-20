#!/bin/bash
# Script para comprimir el proyecto excluyendo archivos innecesarios

PROJECT_NAME="portfolio-diego"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ZIP_NAME="${PROJECT_NAME}_${TIMESTAMP}.zip"

# Directorio del script (raíz del proyecto)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

echo "Comprimiendo proyecto en $ZIP_NAME ..."

zip -r "$ZIP_NAME" . \
  -x "node_modules/*" \
  -x ".git/*" \
  -x ".next/*" \
  -x "out/*" \
  -x "build/*" \
  -x "coverage/*" \
  -x ".pnp" \
  -x ".pnp.js" \
  -x ".DS_Store" \
  -x "*.pem" \
  -x ".env" \
  -x ".env.*" \
  -x ".vercel/*" \
  -x "*.tsbuildinfo" \
  -x "next-env.d.ts" \
  -x "npm-debug.log*" \
  -x "yarn-debug.log*" \
  -x "yarn-error.log*" \
  -x "pnpm-debug.log*" \
  -x ".cursor/*" \
  -x "*.tmp" \
  -x "*.temp" \
  -x "*.log" \
  -x "*.zip"

echo "Listo: $ZIP_NAME"
ls -lh "$ZIP_NAME"
