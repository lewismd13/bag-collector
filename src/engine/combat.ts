/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ActionDefaults, CombatStrategy as BaseCombatStrategy } from "grimoire-kolmafia";
import { $item, $skill, Macro } from "libram";

const myActions = ["kill", "banish"] as const;
export type CombatActions = typeof myActions[number];
export class CombatStrategy extends BaseCombatStrategy.withActions(myActions) {}
export class MyActionDefaults implements ActionDefaults<CombatActions> {
  kill() {
    return this.delevel()
      .trySkill($skill`Sing Along`)
      .trySkill($skill`Bowl Straight Up`)
      .attack()
      .repeat();
  }

  banish() {
    return Macro.runaway(); // If no resource provided
  }

  private delevel() {
    return Macro.trySkill($skill`Micrometeorite`)
      .tryItem($item`Rain-Doh indigo cup`)
      .trySkill($skill`Summon Love Mosquito`)
      .tryItem($item`Time-Spinner`);
  }
}
