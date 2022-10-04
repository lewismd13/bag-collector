import { CombatResource as BaseCombatResource, OutfitSpec } from "grimoire-kolmafia";
import {
  canEquip,
  Familiar,
  Item,
  Monster,
  myTurncount,
  retrieveItem,
  retrievePrice,
  Skill,
} from "kolmafia";
import { $item, $skill, AsdonMartin, get, getBanishedMonsters, have, Macro } from "libram";
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
    name: "System Sweep",
    available: () => have($skill`System Sweep`),
    do: $skill`System Sweep`,
  },
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
    available: (): boolean => {
      // From libram
      if (!AsdonMartin.installed()) return false;
      const banishes = get("banishedMonsters").split(":");
      const bumperIndex = banishes
        .map((string) => string.toLowerCase())
        .indexOf("spring-loaded front bumper");
      if (bumperIndex === -1) return true;
      return myTurncount() - parseInt(banishes[bumperIndex + 1]) > 30;
    },
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

export const runawaySources: CombatResource[] = [
  {
    name: "GAP",
    available: () => have($item`Greatest American Pants`),
    do: Macro.runaway(),
    equip: $item`Greatest American Pants`,
  },
  {
    name: "Navel Ring",
    available: () => have($item`navel ring of navel gazing`),
    do: Macro.runaway(),
    equip: $item`navel ring of navel gazing`,
  },
];

export const pickpocketSources: CombatResource[] = [
  {
    name: "Mime Glove",
    available: () =>
      have($item`mime army infiltration glove`) && canEquip($item`mime army infiltration glove`),
    do: Macro.step("pickpocket"),
    equip: $item`mime army infiltration glove`,
  },
  {
    name: "Tiny Black Hole",
    prepare: () => retrieveItem($item`tiny black hole`),
    available: () => have($item`tiny black hole`) || retrievePrice($item`tiny black hole`) < 10_000,
    do: Macro.step("pickpocket"),
    equip: $item`tiny black hole`,
  },
];
