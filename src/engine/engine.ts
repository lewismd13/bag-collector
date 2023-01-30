import { Engine as BaseEngine, CombatResources, CombatStrategy, Outfit } from "grimoire-kolmafia";
import { haveEffect, myAdventures } from "kolmafia";
import { $effect, getBanishedMonsters, have, Macro } from "libram";
import { CombatActions, MyActionDefaults } from "./combat";
import { equipFirst } from "./outfit";
import { unusedBanishes } from "./resources";
import { Task } from "./task";

export class Engine extends BaseEngine<CombatActions, Task> {
  constructor(tasks: Task[]) {
    super(tasks, { combat_defaults: new MyActionDefaults() });
  }

  execute(task: Task): void {
    const beaten_turns = haveEffect($effect`Beaten Up`);
    const start_advs = myAdventures();
    super.execute(task);
    // Crash if we unexpectedly lost the fight
    if (have($effect`Beaten Up`) && haveEffect($effect`Beaten Up`) <= 3) {
      // Poetic Justice gives 5
      if (
        haveEffect($effect`Beaten Up`) > beaten_turns || // Turns of beaten-up increased, so we lost
        (haveEffect($effect`Beaten Up`) === beaten_turns && myAdventures() < start_advs) // Turns of beaten-up was constant but adventures went down, so we lost fight while already beaten up
      )
        throw `Fight was lost (debug info: ${beaten_turns} => ${haveEffect(
          $effect`Beaten Up`
        )}, (${start_advs} => ${myAdventures()}); stop.`;
    }
  }

  customize(
    task: Task,
    outfit: Outfit,
    combat: CombatStrategy<CombatActions>,
    resources: CombatResources<CombatActions>
  ): void {
    // Set up a banish if needed
    const banishSources = unusedBanishes(combat.where("banish"));
    if (combat.can("banish")) resources.provide("banish", equipFirst(outfit, banishSources));

    const alreadyBanished = [...getBanishedMonsters().values()];
    for (const monster of alreadyBanished) {
      const strategy = combat.currentStrategy(monster);
      if (strategy === "banish") combat.macro(Macro.runaway(), monster);
    }
  }
}
