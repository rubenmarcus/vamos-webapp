#!/bin/bash
echo "Creating bucket $2"
aws s3 mb s3://$2 
echo "OK"
echo "Sync file from $1 to s3://$2"
aws s3 sync $1 s3://$2 --acl public-read
echo "OK"
echo "Setting"
aws s3 website s3://$2 --index-document index.html --error-document index.html
echo "OK"
echo "Setting permission to public-read"
aws s3api put-bucket-acl --bucket $2 --acl public-read
echo "OK"