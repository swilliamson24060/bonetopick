# A Bone to Pick — Great Oak Siege

Open index.html to play, or visit https://swilliamson24060.github.io/bonetopick/.

## Play

- Choose a trap, then tap a marked spot. Tap the same card again to cancel.
- Root Snare costs 30 and holds enemies; resets after 11 seconds.
- Log Drop costs 50, sends one skeleton to the same horizontal position on the branch below, and resets after 8 seconds. It does no damage. Cannot be placed on the bottom branch.
- Brambles cost 40, deal one damage to nearby skeletons on their own branch, and reset after 5 seconds.
- Stack logs over brambles for an automatic gravity combo. Each spot holds one trap.
- Skeletons follow Crown rightward, Bough leftward, then Home rightward. Ladders at the ends connect the routes. Only bottom-doorstep breaches damage the Oak.
- Tap bone piles to dispatch one salvage chipmunk. Nearby enemies force retreat; recall drops any carried load. Uncollected bones can turn a skeleton into a two-hit Bone Brute.
- Prepare freely before starting. Pause freezes the simulation. Restart resets it. Remove refunds full cost in preparation, half during play.

A starting Log Drop and aligned brambles demonstrate the combo. Spend the additional 160 materials on backup defenses. Wave spawning lasts 60 seconds, followed by surviving-enemy cleanup. This remains a basic-graphics mechanics prototype, not the finished illustrated game or three-level campaign.

## Development

Run `node prototype/tests.cjs` from the repository root. Run `python3 prototype/build.py` to update both prototype/index.html and docs/index.html. GitHub Pages publishes docs from main.

The simulation checks gravity transfer and landing delay, trap cooldowns and lane isolation, route transitions, bottom-only damage, economy, brutes, salvage, pause, victory and defeat. Visual browser checks use desktop and phone-sized viewports; physical-device testing remains useful.
