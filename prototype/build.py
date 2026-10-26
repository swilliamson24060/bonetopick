from pathlib import Path
p=Path(__file__).parent
html=(p/'template.html').read_text().replace('/* ENGINE */',(p/'engine.js').read_text()).replace('/* GAME */',(p/'game.js').read_text())
(p/'index.html').write_text(html)

# Publish the same standalone game at the GitHub Pages root.
pages=p.parent/"docs"
pages.mkdir(exist_ok=True)
(pages/"index.html").write_text(html)
(pages/".nojekyll").touch()
