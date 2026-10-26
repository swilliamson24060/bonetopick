# A Bone to Pick

A whimsical lane-defense browser game. Chipmunks defend their Oak against skeletons using nature-built traps that trigger and reset automatically.

Play online: https://swilliamson24060.github.io/bonetopick/

## Current playable prototype

Open `prototype/index.html` in a browser. This is the latest 60-second Great Oak Siege playtest with automatic defenses, salvage, and skeleton bone absorption. No installation is needed to play.

- Run simulation checks: `node prototype/tests.cjs`
- Rebuild the standalone HTML: `python3 prototype/build.py`
- See `prototype/README.md` for controls and mechanics.

## Recommended production stack

Phaser + TypeScript, with Vite for development and packaging. This is a recommendation; the current prototype remains plain JavaScript and Canvas. Engine migration has not started.

Phaser supports browser games and 2D animation. The side-on Oak view uses three connected branch platforms and constant-size characters. Keep simulation logic independent of rendering so automatic traps, wave rules, salvage, and enemy combinations remain testable.

## Direction

- Flat side view of three stacked Oak branches; enemies remain the same size.
- Alternating paths connected by ladders lead to the bottom doorstep.
- Automatic Log Drops move enemies one level down; brambles underneath create gravity combos.
- Automatic traps assembled from nature by chipmunks; no manual firing.
- Skeletons can combine or absorb bones to develop different powers.
- Whimsical cartoon story interludes.
- First three planned levels: 2, 3, and 4 minutes; no level beyond 5 minutes.
- The short prototype is a mechanics test, not the full first level.

## Next milestones

1. Validate automatic trap placement, economy, and salvage through playtesting.
2. Port the approved loop into Phaser and TypeScript while keeping regression checks.
3. Build three timed levels, differentiated trap combinations and skeleton powers.
4. Add original illustrated assets, animation, sound, and story interludes.

Reference concept art is in `docs/doorway-concept.png`. Earlier discarded circular versions are excluded from this repository.

Engine reference: https://docs.phaser.io/

## GitHub Pages

Pages publishes from `main`, `/docs`. Running `python3 prototype/build.py` updates both the local prototype and `docs/index.html`. Commit and push those files to update the online game.
