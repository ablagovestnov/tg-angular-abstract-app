#!/bin/bash

# Получаем сертификат с помощью certbot
certbot certonly --dry-run --nginx -d adventure-finder.com -d www.adventure-finder.com --non-interactive --agree-tos --email  a.blagovestnov@gmail.com
