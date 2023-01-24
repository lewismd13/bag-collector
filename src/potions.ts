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

  gross(valuator: (famWeight: number, itemDrop: number) => number, maxTurns?: number): number {
    const duration = Math.max(this.effectDuration(), maxTurns ?? 0);
    return valuator(this.familiarWeight(), this.itemDrop()) * duration;
  }

  price(): number {
    return mallPrice(this.item);
  }

  net(valuator: (famWeight: number, itemDrop: number) => number): number {
    return this.gross(valuator) - this.price();
  }
}

export function farmingPotions(): Potion[] {
  return Item.all()
    .filter((item) => item.tradeable && !blacklist.includes(item) && itemType(item) === "potion")
    .map((item) => new Potion(item))
    .filter((potion) => potion.familiarWeight() > 0 || potion.itemDrop() > 0);
}

export function potionSetup(): void {
  const excludedEffects = new Set<Effect>(
    getActiveEffects()
      .map((effect) => getMutuallyExclusiveEffectsOf(effect))
      .flat()
  );

  const calc = Calculator.current();
  const valuator = calc.valueOf.bind(calc);
  const profitablePotions = farmingPotions()
    .filter((potion) => potion.net(valuator) > 0)
    .sort((a, b) => b.net(valuator) - a.net(valuator));

  for (const potion of profitablePotions) {
    const effect = potion.effect();
    if (excludedEffects.has(effect)) continue;

    const calc = Calculator.current(); // Update after each potion application to address capping item drops
    const valuator = calc.valueOf.bind(calc);
    const desiredAmount = (turnsRemaining() - haveEffect(effect)) / potion.effectDuration();
    const overageProfitable = (desiredAmount % 1) * potion.gross(valuator) - potion.price() > 0;
    const acquireAmount = Math.floor(desiredAmount) + (overageProfitable ? 1 : 0);

    if (acquireAmount <= 0) continue;
    acquire(acquireAmount, potion.item, potion.gross(valuator));

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
  if (
    !canInteract() ||
    have($effect`Bubble Vision`) ||
    effectModifier($item`bottle of bubbles`, "Effect") !== $effect`Bubble Vision`
  ) {
    return;
  }

  const item = $item`bottle of bubbles`;
  const turns = Math.min(turnsRemaining(), getModifier("Effect Duration", item));
  const averageItemDrop = (turns / 2) * (2 + (turns - 1)); // Sum of arithmetic sequence where a = d = 1
  const potion = new Potion(item, { itemDrop: averageItemDrop, effectDuration: turns });
  const calc = Calculator.current();
  const valuator = calc.valueOf.bind(calc);

  if (potion.net(valuator) > 0) {
    acquire(1, potion.item, potion.gross(valuator));
    debug(`Using ${formatAmountOfItem(1, potion.item)}`);
    use(1, potion.item);
  }
}
