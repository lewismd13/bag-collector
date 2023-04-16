import { Outfit } from "grimoire-kolmafia";
import { Effect, Familiar, familiarWeight, myClass, Skill, toEffect } from "kolmafia";
import {
  $classes,
  $item,
  findFairyMultiplier,
  getModifier,
  have,
  ReagnimatedGnome,
  sum,
} from "libram";
import { args } from "./args";
import { fromCurrent } from "./engine/outfit";

export class SimulatedState {
  outfit: Outfit;
  famWeight: number;
  itemDrop: number;

  /**
   * Create a SimulatedState instance using what are considered "baseline" values: passives, buffs, outfit equips, and base familiar weight.
   * @param outfit The outfit to use. If not specified, this will use an outfit created from the current character state.
   * @returns A SimulatedState instance that includes the modifier values of baseline sources.
   */
  static baseline(outfit?: Outfit): SimulatedState {
    outfit = outfit ?? fromCurrent();
    const passives = Skill.all().filter((skill) => have(skill) && skill.passive);
    const buffs = Skill.all()
      .filter((skill) => have(skill) && skill.buff && toEffect(skill) !== Effect.none)
      .map((skill) => toEffect(skill));
    const equips = [...outfit.equips.values()];
    const sources = [...passives, ...buffs, ...equips];
    const famWeight =
      sum(sources, (source) => getModifier("Familiar Weight", source)) +
      (outfit.familiar ? familiarWeight(outfit.familiar) : 0);
    const itemDrop = sum(sources, (source) => getModifier("Item Drop", source));
    return new SimulatedState(outfit, famWeight, itemDrop);
  }

  static current(): SimulatedState {
    return new SimulatedState(
      fromCurrent(),
      getModifier("Familiar Weight"),
      getModifier("Item Drop")
    );
  }

  /**
   * Create the SimulatedState.
   * @param outfit Outfit to use for evaluating combat results. The modifier values from items equipped to the outfit are not taken into account.
   * @param famWeight Value of familiar weight modifier.
   * @param itemDrop Value of item drop modifier.
   */
  constructor(outfit: Outfit, famWeight: number, itemDrop: number) {
    this.outfit = outfit;
    this.famWeight = famWeight;
    this.itemDrop = itemDrop;
  }

  /**
   * @returns Whether the outfit has the ability to pickpocket.
   */
  canPickpocket(): boolean {
    return (
      $classes`Disco Bandit, Accordion Thief`.includes(myClass()) ||
      [$item`mime army infiltration glove`, $item`tiny black hole`].some((item) =>
        this.outfit.haveEquipped(item)
      )
    );
  }

  /**
   * @returns Whether the outfit has the ability to use navel runaways.
   */
  canNavelRunaway(): boolean {
    return [$item`Greatest American Pants`, $item`navel ring of navel gazing`].some((item) =>
      this.outfit.haveEquipped(item)
    );
  }

  /**
   * @returns The total item bonus from item drop modifier and a fairy-like familiar.
   */
  itemBonus(): number {
    const fairyMult = findFairyMultiplier(this.outfit.familiar ?? Familiar.none);
    const fairyBonus = Math.max(
      Math.sqrt(55 * fairyMult * this.famWeight) + fairyMult * this.famWeight - 3,
      0
    );
    return this.itemDrop + fairyBonus;
  }

  /**
   * @returns The expected number of adventures gained from a turn-taking combat.
   */
  advsGainedPerTurnTakingCombat(): number {
    const gnome = this.outfit.haveEquipped($item`gnomish housemaid's kgnee`)
      ? ReagnimatedGnome.expectedAdvsPerCombat(this.famWeight)
      : 0;
    const ring = this.outfit.haveEquipped($item`mafia thumb ring`) ? 0.04 : 0;
    return gnome + ring;
  }

  /**
   * @returns The expected number of duffel bags or van keys gained per net adventure spent.
   */
  bagsGainedPerAdv(): number {
    const pickpocketChance = this.canPickpocket() ? 0.25 : 0;
    const runawayChance = this.canNavelRunaway() ? 0.2 : 0;
    const a = this.advsGainedPerTurnTakingCombat();
    // bags obtained from combat with a burnout or jock
    const b =
      pickpocketChance / (1 - (runawayChance + (1 - runawayChance) * a)) +
      ((1 - pickpocketChance) * Math.min(0.05 * (1 + this.itemBonus() / 100), 1)) / (1 - a);
    return (
      (6 / 7) * b +
      (1 / 7) * ((2 / 5) * b + (3 / 5) * (runawayChance + (1 - runawayChance) * a) * b)
    );
  }

  /**
   * @returns The value, in meat, of adding a certain amount of familiar weight and item drop to the SimulatedState instance.
   */
  valueOf(famWeight: number, itemDrop: number): number {
    return (
      (new SimulatedState(
        this.outfit,
        this.famWeight + famWeight,
        this.itemDrop + itemDrop
      ).bagsGainedPerAdv() -
        this.bagsGainedPerAdv()) *
      args.bagvalue
    );
  }

  /**
   * @returns A valuator function based on this SimulatedState instance
   */
  valuator(): (famWeight: number, itemDrop: number) => number {
    return (famWeight: number, itemDrop: number) => {
      return this.valueOf(famWeight, itemDrop);
    };
  }
}
