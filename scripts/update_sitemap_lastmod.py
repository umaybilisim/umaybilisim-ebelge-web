"""sitemap.xml içindeki her <lastmod> değerini, ilgili HTML dosyasının son git commit tarihine eşitler.

Kullanım (repo kökünden):  python scripts/update_sitemap_lastmod.py
İçerik değişikliği commit edildikten SONRA çalıştırın, sonra sitemap.xml'i ayrıca commit edin.
"""
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITEMAP = os.path.join(ROOT, 'sitemap.xml')
HOST = 'https://www.e-devlethizmetleri.com'


def url_to_file(url):
    path = url[len(HOST):] if url.startswith(HOST) else url
    if path in ('', '/'):
        return 'index.html'
    if path.endswith('/'):
        return path.strip('/') + '/index.html'
    return path.lstrip('/') + '.html'


def last_commit_date(rel):
    out = subprocess.run(['git', 'log', '-1', '--format=%cs', '--', rel],
                         cwd=ROOT, capture_output=True, text=True, check=True).stdout.strip()
    return out or None


def main():
    with open(SITEMAP, encoding='utf-8', newline='') as f:
        xml = f.read()
    missing, changed = [], 0

    def repl(m):
        nonlocal changed
        loc, old = m.group(2), m.group(4)
        rel = url_to_file(loc)
        if not os.path.exists(os.path.join(ROOT, rel)):
            missing.append(loc)
            return m.group(0)
        new = last_commit_date(rel) or old
        if new != old:
            changed += 1
        return m.group(1) + loc + m.group(3) + new + m.group(5)

    xml2 = re.sub(r'(<loc>)([^<]+)(</loc>\s*<lastmod>)([^<]+)(</lastmod>)', repl, xml)
    if missing:
        print('UYARI: dosyası bulunamayan URL\'ler:', *missing, sep='\n  ')
        sys.exit(1)
    with open(SITEMAP, 'w', encoding='utf-8', newline='') as f:
        f.write(xml2)
    print(f'sitemap.xml: {changed} lastmod güncellendi')


if __name__ == '__main__':
    main()
