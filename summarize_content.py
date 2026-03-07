from bs4 import BeautifulSoup
from pathlib import Path
import sys

sys.stdout.reconfigure(encoding='utf-8')
def clean(text):
    text = " ".join(text.split())
    # Collapse spaced-out letter animations like "S e r v i c e s".
    parts = text.split(" ")
    if parts and all(len(p) == 1 for p in parts):
        return "".join(parts)
    return text

def unique(seq):
    seen = set()
    out = []
    for item in seq:
        key = (item.get("tag"), item.get("text"))
        if key[1] and key not in seen:
            out.append(item)
            seen.add(key)
    return out

def gather_items(el):
    if not el:
        return []
    # Prefer higher-level text nodes to avoid span-by-span letter artifacts.
    tags = ("h1", "h2", "h3", "h4", "h5", "h6", "p", "a", "button", "li")
    items = []
    for node in el.find_all(tags):
        text = clean(node.get_text(" ", strip=True))
        if node.name == "a" and text:
            href = node.get("href", "")
            if href.startswith("./#") or href.startswith("#"):
                frag = href.split("#", 1)[-1]
                if frag and "-" in frag and text.isalpha():
                    text = " ".join(part.capitalize() for part in frag.split("-"))
        if text:
            items.append({"tag": node.name, "text": text})
    return unique(items)

def summarize_section(section):
    return {
        'name': section.attrs.get('data-framer-name', '').strip(),
        'tag': section.name,
        'items': gather_items(section),
    }

html = Path('mirror_html/index.html').read_text(encoding='utf-8')
soup = BeautifulSoup(html, 'html.parser')
nav = soup.find('nav', attrs={'data-framer-name': True})
header = soup.find('header', attrs={'data-framer-name': True})
sections = []
seen_sections = set()
for sec in soup.find_all('section', attrs={'data-framer-name': True}):
    name = sec.attrs.get('data-framer-name', '').strip()
    if not name or name in seen_sections:
        continue
    seen_sections.add(name)
    sections.append(summarize_section(sec))

payload = {
    'navigation': {
        'name': nav.attrs.get('data-framer-name', '').strip() if nav else '',
        'tag': nav.name if nav else '',
        'items': gather_items(nav),
    },
    'header': {
        'name': header.attrs.get('data-framer-name', '').strip() if header else '',
        'tag': header.name if header else '',
        'items': gather_items(header),
    },
    'sections': sections,
}
content_lines = []

def emit_component(title, tag, items):
    content_lines.append(f"{title} : {tag}")
    for item in items:
        content_lines.append(f"  item : {item['tag']} : {item['text']}")
    content_lines.append("")

emit_component("Navigation", payload["navigation"]["tag"], payload["navigation"]["items"])
emit_component("Header", payload["header"]["tag"], payload["header"]["items"])

for section in sections:
    name = section["name"] or "Unnamed Section"
    emit_component(name, section["tag"], section["items"])

content_md = "\n".join(content_lines).strip() + "\n"
Path("content.md").write_text(content_md, encoding="utf-8")
print("content.md written with tag-aware content.")
