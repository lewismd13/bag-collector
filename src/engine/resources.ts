import { CombatResource as BaseCombatResource, OutfitSpec } from "grimoire-kolmafia";
import { Familiar, Item, Monster, retrieveItem, retrievePrice, Skill } from "kolmafia";
import { $item, $skill, AsdonMartin, getBanishedMonsters, have } from "libram";
import { debug } from "../lib";

export interface Resource {
  name: string;
  available: () => boolean;
  prepare?: () => void;
  equip?: Item | Familiar | Item[] | OutfitSpec;
  chance?: () => number;
}

export type CombatResource = Resource & BaseCombatResource;

export interface BanishSource extends CombatResource {
  do: Item | Skill;
}

export const banishSources: BanishSource[] = [
  {
    name: "Human Musk",
    available: () => true,
    prepare: () => retrieveItem($item`human musk`),
    do: $item`human musk`,
  },
  {
    name: "Ice House",
    available: () => retrievePrice($item`ice house`) < 50_000,
    prepare: () => retrieveItem($item`ice house`),
    do: $item`ice house`,
  },
  {
    name: "Asdon Martin",
    available: () => AsdonMartin.installed(),
    prepare: () => AsdonMartin.fillTo(50),
    do: $skill`Asdon Martin: Spring-Loaded Front Bumper`,
  },
  {
    name: "Tryptophan Dart",
    available: () => retrievePrice($item`tryptophan dart`) < 100_000,
    prepare: () => retrieveItem($item`tryptophan dart`),
    do: $item`tryptophan dart`,
  },
  {
    name: "Tennis Ball",
    available: () => retrievePrice($item`tennis ball`) < 15_000,
    prepare: () => retrieveItem($item`tennis ball`),
    do: $item`tennis ball`,
  },
  {
    name: "Cosmic Bowling Ball",
    available: () => have($item`cosmic bowling ball`),
    do: $skill`Bowl a Curveball`,
  },
];

export function unusedBanishes(to_banish: Monster[]): BanishSource[] {
  const used_banishes: Set<Item | Skill> = new Set<Item | Skill>();
  const already_banished = new Map(
    Array.from(getBanishedMonsters(), (entry) => [entry[1], entry[0]])
  );

  // Record monsters that still need to be banished, and the banishes used
  to_banish.forEach((monster) => {
    const banished_with = already_banished.get(monster);
    if (banished_with === undefined) {
      to_banish.push(monster);
    } else {
      used_banishes.add(banished_with);
      // Map strange banish tracking to our resources
      if (banished_with === $item`training scroll:  Snokebomb`)
        used_banishes.add($skill`Snokebomb`);
      if (banished_with === $item`tomayohawk-style reflex hammer`)
        used_banishes.add($skill`Reflex Hammer`);
    }
  });
  if (to_banish.length === 0) return []; // All monsters banished.

  debug(`Banish targets: ${to_banish.join(", ")}`);
  debug(`Banishes used: ${Array.from(used_banishes).join(", ")}`);
  return banishSources.filter((banish) => banish.available() && !used_banishes.has(banish.do));
}
