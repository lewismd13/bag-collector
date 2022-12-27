import { Outfit } from "grimoire-kolmafia";
import { Familiar, familiarWeight, myClass, Skill, toEffect } from "kolmafia";
import { $classes, $item, findFairyMultiplier, getModifier, have, ReagnimatedGnome } from "libram";
import { args } from "./main";

export class Calculator {
  outfit: Outfit;
  famWeight: number;
  itemDrop: number;

  /**
   * Create an instance using what is considered "baseline" values.
   * @param outfit The outfit to use.
   * @returns A calculator instance that includes the modifier values of passives, skill effects, outfit equips, and base familiar weight.
   */
  static fromBaseline(outfit: Outfit): Calculator {
    const passives = Skill.all().filter((skill) => have(skill) && skill.passive);
    const effects = Skill.all()
      .filter((skill) => have(skill) && skill.buff)
      .map((skill) => toEffect(skill));
    const equips = [...outfit.equips.values()];
    const sources = [...passives, ...effects, ...equips];
    const famWeight =
      sources.reduce((a, b) => a + getModifier("Familiar Weight", b), 0) +
      (outfit.familiar ? familiarWeight(outfit.familiar) : 0);
    const itemDrop = sources.reduce((a, b) => a + getModifier("Item Drop", b), 0);
    return new Calculator(outfit, famWeight, itemDrop);
  }

  /**
   * Create the calculator.
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
   * @returns The value, in meat, of one unit of the familiar weight and item drop modifiers.
   */
  unitValue(): { famWeight: number; itemDrop: number } {
    return {
      famWeight:
        (new Calculator(this.outfit, this.famWeight + 1, this.itemDrop).bagsGainedPerAdv() -
          this.bagsGainedPerAdv()) *
        args.bagvalue,
      itemDrop:
        (new Calculator(this.outfit, this.famWeight, this.itemDrop + 1).bagsGainedPerAdv() -
          this.bagsGainedPerAdv()) *
        args.bagvalue,
    };
  }
}
