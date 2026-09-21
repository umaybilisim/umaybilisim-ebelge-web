#!/usr/bin/env python3
"""llms-full.txt uretici.

Sitenin ana sayfalarinin (urunler, SSS, hakkimizda, kampanyalar, iletisim, blog)
<main> icerigini duz Markdown'a cevirip llms-full.txt dosyasina yazar. Icerik yalnizca
sayfalardan alinir, elle metin eklenmez. Calistirma (repo kokunden):

    python scripts/build_llms_full.py
"""
import os
import re
import sys
from datetime import date
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = 'https://www.e-devlethizmetleri.com'

SKIP_TAGS = {'script', 'style', 'svg', 'form', 'iframe', 'noscript', 'footer', 'i', 'select', 'textarea', 'input'}
SKIP_CLASSES = {'cookie-banner', 'fab-whatsapp', 'fab-whatsapp-bubble', 'fab-top', 'mobile-menu', 'bank-card',
                'breadcrumb', 'toc', 'btn', 'hamburger', 'theme-toggle', 'skip-link', 'bant-ticker-wrap', 'bant-cta', 'bant', 'eyebrow'}
BLOCK = {'p', 'div', 'section', 'article', 'ul', 'ol', 'li', 'table', 'tr', 'thead', 'tbody', 'blockquote', 'details',
         'summary', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'main', 'dl', 'dt', 'dd', 'br', 'hr'}
VOID = {'br', 'hr', 'img', 'input', 'meta', 'link'}
# Sayfa -> (baslangic satiri, bitis basligi oneki): llms dosyasina alinmayacak bolumler
DROP_SECTIONS = {'iletisim.html': [('Ödeme ve iş birliği için', 'Demo talebiniz')]}


