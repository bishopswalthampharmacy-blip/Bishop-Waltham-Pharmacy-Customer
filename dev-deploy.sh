#!/bin/bash

set -e

# Clean old export and build
rm -rf out/

# Build and export Next.js project
yarn build && yarn export

# Upload to S3
cd out
aws --profile bishops s3 sync . s3://bishops-customer --delete
cd ..

# Invalidate CloudFront cache
aws --profile bishops cloudfront create-invalidation \
  --distribution-id E1S6IM2Q02AUFE \
  --paths "/*"

# Success message
echo " ------------------------------------------------------"
echo "|                                                      |"
echo "|   ✅ Deployed to S3 and CloudFront cache cleared     |"
echo "|     URL: https://dwbuf2bvmvkms.cloudfront.net        |"
echo "|                                                      |"
echo " ------------------------------------------------------"
