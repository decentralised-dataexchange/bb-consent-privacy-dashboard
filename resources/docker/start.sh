#!/bin/sh
set -e

# inject dynamic condif to index.html
input="config/config.txt"

while IFS='=' read -r key value
do
  #echo "$key $value"
  sed -i -e "s|$key|$value|g" /usr/share/nginx/html/index.html
done < "$input"

exec "$@"