class Extract(HTMLParser):
    def __init__(self, level_offset=1):
        super().__init__(convert_charrefs=True)
        self.out = []
        self.buf = ''
        self.stack = []          # (tag, skip_bool)
        self.skip_depth = 0
        self.in_main = False
        self.has_main = False
        self.list_depth = 0
        self.ol_counters = []
        self.cell_row = None
        self.row_has_th = False
        self.lvl_off = level_offset
        self.title = ''
        self._in_title = False
        self.meta_desc = ''
        self.h1 = ''
        self._h1 = False
        self.prefix = ''
        self.in_heading = False

    # --- yardimcilar
    def flush(self, prefix=''):
        text = re.sub(r'\s+', ' ', self.buf).strip()
        self.buf = ''
        if text:
            self.out.append((prefix or self.prefix) + text)
            self.prefix = ''

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        cls = set((a.get('class') or '').split())
        if tag == 'title':
            self._in_title = True
        if tag == 'meta' and a.get('name') == 'description':
            self.meta_desc = a.get('content') or ''
        if tag == 'main':
            self.in_main = self.has_main = True
        if tag in VOID:
            if self.in_main and not self.skip_depth and tag in ('br', 'hr'):
                if self.in_heading:
                    self.buf += ' '
                    if self._h1:
                        self.h1 += ' '
                else:
                    self.flush()
            return
        faq_q = tag == 'button' and 'faq-q' in cls
        skip = (tag in SKIP_TAGS or bool(cls & SKIP_CLASSES) or (tag == 'button' and not faq_q)
                or tag == 'nav')
        self.stack.append((tag, skip))
        if skip:
            self.skip_depth += 1
            return
        if not self.in_main or self.skip_depth:
            return
        if tag == 'h1':
            self._h1 = True
        if re.fullmatch(r'h[1-6]', tag):
            self.flush()
            self.in_heading = True
            self.pending_heading = min(int(tag[1]) + self.lvl_off, 6)
        elif faq_q:
            self.flush()
            self.pending_heading = min(4 + self.lvl_off - 1, 6)
        elif tag in ('ul', 'ol'):
            self.flush()
            self.list_depth += 1
            if tag == 'ol':
                self.ol_counters.append(0)
            else:
                self.ol_counters.append(None)
        elif tag == 'li':
            self.flush()
            n = self.ol_counters[-1] if self.ol_counters else None
            if n is not None:
                self.ol_counters[-1] = n + 1
                self.prefix = '  ' * (self.list_depth - 1) + f'{n + 1}. '
            else:
                self.prefix = '  ' * max(self.list_depth - 1, 0) + '- '
        elif tag == 'tr':
            self.flush()
            self.cell_row = []
            self.row_has_th = False
        elif tag in ('td', 'th'):
            self.flush()
            if tag == 'th':
                self.row_has_th = True
        elif tag in BLOCK:
            self.flush()

    def handle_endtag(self, tag):
        if tag == 'title':
            self._in_title = False
        if tag in VOID:
            return
        # eslesen acilis
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                skipped = self.stack[i][1]
                del self.stack[i:]
                break
        else:
            return
        if skipped:
            self.skip_depth -= 1
            return
        if not self.in_main or self.skip_depth:
            if tag == 'main':
                self.in_main = False
            return
        if re.fullmatch(r'h[1-6]', tag):
            text = re.sub(r'\s+', ' ', self.buf).strip()
            self.buf = ''
            if text:
                self.out.append('')
                self.out.append('#' * self.pending_heading + ' ' + text)
                self.out.append('')
            self.in_heading = False
            if tag == 'h1':
                self._h1 = False
        elif tag == 'button':  # faq-q
            text = re.sub(r'\s+', ' ', self.buf).strip()
            self.buf = ''
            if text:
                self.out.append('')
                self.out.append('#' * self.pending_heading + ' ' + text)
                self.out.append('')
        elif tag in ('ul', 'ol'):
            self.flush()
            self.list_depth = max(self.list_depth - 1, 0)
            if self.ol_counters:
                self.ol_counters.pop()
            self.out.append('')
        elif tag in ('td', 'th'):
            text = re.sub(r'\s+', ' ', self.buf).strip().replace('|', '/')
            self.buf = ''
            if self.cell_row is not None:
                self.cell_row.append(text)
        elif tag == 'tr':
            if self.cell_row:
                self.out.append('| ' + ' | '.join(self.cell_row) + ' |')
                if self.row_has_th:
                    self.out.append('|' + '---|' * len(self.cell_row))
            self.cell_row = None
        elif tag == 'main':
            self.flush()
            self.in_main = False
        elif tag in BLOCK:
            self.flush()
            if tag in ('p', 'table', 'section', 'article'):
                self.out.append('')

    def handle_data(self, data):
        if self._in_title:
            self.title += data
            return
        if self.in_main and not self.skip_depth:
            self.buf += data
            if self._h1:
                self.h1 += data


def convert(path, level_offset=1):
    p = Extract(level_offset)
    with open(os.path.join(ROOT, path), encoding='utf-8-sig') as f:
        p.feed(f.read())
    p.flush()
    lines = []
    blank = 0
    for ln in p.out:
        if ln == '':
            blank += 1
            if blank > 1:
                continue
        else:
            blank = 0
        lines.append(ln)
    cta = {'Detayları Gör', 'Tümünü Gör', 'Kampanyaları İncele', 'Devamını Oku', 'Devamını oku', 'Teklif Al',
           'Hemen Başlayın', 'Daha Fazla', 'İncele', 'Detaylar', 'Hemen yaz →', 'Şimdi Başvur',
           "Google Haritalar'da Aç"}
    lines = [ln for ln in lines if ln.strip() not in cta]
    # llms dosyasina alinmayacak bolumler (odeme/banka bilgisi)
    for start, stop in DROP_SECTIONS.get(path, []):
        try:
            a = next(i for i, ln in enumerate(lines) if re.fullmatch(r'#+ ' + re.escape(start), ln.strip()))
            b = next(i for i, ln in enumerate(lines) if i > a and re.match(r'#+ ' + re.escape(stop), ln))
            del lines[a:b]
        except StopIteration:
            pass
    # sayfa H1'i ayrica "## baslik" olarak ekleniyor; govdedeki ilk H1 satirini at
    for i, ln in enumerate(lines):
        if ln.startswith('#' * (1 + level_offset) + ' '):
            del lines[i]
            break
    body = '\n'.join(lines).strip()
    return {
        'title': re.sub(r'\s+', ' ', p.title).strip(),
        'h1': re.sub(r'\s+', ' ', p.h1).strip(),
        'desc': p.meta_desc.strip(),
        'body': body,
    }


