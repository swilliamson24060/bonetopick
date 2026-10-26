from pathlib import Path
p=Path(__file__).parent
html=(p/'template.html').read_text().replace('/* ENGINE */',(p/'engine.js').read_text()).replace('/* GAME */',(p/'game.js').read_text())
(p/'index.html').write_text(html)
