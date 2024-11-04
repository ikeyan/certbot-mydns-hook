#!/bin/bash
source /etc/ikeyan/healthcheckio.env # loads $HEALTHCHECKIO_PING_KEY
# is $CERTBOT_DOMAIN included in space-delimited list of $RENEWED_DOMAINS?
if [[ " $RENEWED_DOMAINS " == *" $CERTBOT_DOMAIN "* ]]; then
    curl --no-progress-meter --retry 3 -X POST "https://hc-ping.com/$HEALTHCHECKIO_PING_KEY/certbot-on-raspberrypi" --data-raw "Renewal successful: $CERTBOT_DOMAIN"
else
    curl --no-progress-meter --retry 3 -X POST "https://hc-ping.com/$HEALTHCHECKIO_PING_KEY/certbot-on-raspberrypi/fail" --data-raw "Renewal failed: $CERTBOT_DOMAIN"
fi
