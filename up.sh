#!/bin/bash

if [[ -z "$1" ]]; then
  echo "Type bucket name" 1>&2
  exit 64
else
  BUCKET="$1"
fi

if [[ -z "$2" ]]; then
  ENV="dev"
else
  ENV="$2"
fi
echo "clicca-$ENV"
sed -i -e "s/\[clicca-$ENV\]/\[default\]/g" ~/.aws/credentials
echo "Build"
ng build --"$ENV"
echo "Cleaning the Bucket"
aws s3 rm s3://$BUCKET --recursive
echo "Creating bucket $2"
aws s3 mb s3://$BUCKET
echo "OK"
echo "Sync file from dist to s3://$BUCKET"
aws s3 sync dist s3://$BUCKET --acl public-read
echo "OK"
echo "Setting"
aws s3 website s3://$BUCKET --index-document index.html --error-document index.html
echo "OK"
echo "Setting permission to public-read"
aws s3api put-bucket-acl --bucket $BUCKET --acl public-read

if [ “$ENV” = “prod” ]
then
 aws cloudfront create-invalidation --distribution-id E1WAJK8GGEJPSR \
 --paths /*
fi

echo "OK"
sed -i -e "s/\[default\]/\[clicca-$ENV\]/g" ~/.aws/credentials