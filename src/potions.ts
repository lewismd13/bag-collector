import {
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
import { acquire, debug, formatAmountOfItem } from "./lib";
import { args, turnsRemaining } from "./main";

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
}

export class Potion {
  item: Item;
  overrideItemDrop?: number;
  constructor(item: Item, options: PotionOptions = {}) {
    this.item = item;
    this.overrideItemDrop = options.itemDrop;
  }

  effect(): Effect {
    return effectModifier(this.item, "Effect");
  }

  effectDuration(): number {
    return getModifier("Effect Duration", this.item);
  }

  familiarWeight(): number {
    return getModifier("Familiar Weight", this.effect());
  }

  itemDrop(): number {
    setLocation($location`none`);
    return this.overrideItemDrop ?? getModifier("Item Drop", this.effect());
  }

  grossValue(): number {
    const duration = Math.min(
      this.effectDuration(),
      Math.max(0, turnsRemaining() - haveEffect(this.effect()))
    );
    return (
      (0.0014 * this.familiarWeight() + (0.04 * this.itemDrop()) / 100) * args.bagvalue * duration
    );
  }

  netValue(): number {
    return this.grossValue() - mallPrice(this.item);
  }
}

export function getRelevantPotions(): Potion[] {
  return Item.all()
    .filter((item) => item.tradeable && !blacklist.includes(item) && itemType(item) === "potion")
    .map((item) => new Potion(item))
    .filter((potion) => potion.netValue() > 0)
    .sort((a, b) => b.netValue() - a.netValue());
}

export function setupPotions(): void {
  const excludedEffects = new Set<Effect>(
    getActiveEffects()
      .map((effect) => getMutuallyExclusiveEffectsOf(effect))
      .flat()
  );

  for (const potion of getRelevantPotions()) {
    const effect = potion.effect();
    if (excludedEffects.has(effect)) continue;
    const desiredAmount = Math.floor(
      (turnsRemaining() - haveEffect(potion.effect())) / potion.effectDuration()
    );
    if (desiredAmount <= 0) return;
    acquire(desiredAmount, potion.item, potion.grossValue());
    const useAmount = Math.min(desiredAmount, itemAmount(potion.item));
    debug(`Using ${formatAmountOfItem(useAmount, potion.item)}`);
    const used = use(useAmount, potion.item);
    if (used) {
      for (const excluded of getMutuallyExclusiveEffectsOf(effect)) {
        excludedEffects.add(excluded);
      }
    }
  }
}

export function bubbleVision(): void {
  if (have($effect`Bubble Vision`)) return;

  const potion = new Potion($item`bottle of bubbles`, { itemDrop: 50 });
  if (potion.netValue() > 0) {
    acquire(1, potion.item, potion.grossValue());
    debug(`Using ${potion.item}`);
    use(1, potion.item);
  }
}
