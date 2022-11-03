import {
  familiarWeight,
  haveEquipped,
  Item,
  itemAmount,
  myFamiliar,
  print,
  retrieveItem,
  weightAdjustment,
} from "kolmafia";
import { $item, withProperty } from "libram";

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
  if (!item.tradeable) return 0;

  debug(`Trying to acquire ${formatAmountOfItem(quantity, item)}}`, "green");
  const startAmount = itemAmount(item);
  withProperty("autoBuyPriceLimit", maxPrice, () => retrieveItem(item, quantity));
  return itemAmount(item) - startAmount;
}

/**
 * Return the expected adventures gained from a turn-taking combat based on the player's current state.
 */
export function expectedAdvsGainedPerCombat(): number {
  const gnome = haveEquipped($item`gnomish housemaid's kgnee`)
    ? 0.01 + (familiarWeight(myFamiliar()) + weightAdjustment()) / 1000
    : 0;
  const ring = haveEquipped($item`mafia thumb ring`) ? 0.04 : 0;
  return gnome + ring;
}

export function expectedBagsPerAdv(familiarWeight: number, itemDrop: number): number {
  const bonusItem = (itemDrop + (Math.sqrt(55 + familiarWeight) + familiarWeight + 3)) / 100;
  const a = familiarWeight / 1000 + 0.04; // expected advs gained per combat
  const b = 0.25 / (1 - (0.2 + 0.8 * a)) + (0.75 * (0.05 * (1 + bonusItem))) / (1 - a); // expected bags from combat with a burnout or jock
  return (6 / 7) * b + (1 / 7) * ((2 / 5) * b + (3 / 5) * (0.2 + 0.8 * a) * b);
}

/**
 * Find the best element of an array, where "best" is defined by some given criteria. Borrowed from garbage-collector.
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
