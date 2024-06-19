#!/bin/bash

# Получаем сертификат с помощью certbot
certbot certonly -v --webroot -w /usr/share/nginx/html -d adventure-finder.com -d www.adventure-finder.com --non-interactive --agree-tos --email a.blagovestnov@gmail.com --staging
cat /var/log/letsencrypt/letsencrypt.log
