#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if ! command -v magick >/dev/null 2>&1; then
  echo "ImageMagick (magick) is required to generate brand assets." >&2
  exit 1
fi

python3 scripts/generate-logo-mark.py

SOURCE="public/brand/beseam-mark-secondary.svg"
FAVICON_DIR="public/favicon"
BACKGROUND="#fafafa"

mkdir -p "$FAVICON_DIR"
cp "$SOURCE" "$FAVICON_DIR/favicon.svg"

# Browser favicon PNG: transparent canvas, 75% mark footprint.
magick -background none "$SOURCE" \
  -resize 72x72 \
  -gravity center \
  -extent 96x96 \
  "$FAVICON_DIR/favicon-96x96.png"

# Apple and installed-app icons use the public-site paper background.
magick -background none "$SOURCE" \
  -resize 132x132 \
  -gravity center \
  -background "$BACKGROUND" \
  -extent 180x180 \
  "$FAVICON_DIR/apple-touch-icon.png"

magick -background none "$SOURCE" \
  -resize 144x144 \
  -gravity center \
  -background "$BACKGROUND" \
  -extent 192x192 \
  "$FAVICON_DIR/web-app-manifest-192x192.png"

magick -background none "$SOURCE" \
  -resize 384x384 \
  -gravity center \
  -background "$BACKGROUND" \
  -extent 512x512 \
  "$FAVICON_DIR/web-app-manifest-512x512.png"

TMP_ICON="$(mktemp --suffix=.png)"
trap 'rm -f "$TMP_ICON"' EXIT
magick -background none "$SOURCE" \
  -resize 48x48 \
  -gravity center \
  -extent 64x64 \
  "$TMP_ICON"
magick "$TMP_ICON" \
  -define icon:auto-resize=48,32,16 \
  "$FAVICON_DIR/favicon.ico"

echo "Generated favicon assets from $SOURCE"
