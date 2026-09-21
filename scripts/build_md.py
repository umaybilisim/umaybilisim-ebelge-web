#!/usr/bin/env python3
"""Sayfalarin sade Markdown surumlerini md/ klasorune uretir (yapay zeka ajanlari icin).

Her sayfa icin <main> icerigi Markdown'a cevrilir:
    /urunler/e-fatura  ->  /md/urunler/e-fatura.md
    /                  ->  /md/index.md
    /blog/             ->  /md/blog/index.md
Ayrica sayfalarin <head> bolumune rel="alternate" type="text/markdown" baglantisi eklenir.
Calistirma (repo kokunden):

    python scripts/build_md.py
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_llms_full import ROOT, BASE, convert, url_of  # noqa: E402

OUT = os.path.join(ROOT, 'md')
SKIP = {'404.html'}


def md_path(html_path):
    """index.html -> md/index.md ; a/b.html -> md/a/b.md ; a/index.html -> md/a/index.md"""
    return 'md/' + html_path[:-len('.html')] + '.md'


def pages():
    for dirpath, dirs, files in os.walk(ROOT):
        rel_dir = os.path.relpath(dirpath, ROOT).replace('\\', '/')
        top = rel_dir.split('/')[0]
        if top in ('.git', '.github', 'md', 'node_modules', 'scripts', '.playwright-mcp', 'functions', 'js', 'css', 'img', '.well-known'):
            dirs[:] = []
            continue
        for f in sorted(files):
            if f.endswith('.html') and f not in SKIP:
                yield (f if rel_dir == '.' else rel_dir + '/' + f)


def main():
    os.makedirs(OUT, exist_ok=True)
    keep = set()
    n = 0
    for html in sorted(pages()):
        d = convert(html, level_offset=0)
        title = d['h1'] or d['title']
        lines = [f'# {title}', '']
        if d['desc']:
            lines += [f'> {d["desc"]}', '']
        lines += [f'Kaynak: {url_of(html)}', '', d['body'].strip(), '',
                  '---', '',
                  f'Bu, {url_of(html)} sayfasının Markdown sürümüdür. Tüm site içeriği tek dosyada: {BASE}/llms-full.txt · Özet: {BASE}/llms.txt']
        text = re.sub(r'\n{3,}', '\n\n', '\n'.join(lines)).strip() + '\n'
        target = os.path.join(ROOT, md_path(html))
        os.makedirs(os.path.dirname(target), exist_ok=True)
        with open(target, 'w', encoding='utf-8', newline='\n') as f:
            f.write(text)
        keep.add(os.path.normpath(target))
        n += 1
    # artik olmayan sayfalarin md dosyalarini temizle
    for dirpath, _, files in os.walk(OUT):
        for f in files:
            p = os.path.normpath(os.path.join(dirpath, f))
            if f.endswith('.md') and p not in keep:
                os.remove(p)
    print(f'{n} Markdown sayfa yazildi -> md/')


if __name__ == '__main__':
    sys.exit(main())