def url_of(path):
    if path == 'index.html':
        return BASE + '/'
    if path.endswith('/index.html'):
        return BASE + '/' + path[:-len('index.html')]
    return BASE + '/' + path[:-len('.html')]


def main():
    llms = open(os.path.join(ROOT, 'llms.txt'), encoding='utf-8-sig').read()
    # llms.txt'in baslik + ozet + Firma Bilgileri bolumunu aynen kullan
    m = re.search(r'^(# .*?)(?=^## (?!Firma Bilgileri))', llms, re.S | re.M)
    head = m.group(1).strip() if m else '# Umay e-Belge'
    out = [head, '',
           f'> Bu dosya llms.txt\'in tam içerik sürümüdür: sitenin ürün, SSS, kampanya, iletişim ve blog sayfalarının metni. '
           f'Özet için: {BASE}/llms.txt. Kaynak sayfalardan otomatik üretilmiştir ({date.today().isoformat()}).', '']

    def add(path, heading_prefix='##'):
        d = convert(path)
        title = d['h1'] or d['title']
        out.append('---')
        out.append('')
        out.append(f'{heading_prefix} {title}')
        out.append(f'Kaynak: {url_of(path)}')
        if d['desc']:
            out.append(f'Özet: {d["desc"]}')
        out.append('')
        out.append(d['body'])
        out.append('')

    # sayfa gruplari
    urunler = ['urunler.html'] + sorted('urunler/' + f for f in os.listdir(os.path.join(ROOT, 'urunler')) if f.endswith('.html'))
    blog = sorted('blog/' + f for f in os.listdir(os.path.join(ROOT, 'blog')) if f.endswith('.html') and f != 'index.html')
    groups = [
        ('Ana Sayfa', ['index.html']),
        ('Ürünler', urunler),
        ('Sıkça Sorulan Sorular', ['sss.html']),
        ('Hakkımızda, Kampanyalar ve İletişim', ['hakkimizda.html', 'kampanyalar.html', 'iletisim.html']),
        ('Blog ve Rehberler', blog),
    ]
    for gname, paths in groups:
        out.append(f'# {gname}')
        out.append('')
        for pth in paths:
            add(pth)

    # hizmet bolgeleri: kisa liste (sayfalar sablon benzeri oldugu icin yalnizca ozet)
    iller_dir = os.path.join(ROOT, 'iller')
    out.append('# Hizmet Bölgeleri')
    out.append('')
    out.append(f'İl bazlı sayfalar ({BASE}/iller/):')
    out.append('')
    for f in sorted(os.listdir(iller_dir)):
        if f.endswith('.html') and f != 'index.html':
            d = convert('iller/' + f)
            out.append(f'- [{d["h1"] or d["title"]}]({url_of("iller/" + f)})' + (f': {d["desc"]}' if d['desc'] else ''))
    out.append('')
    out.append('# Yasal Metinler')
    out.append('')
    out.append(f'- [KVKK Aydınlatma Metni]({BASE}/kvkk)')
    out.append(f'- [Gizlilik Politikası]({BASE}/gizlilik-politikasi)')
    out.append('')

    text = '\n'.join(out)
    text = re.sub(r'\n{3,}', '\n\n', text).strip() + '\n'
    with open(os.path.join(ROOT, 'llms-full.txt'), 'w', encoding='utf-8', newline='\n') as f:
        f.write(text)
    print(f'llms-full.txt yazildi: {len(text.encode("utf-8")) / 1024:.0f} KB, {text.count(chr(10))} satir')


if __name__ == '__main__':
    sys.exit(main())
