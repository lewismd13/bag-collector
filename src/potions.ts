import {
  canInteract,
  Effect,
  effectModifier,
  haveEffect,
  Item,
  itemAmount,
  itemType,
  mallPrice,
  setLocation,
  use,
} from "kolmafia";
import { $effect, $effects, $item, $location, getActiveEffects, getModifier, have } from "libram";
import { Calculator } from "./calculator";
import { acquire, debug, formatAmountOfItem } from "./lib";
import { turnsRemaining } from "./main";

const blacklist = [$item`bottle of bubbles`];

const mutuallyExclusiveEffects: Effect[][] = [
  $effects`Blue Tongue, Green Tongue, Orange Tongue, Purple Tongue, Red Tongue, Black Tongue`,
  $effects`Cupcake of Choice, The Cupcake of Wrath, Shiny Happy Cupcake, Your Cupcake Senses Are Tingling, Tiny Bubbles in the Cupcake`,
  $effects`Broken Heart, Fiery Heart, Cold Hearted, Sweet Heart, Withered Heart, Lustful Heart`,
];

export function getMutuallyExclusiveEffectsOf(effect: Effect): Effect[] {
  for (const effectGroup of mutuallyExclusiveEffects) {
    if (effectGroup.includes(effect)) {
      return effectGroup.filter((ef) => ef !== effect);
    }
  }
  return [];
}

export interface PotionOptions {
  itemDrop?: number;
  effectDuration?: number;
}

export class Potion {
  item: Item;
  overrideItemDrop?: number;
  overrideEffectDuration?: number;

  constructor(item: Item, options: PotionOptions = {}) {
    this.item = item;
    this.overrideItemDrop = options.itemDrop;
    this.overrideEffectDuration = options.effectDuration;
  }

  effect(): Effect {
    return effectModifier(this.item, "Effect");
  }

  effectDuration(): number {
    return this.overrideEffectDuration ?? getModifier("Effect Duration", this.item);
  }

  familiarWeight(): number {
    return getModifier("Familiar Weight", this.effect());
  }

  itemDrop(): number {
    setLocation($location`none`);
    return this.overrideItemDrop ?? getModifier("Item Drop", this.effect());
  }

  gross(unitValue: { famWeight: number; itemDrop: number }, maxTurns?: number): number {
    const duration = Math.max(this.effectDuration(), maxTurns ?? 0);
    return (
      (unitValue.famWeight * this.familiarWeight() + unitValue.itemDrop * this.itemDrop()) *
      duration
    );
  }

  price(): number {
    return mallPrice(this.item);
  }

  net(unitValue: { famWeight: number; itemDrop: number }): number {
    return this.gross(unitValue) - this.price();
  }
}

export function farmingPotions(): Potion[] {
  return Item.all()
    .filter((item) => item.tradeable && !blacklist.includes(item) && itemType(item) === "potion")
    .map((item) => new Potion(item))
    .filter((potion) => potion.familiarWeight() > 0 || potion.itemDrop() > 0);
}

export function potionSetup(): void {
  const unitValue = Calculator.baseline().unitValue();

  const excludedEffects = new Set<Effect>(
    getActiveEffects()
      .map((effect) => getMutuallyExclusiveEffectsOf(effect))
      .flat()
  );

  const profitablePotions = farmingPotions()
    .filter((potion) => potion.net(unitValue) > 0)
    .sort((a, b) => b.net(unitValue) - a.net(unitValue));

  for (const potion of profitablePotions) {
    const effect = potion.effect();
    if (excludedEffects.has(effect)) continue;

    const desiredAmount = (turnsRemaining() - haveEffect(effect)) / potion.effectDuration();
    const overageProfitable = (desiredAmount % 1) * potion.gross(unitValue) - potion.price() > 0;
    const acquireAmount = Math.floor(desiredAmount) + (overageProfitable ? 1 : 0);

    if (acquireAmount <= 0) continue;
    acquire(acquireAmount, potion.item, potion.gross(unitValue));

    const useAmount = Math.min(acquireAmount, itemAmount(potion.item));
    debug(`Using ${formatAmountOfItem(useAmount, potion.item)}`);
    use(useAmount, potion.item);

    if (have(effect)) {
      for (const excluded of getMutuallyExclusiveEffectsOf(effect)) {
        excludedEffects.add(excluded);
      }
    }
  }
}

export function bubbleVision(): void {
  if (!canInteract() || have($effect`Bubble Vision`)) return;

  const item = $item`bottle of bubbles`;
  const turns = Math.min(turnsRemaining(), getModifier("Effect Duration", item));
  const averageItemDrop = (turns / 2) * (2 + (turns - 1)); // Sum of arithmetic sequence where a = d = 1
  const potion = new Potion(item, { itemDrop: averageItemDrop, effectDuration: turns });
  const unitValue = Calculator.baseline().unitValue();

  if (potion.net(unitValue) > 0) {
    acquire(1, potion.item, potion.gross(unitValue));
    debug(`Using ${formatAmountOfItem(1, potion.item)}`);
    use(1, potion.item);
  }
}
