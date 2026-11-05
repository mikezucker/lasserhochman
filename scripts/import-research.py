"""One-time, offline import from the reviewed legacy HTML snapshots."""
from pathlib import Path
import re, html, json

def plain(s):
    return html.unescape(re.sub('<[^>]+>', '', s)).strip()
slugs=['guryan','zucker','silver','stewart','kipnees','konzelman','bibergal','cowell','shore','brown','sprouls','snyder','agins']
out=[]
for slug in slugs:
    source=Path(f'research/{slug}.html').read_text()
    source=re.sub(r'<!--.*?-->', '', source, flags=re.S)
    name=plain(re.search(r'<h2>(.*?)</h2>',source,re.S)[1])
    position=plain(re.search(r'<h3>(.*?)</h3>',source,re.S)[1]).split(' - ')[-1]
    photo=re.search(r'<span class="image attorney"><img src="([^"]+)"',source)[1]
    fields={};bio=''
    ul=re.search(r'<ul class="alt">(.*?)</ul>',source,re.S)[1]
    for item in re.findall(r'<li>(.*?)</li>',ul,re.S):
        label=re.search(r'<b>(.*?)</b>',item,re.S)
        if not label:bio=plain(item);continue
        key=plain(label[1]); val=item[label.end():]
        if key=='Contact':continue
        fields[key]=[plain(x) for x in re.split(r'<br\s*/?>',val) if plain(x)]
    email=re.search(r'mailto:([^?"\s]+)',source)[1]
    out.append(dict(slug=slug,name=name,position=position,image='/'+photo,email=email,bio=bio,fields=fields,source='https://www.lasserhochman.com/'+slug))
Path('src/data/attorneys.json').write_text(json.dumps(out,indent=2)+'\n')
