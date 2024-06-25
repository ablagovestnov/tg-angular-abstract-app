#!/bin/bash

domain="adventure-finder.com"
email="a.blagovestnov@gmail.com"
staging=1 # 1 для тестирования, 0 для реального сертификата

if [ $staging != "0" ]; then
    certbot_args="--staging"
else
    certbot_args=""
fi

# Получение сертификата с использованием Certbot
#certbot --nginx -d $domain -d www.$domain --non-interactive --agree-tos --email $email $certbot_args
certbot --nginx -d adventure-finder.com -d www.adventure-finder.com --non-interactive --agree-tos --email a.blagovestnov@gmail.com

# Перезапуск Nginx для применения новой конфигурации
nginx -s reload
