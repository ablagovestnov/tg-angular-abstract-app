#!/bin/bash

# Получаем сертификат с помощью certbot
certbot --nginx -d adventure-finder.com -d www.adventure-finder.com --non-interactive --agree-tos --email  a.blagovestnov@gmail.com

cat /etc/nginx/nginx.conf
lsof -i :443
lsof -i :80
