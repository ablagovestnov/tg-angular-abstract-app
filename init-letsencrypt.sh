#!/bin/bash

if ! [ -x "$(command -v certbot)" ]; then
  echo 'Error: certbot is not installed.' >&2
  exit 1
fi

domains=(adventure-finder.com www.adventure-finder.com)
rsa_key_size=4096
data_path="/etc/letsencrypt"
email="a.blagovestnov@yandex.ru" # Adding a valid address is strongly recommended

if [ ! -e "$data_path" ]; then
  mkdir -p "$data_path"
fi

if [ ! -e "$data_path/live/${domains[0]}" ]; then
  echo "### Requesting Let's Encrypt certificate for ${domains[*]} ..."
  certbot certonly --webroot -w /usr/share/nginx/html \
    --email $email \
    --agree-tos \
    --no-eff-email \
    --rsa-key-size $rsa_key_size \
    -d adventure-finder.com -d www.adventure-finder.com
fi

# Set up a cron job to renew the certificates
echo "0 0 * * * /usr/bin/certbot renew --quiet --post-hook 'nginx -s reload'" > /etc/cron.d/certbot-renew
