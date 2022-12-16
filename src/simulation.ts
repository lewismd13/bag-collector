import { Outfit } from "grimoire-kolmafia";
import { Familiar, familiarWeight, myClass, Skill, toEffect } from "kolmafia";
import { $classes, $item, findFairyMultiplier, getModifier, have, ReagnimatedGnome } from "libram";
import { args } from "./main";

export function fairyItemBonus(familiar: Familiar, famWeight: number): number {
  const fairyMult = findFairyMultiplier(familiar);
  return Math.max(Math.sqrt(55 * fairyMult * famWeight) + fairyMult * famWeight - 3, 0);
}

export class Simulation {
  outfit: Outfit;
  famWeight: number;
  itemDrop: number;

  /**
   * Create the simulation.
   * @param outfit Outfit to use for evaluating combat capabilities.
   * @param famWeight Value of familiar weight modifier.
   * @param itemDrop Value of item drop modifier.
   */
  constructor(outfit: Outfit, famWeight: number, itemDrop: number) {
    this.outfit = outfit;
    this.famWeight = famWeight;
    this.itemDrop = itemDrop;
  }

  canPickpocket(): boolean {
    return (
      $classes`Disco Bandit, Accordion Thief`.includes(myClass()) ||
      [$item`mime army infiltration glove`, $item`tiny black hole`].some((item) =>
        this.outfit.haveEquipped(item)
      )
    );
  }

  canNavelRunaway(): boolean {
    return [$item`Greatest American Pants`, $item`navel ring of navel gazing`].some((item) =>
      this.outfit.haveEquipped(item)
    );
  }

  itemBonus(): number {
    const fairyMult = findFairyMultiplier(this.outfit.familiar ?? Familiar.none);
    const fairyBonus = Math.max(
      Math.sqrt(55 * fairyMult * this.famWeight) + fairyMult * this.famWeight - 3,
      0
    );
    return this.itemDrop + fairyBonus;
  }

  advsGainedPerTurnTakingCombat(): number {
    const gnome = this.outfit.haveEquipped($item`gnomish housemaid's kgnee`)
      ? ReagnimatedGnome.expectedAdvsPerCombat(this.famWeight)
      : 0;
    const ring = this.outfit.haveEquipped($item`mafia thumb ring`) ? 0.04 : 0;
    return gnome + ring;
  }

  bagsGainedPerAdv(): number {
    const pickpocketChance = this.canPickpocket() ? 0.25 : 0;
    const runawayChance = this.canNavelRunaway() ? 0.2 : 0;
    const a = this.advsGainedPerTurnTakingCombat();
    // bags obtained from combat with a burnout or jock
    const b =
      pickpocketChance / (1 - (runawayChance + (1 - runawayChance) * a)) +
      ((1 - pickpocketChance) * (0.05 * (1 + this.itemBonus() / 100))) / (1 - a);
    return (
      (6 / 7) * b +
      (1 / 7) * ((2 / 5) * b + (3 / 5) * (runawayChance + (1 - runawayChance) * a) * b)
    );
  }

  unitValue(): { famWeight: number; itemDrop: number } {
    return {
      famWeight:
        new Simulation(this.outfit, this.famWeight + 1, this.itemDrop).bagsGainedPerAdv() -
        this.bagsGainedPerAdv() * args.itemvalue,
      itemDrop:
        new Simulation(this.outfit, this.famWeight, this.itemDrop + 1).bagsGainedPerAdv() -
        this.bagsGainedPerAdv() * args.itemvalue,
    };
  }
}

export function baselineModifierValues(outfit: Outfit): { famWeight: number; itemDrop: number } {
  const passives = Skill.all().filter((skill) => have(skill) && skill.passive);
  const effects = Skill.all()
    .filter((skill) => have(skill) && skill.buff)
    .map((skill) => toEffect(skill));
  const items = [...outfit.equips.values()];
  const sources = [...passives, ...effects, ...items];
  return {
    famWeight:
      sources.reduce((a, b) => a + getModifier("Familiar Weight", b), 0) +
      (outfit.familiar ? familiarWeight(outfit.familiar) : 0),
    itemDrop: sources.reduce((a, b) => a + getModifier("Item Drop", b), 0),
  };
}
