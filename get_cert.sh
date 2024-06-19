#!/bin/bash

# Получаем сертификат с помощью certbot
certbot --dry-run --nginx -w /usr/share/nginx/html -d adventure-finder.com -d www.adventure-finder.com --non-interactive --agree-tos --email a.blagovestnov@gmail.com
