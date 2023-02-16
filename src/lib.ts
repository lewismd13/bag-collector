import { args } from "./args";
import { SimulatedState } from "./simulated-state";
import { Outfit } from "grimoire-kolmafia";
import {
  canInteract,
  Item,
  itemAmount,
  myAdventures,
  myPath,
  myTurncount,
  print,
  retrieveItem,
  toInt,
} from "kolmafia";
import { $path, get, withProperty } from "libram";

export function debug(message: string, color?: string): void {
  if (color) {
    print(message, color);
  } else {
    print(message);
  }
}

export function formatAmountOfItem(amount: number, item: Item): string {
  return `${formatNumber(amount)} ${amount === 1 ? item : item.plural}`;
}

export function formatNumber(x: number): string {
  const str = x.toString();
  if (str.includes(".")) return x.toFixed(2);
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function acquire(quantity: number, item: Item, maxPrice: number): number {
  debug(
    `Trying to acquire ${formatAmountOfItem(quantity, item)}; max price ${formatNumber(maxPrice)}`,
    "green"
  );
  const startAmount = itemAmount(item);
  withProperty("autoBuyPriceLimit", maxPrice, () => retrieveItem(item, quantity));
  return itemAmount(item) - startAmount;
}

export function printOutfit(outfit: Outfit): void {
  for (const [slot, item] of outfit.equips) {
    print(`* ${slot}: ${item}`);
  }
  print(`* ${outfit.familiar}`);
}

/**
 * Find the best element of an array, where "best" is defined by some given criteria. Taken from garbage-collector.
 * @param array The array to traverse and find the best element of.
 * @param optimizer Either a key on the objects we're looking at that corresponds to numerical values, or a function for mapping these objects to numbers. Essentially, some way of assigning value to the elements of the array.
 * @param reverse Make this true to find the worst element of the array, and false to find the best. Defaults to false.
 */
export function maxBy<T>(
  array: T[] | readonly T[],
  optimizer: (element: T) => number,
  reverse?: boolean
): T;
export function maxBy<S extends string | number | symbol, T extends { [x in S]: number }>(
  array: T[] | readonly T[],
  key: S,
  reverse?: boolean
): T;
export function maxBy<S extends string | number | symbol, T extends { [x in S]: number }>(
  array: T[] | readonly T[],
  optimizer: ((element: T) => number) | S,
  reverse = false
): T {
  if (typeof optimizer === "function") {
    return maxBy(
      array.map((key) => ({ key, value: optimizer(key) })),
      "value",
      reverse
    ).key;
  } else {
    return array.reduce((a, b) => (a[optimizer] > b[optimizer] !== reverse ? a : b));
  }
}

export function ronin(): boolean {
  return !canInteract();
}

export function gyou(): boolean {
  return myPath() === $path`Grey You`;
}

export function canPull(item: Item): boolean {
  const pulls = get("_roninStoragePulls").split(",");
  return ronin() && pulls.length < 20 && !pulls.includes(`${toInt(item)}`);
}

export const adventures = myAdventures();
export const turncount = myTurncount();

export function turnsRemaining(): number {
  if (args.turns === 0) return 0;
  if (isFinite(args.turns) && args.turns > 0) {
    const spent = myTurncount() - turncount;
    return Math.min(args.turns - spent, myAdventures());
  }
  const spend = myAdventures() + Math.min(0, args.turns);
  return Math.round(spend / (1 - SimulatedState.baseline().advsGainedPerTurnTakingCombat()));
}
