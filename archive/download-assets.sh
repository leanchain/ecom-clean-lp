#!/bin/bash

# Download Assets Script
# This script downloads all external images and videos to local directories

set -e  # Exit on error

echo "🚀 Starting asset download..."
echo ""

# Create directories if they don't exist
mkdir -p public/images/hero
mkdir -p public/images/gallery
mkdir -p public/images/products
mkdir -p public/images/features
mkdir -p public/images/case-studies
mkdir -p public/images/placeholders
mkdir -p public/videos/hero
mkdir -p public/videos/gallery

echo "📁 Directories created"
echo ""

# Hero Images
echo "📸 Downloading Hero images..."
curl -L -o public/images/hero/hero-1.png "https://framerusercontent.com/images/PkU3Gw8pAzmi2niiMrnBcHuu8I.png"
curl -L -o public/images/hero/hero-2.jpg "https://framerusercontent.com/images/IIwrTUEKmVA8Bc0vqQYJIoYqps.jpg"
curl -L -o public/images/hero/hero-3.png "https://framerusercontent.com/images/tAX01Ow9zlh8EUCDGAfh3hpdQ0.png"
curl -L -o public/images/hero/hero-4.png "https://framerusercontent.com/images/qwVnKblygARf7tiZx5lUDJWpY.png"
curl -L -o public/images/hero/hero-5.png "https://framerusercontent.com/images/4ff2fkZLdJJzmP8U0NhfBfndxk.png"
curl -L -o public/images/hero/hero-6.jpg "https://framerusercontent.com/images/Sl9EJQTfoycU8fTKPQzTCSt7wI.jpg"
curl -L -o public/images/hero/hero-7.jpeg "https://framerusercontent.com/images/D9TgLVUKJBPyEFgeH5cU1lj9W3A.jpeg"
curl -L -o public/images/hero/hero-8.jpg "https://framerusercontent.com/images/A3YTpd3ihmlKdXxeXm0pBEueA.jpg"
curl -L -o public/images/hero/hero-9.jpg "https://framerusercontent.com/images/Tw5d4QXO8KrpmBh9B9bEy8oWm1g.jpg"
curl -L -o public/images/hero/hero-10.jpeg "https://framerusercontent.com/images/jTk7xlHHF1IGEJbjQzmPMpmxz84.jpeg"
curl -L -o public/images/hero/hero-11.jpeg "https://framerusercontent.com/images/IF4Acwwh9jwUUCkAQHXQyyXDiGM.jpeg"
curl -L -o public/images/hero/hero-12.jpeg "https://framerusercontent.com/images/07lRVxK2iyJbSLDBNZxgTnhtlk.jpeg"
curl -L -o public/images/hero/hero-13.jpg "https://framerusercontent.com/images/grEtdsKRFf8M8oKPm7RzOw0uAfg.jpg"

echo "✅ Hero images downloaded (13/13)"
echo ""

# Hero Videos
echo "🎥 Downloading Hero videos..."
curl -L -o public/videos/hero/hero-video-1.mp4 "https://cdn-front.freepik.com/home/anon-rvmp/features/designs/mockup-logo-hover.mp4"
curl -L -o public/videos/hero/hero-video-2.mp4 "https://framerusercontent.com/assets/XX4yEVUD0cQvRpu54Cu7ZwJwGZs.mp4"
curl -L -o public/videos/hero/hero-video-3.mp4 "https://res.papir.cc/assets/v/nano_spinning_fall_0509.mp4"
curl -L -o public/videos/hero/hero-video-4.mp4 "https://framerusercontent.com/assets/Vb7xAqRZpCMTPZp1kkCLENR7ooI.mp4"

echo "✅ Hero videos downloaded (4/4)"
echo ""

# Gallery Images
echo "📸 Downloading Gallery images..."
curl -L -o public/images/gallery/gallery-1.jpeg "https://framerusercontent.com/images/AP8MxsVwC0m6aUew627Uzl3PlY.jpeg"
curl -L -o public/images/gallery/gallery-2.jpg "https://framerusercontent.com/images/OKAPNp5NBx92XHoAfb2IJe5GaE.jpg"
curl -L -o public/images/gallery/gallery-3.jpeg "https://framerusercontent.com/images/jTk7xlHHF1IGEJbjQzmPMpmxz84.jpeg"
curl -L -o public/images/gallery/gallery-4.jpg "https://framerusercontent.com/images/Sl9EJQTfoycU8fTKPQzTCSt7wI.jpg"
curl -L -o public/images/gallery/gallery-5.jpeg "https://framerusercontent.com/images/D9TgLVUKJBPyEFgeH5cU1lj9W3A.jpeg"
curl -L -o public/images/gallery/gallery-6.jpg "https://framerusercontent.com/images/A3YTpd3ihmlKdXxeXm0pBEueA.jpg"
curl -L -o public/images/gallery/gallery-7.jpg "https://framerusercontent.com/images/grEtdsKRFf8M8oKPm7RzOw0uAfg.jpg"
curl -L -o public/images/gallery/gallery-8.jpg "https://framerusercontent.com/images/Tw5d4QXO8KrpmBh9B9bEy8oWm1g.jpg"

