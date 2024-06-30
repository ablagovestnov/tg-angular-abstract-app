#!/bin/bash

# Обновляем сертификаты
certbot renew --quiet

# Перезагружаем Nginx после обновления сертификатов
nginx -s reload
