import { Outfit } from "grimoire-kolmafia";
import { Familiar, Item, myClass } from "kolmafia";
import { $classes, $item, findFairyMultiplier, getModifier } from "libram";
import { bestOutfit } from "./outfit";

export function amountEquippedOnOutfit(item: Item, outfit: Outfit): number {
  return [...outfit.equips.values()].filter((i) => i === item).length;
}

export function haveEquippedOnOutfit(item: Item, outfit: Outfit): boolean {
  return amountEquippedOnOutfit(item, outfit) > 0;
}

export function fairyItemBonus(familiar: Familiar, famWeight: number): number {
  const fairyMult = findFairyMultiplier(familiar);
  return Math.max(Math.sqrt(55 * fairyMult * famWeight) + fairyMult * famWeight - 3, 0);
}

export class Sim {
  outfit: Outfit;
  famWeight: number;
  itemDrop: number;

  static baseline(): Sim {
    const outfit = bestOutfit();
    const sources = [...outfit.equips.values()];
    const famWeight = sources.reduce((a, b) => a + getModifier("Familiar Weight", b), 0);
    const itemDrop = sources.reduce((a, b) => a + getModifier("Item Drop", b), 0);
    return new Sim(outfit, famWeight, itemDrop);
  }

  constructor(outfit: Outfit, famWeight: number, itemDrop: number) {
    this.outfit = outfit;
    this.famWeight = famWeight;
    this.itemDrop = itemDrop;
  }

  canPickpocket(): boolean {
    return (
      $classes`Disco Bandit, Accordion Thief`.includes(myClass()) ||
      [$item`mime army infiltration glove`, $item`tiny black hole`].some((item) =>
        haveEquippedOnOutfit(item, this.outfit)
      )
    );
  }

  canNavelRunaway(): boolean {
    return [$item`Greatest American Pants`, $item`navel ring of navel gazing`].some((item) =>
      haveEquippedOnOutfit(item, this.outfit)
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

  expectedAdvsGainedPerTurnTakingCombat(): number {
    const gnome = haveEquippedOnOutfit($item`gnomish housemaid's kgnee`, this.outfit)
      ? 0.01 + this.famWeight / 1000
      : 0;
    const ring = haveEquippedOnOutfit($item`mafia thumb ring`, this.outfit) ? 0.04 : 0;
    return gnome + ring;
  }

  expectedBagsOrKeysPerAdv(): number {
    const pickpocketChance = this.canPickpocket() ? 0.25 : 0;
    const runawayChance = this.canNavelRunaway() ? 0.2 : 0;
    const a = this.expectedAdvsGainedPerTurnTakingCombat();
    // bags or keys obtained from combat with a burnout or jock
    const b =
      pickpocketChance / (1 - (runawayChance + (1 - runawayChance) * a)) +
      ((1 - pickpocketChance) * (0.05 * (1 + this.itemBonus() / 100))) / (1 - a);
    return (
      (6 / 7) * b +
      (1 / 7) * ((2 / 5) * b + (3 / 5) * (runawayChance + (1 - runawayChance) * a) * b)
    );
  }
}

export function baseline(outfit: Outfit): any {
  const sources = [...outfit.equips.values()];
  return sources.reduce((a, b) => a + getModifier("Familiar Weight", b), 0);
}