echo "✅ Gallery images downloaded (8/8)"
echo ""

# Gallery Videos
echo "🎥 Downloading Gallery videos..."
curl -L -o public/videos/gallery/gallery-video-1.mp4 "https://cdn-front.freepik.com/home/anon-rvmp/features/designs/mockup-logo-hover.mp4"
curl -L -o public/videos/gallery/gallery-video-2.mp4 "https://framerusercontent.com/assets/XX4yEVUD0cQvRpu54Cu7ZwJwGZs.mp4"
curl -L -o public/videos/gallery/gallery-video-3.mp4 "https://res.papir.cc/assets/v/nano_spinning_fall_0509.mp4"
curl -L -o public/videos/gallery/gallery-video-4.mp4 "https://framerusercontent.com/assets/Vb7xAqRZpCMTPZp1kkCLENR7ooI.mp4"
curl -L -o public/videos/gallery/gallery-video-5.mp4 "https://res.papir.cc/assets/v/trimmed_Red_Bag.mp4"

echo "✅ Gallery videos downloaded (5/5)"
echo ""

# Product Images
echo "📸 Downloading Product images..."
curl -L -o public/images/products/product-1.jpeg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random5.jpeg"
curl -L -o public/images/products/product-2.jpeg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg"
curl -L -o public/images/products/product-3.jpeg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random13.jpeg"
curl -L -o public/images/products/product-4.jpeg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg"
curl -L -o public/images/products/product-5.jpeg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg"
curl -L -o public/images/products/product-6.jpeg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random8.jpeg"
curl -L -o public/images/products/product-7.jpeg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random9.jpeg"
curl -L -o public/images/products/product-8.jpeg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random10.jpeg"

echo "✅ Product images downloaded (8/8)"
echo ""

# Feature Images (SVGs)
echo "📸 Downloading Feature images..."
curl -L -o public/images/features/feature-image.svg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
curl -L -o public/images/features/feature-video.svg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
curl -L -o public/images/features/feature-search.svg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"

echo "✅ Feature images downloaded (3/3)"
echo ""

# Case Study Images
echo "📸 Downloading Case Study images..."
curl -L -o public/images/case-studies/case-study-1.jpg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg"
curl -L -o public/images/case-studies/case-study-2.jpg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-o9F8dRoSucM-unsplash.jpg"
curl -L -o public/images/case-studies/case-study-3.jpg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-K1W9OjEgacI-unsplash.jpg"
curl -L -o public/images/case-studies/case-study-4.jpg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-gDmVqxZt1hg-unsplash.jpg"
curl -L -o public/images/case-studies/case-study-5.jpg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-sutfgh5DNIU-unsplash.jpg"
curl -L -o public/images/case-studies/case-study-6.jpg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-ZXLGP2Qh3Mo-unsplash.jpg"

echo "✅ Case Study images downloaded (6/6)"
echo ""

# Placeholder Images (SVGs)
echo "📸 Downloading Placeholder images..."
curl -L -o public/images/placeholders/placeholder-1.svg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
curl -L -o public/images/placeholders/placeholder-2.svg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
curl -L -o public/images/placeholders/placeholder-3.svg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
curl -L -o public/images/placeholders/placeholder-4.svg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg"
curl -L -o public/images/placeholders/placeholder-5.svg "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg"

echo "✅ Placeholder images downloaded (5/5)"
echo ""

echo "🎉 All assets downloaded successfully!"
echo ""
echo "📊 Summary:"
echo "  - Hero images: 13"
echo "  - Hero videos: 4"
echo "  - Gallery images: 8"
echo "  - Gallery videos: 5"
echo "  - Product images: 8"
echo "  - Feature images: 3"
echo "  - Case Study images: 6"
echo "  - Placeholder images: 5"
echo "  - Total: 52 files"
echo ""
echo "✅ Ready to run: npm run dev"

