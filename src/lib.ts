import { Outfit } from "grimoire-kolmafia";
import {
  canInteract,
  inebrietyLimit,
  Item,
  itemAmount,
  myAdventures,
  myFamiliar,
  myInebriety,
  myPath,
  myTurncount,
  print,
  retrieveItem,
  toInt,
  totalTurnsPlayed,
} from "kolmafia";
import { $familiar, $path, get, withProperty } from "libram";
import { args } from "./args";
import { SimulatedState } from "./simulated-state";

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

export function isSober(): boolean {
  return myInebriety() <= inebrietyLimit() - Number(myFamiliar() === $familiar`Stooper`);
}

export function sausageFightGuaranteed() {
  const goblinsFought = get("_sausageFights");
  const nextGuaranteed =
    get("_lastSausageMonsterTurn") + 4 + goblinsFought * 3 + Math.max(0, goblinsFought - 5) ** 3;
  return goblinsFought === 0 || totalTurnsPlayed() >= nextGuaranteed;
}
