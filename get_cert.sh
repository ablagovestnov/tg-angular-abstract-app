#!/bin/bash

# Получаем сертификат с помощью certbot
certbot certonly --webroot -w /usr/share/nginx/html -d adventure-finder.com -d www.adventure-finder.com --non-interactive --agree-tos --email a.blagovestnov@gmail.com

# Перезагружаем Nginx для применения нового сертификата
nginx -s reload
