#!/bin/bash

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

cp -Rf images/ docs/ 

sed -i "s/\[\[tag\]\]/$PACKAGE_VERSION/g" docs/_config.yml

echo "Updated _config.yml folder with version '$PACKAGE_VERSION'"