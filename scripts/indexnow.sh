#!/usr/bin/env bash
# IndexNow: verilen URL'leri (argüman) ya da argüman yoksa sitemap.xml'deki tüm URL'leri
# Bing/IndexNow'a bildirir. Anahtar dosyasi: /cda92b2369f3a59013018ee7ecced931.txt (herkese acik, gizli degil)
set -euo pipefail
HOST="www.e-devlethizmetleri.com"
KEY="cda92b2369f3a59013018ee7ecced931"
KEY_LOCATION="https://$HOST/$KEY.txt"

if [ "$#" -gt 0 ]; then
  URLS=("$@")
else
  mapfile -t URLS < <(curl -fsS "https://$HOST/sitemap.xml" | grep -oE '<loc>[^<]+' | sed 's/<loc>//')
fi

[ "${#URLS[@]}" -gt 0 ] || { echo "Bildirilecek URL yok"; exit 0; }

LIST=$(printf '"%s",' "${URLS[@]}")
BODY="{\"host\":\"$HOST\",\"key\":\"$KEY\",\"keyLocation\":\"$KEY_LOCATION\",\"urlList\":[${LIST%,}]}"

CODE=$(curl -sS -o /dev/null -w '%{http_code}' -X POST "https://api.indexnow.org/indexnow"   -H 'Content-Type: application/json; charset=utf-8' -d "$BODY")
echo "IndexNow: ${#URLS[@]} URL gonderildi, HTTP $CODE"
case "$CODE" in 200|202) exit 0;; *) exit 1;; esac
