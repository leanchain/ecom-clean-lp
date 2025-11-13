#!/bin/bash

# Download Feature284 Assets Script
# This script downloads the feature images for the Feature284 component

set -e  # Exit on error

echo "🚀 Downloading Feature284 assets..."
echo ""

# Create directory if it doesn't exist
mkdir -p public/images/features

echo "📁 Directory ready"
echo ""

# Download Feature284 Images
echo "📸 Downloading Feature284 images..."

curl -L -o public/images/features/ai-image-gen.jpg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img1.jpeg"
echo "✅ AI Image Generation (1/5)"

curl -L -o public/images/features/ai-video-gen.jpg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img7.jpeg"
echo "✅ AI Video Creation (2/5)"

curl -L -o public/images/features/ai-search-opt.jpg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img11.jpeg"
echo "✅ AI Search Optimization (3/5)"

curl -L -o public/images/features/content-enrichment.jpg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img2.jpeg"
echo "✅ Content Enrichment (4/5)"

curl -L -o public/images/features/analytics.jpg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img4.jpeg"
echo "✅ AI Discovery Analytics (5/5)"

echo ""
echo "🎉 All Feature284 assets downloaded successfully!"
echo ""
echo "📊 Summary:"
echo "  - Feature images: 5"
echo ""
echo "✅ Ready to view at http://localhost:3007"

