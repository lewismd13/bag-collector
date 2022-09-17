/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ActionDefaults, CombatStrategy as BaseCombatStrategy } from "grimoire-kolmafia";
import { $item, $skill, Macro } from "libram";

const myActions = ["kill", "banish", "abort"] as const;
export type CombatActions = typeof myActions[number];
export class CombatStrategy extends BaseCombatStrategy.withActions(myActions) {}
export class MyActionDefaults implements ActionDefaults<CombatActions> {
  kill() {
    return this.delevel().attack().repeat();
  }

  banish() {
    return this.abort(); // Abort if no resource provided
  }

  abort() {
    return Macro.abort();
  }

  private delevel() {
    return new Macro()
      .skill($skill`Curse of Weaksauce`)
      .trySkill($skill`Micrometeorite`)
      .tryItem($item`Rain-Doh indigo cup`)
      .trySkill($skill`Summon Love Mosquito`)
      .tryItem($item`Time-Spinner`);
  }
}
