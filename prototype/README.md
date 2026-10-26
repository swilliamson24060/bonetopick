# A Bone to Pick — Doorway Playtest

Open `index.html` directly in a modern browser. Everything is embedded: no installation, server, account or internet connection is required.

## Play

1. Dismiss the introduction. Prepare traps with 1 / 2 or the build cards, then click marked spots. Position 1 is nearest the Oak; position 4 is farthest away. A snare and branch can share a spot. The center lane is already equipped.
2. Start the wave. Branches automatically strike skeletons entering their sweep area, then reset in 6.5 seconds. Hover or click a branch to inspect its range. Lane indicators show whether branches are armed or resetting.
3. Click loose bones to dispatch the chipmunk. Materials are awarded only when the crew returns home. Nearby enemies force retreat. R recalls the crew, dropping any carried load.
4. Skeletons that reach loose bones become two-hit Bone Brutes. Both Root Snares and Branch Slappers work automatically.
5. Space pauses. Escape cancels building. Restart resets the entire encounter.

The wave lasts 60 seconds, followed by remaining-enemy cleanup. Setup and pauses do not count. This is a mechanics prototype with deliberately basic graphics; it does not yet use the finished concept art.

## Feedback to collect

- Does placing automatic defenses feel satisfying?
- Does salvaging feel useful without being overwhelming?
- Can you read the three lanes from the doorway?
- Are bone absorption and chipmunk retreat understandable?

## Development

`engine.js` contains the simulation, `game.js` the interface and drawing, and `template.html` the page. Run `build.py` to assemble the standalone `index.html`. Run `node tests.cjs` for targeted simulation checks.

Verified: build costs, placement, lane-specific sweeps, cooldowns, snare holds, two-hit Brutes, bone recovery, retreat and recall, pausing, victory and defeat. The simulation checks exercise automatic firing without player trigger inputs. Cross-browser and first-time-user testing remain.
