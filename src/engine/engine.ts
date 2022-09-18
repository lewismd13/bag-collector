import { Engine as BaseEngine, CombatResources, CombatStrategy, Outfit } from "grimoire-kolmafia";
import { $effect, have } from "libram";
import { CombatActions, MyActionDefaults } from "./combat";
import { equipFirst } from "./outfit";
import { unusedBanishes } from "./resources";
import { Task } from "./task";

export class Engine extends BaseEngine<CombatActions, Task> {
  constructor(tasks: Task[]) {
    super(tasks, { combat_defaults: new MyActionDefaults() });
  }

  execute(task: Task): void {
    super.execute(task);
    if (have($effect`Beaten Up`)) throw "You are beaten up";
  }

  customize(
    task: Task,
    outfit: Outfit,
    combat: CombatStrategy<CombatActions>,
    resources: CombatResources<CombatActions>
  ): void {
    const banishSources = unusedBanishes(combat.where("banish"));
    if (combat.can("banish")) resources.provide("banish", equipFirst(outfit, banishSources));
  }
}
