import { Outfit, outfitSlots } from "grimoire-kolmafia";
import {
  equippedItem,
  inebrietyLimit,
  Item,
  myClass,
  myFamiliar,
  myInebriety,
  myPath,
  outfitPieces,
  toSlot,
  totalTurnsPlayed,
} from "kolmafia";
import { $classes, $effect, $familiar, $item, $path, $slot, get, have } from "libram";
import { bestFamiliar } from "./familiar";
import { args } from "./main";

// TODO replace with outfit.haveEquipped once it is made public
export function haveEquippedOnOutfit(item: Item, outfit: Outfit): boolean {
  return [...outfit.equips.values()].filter((i) => i === item).length > 0;
}

export function canPickpocketWearing(outfit: Outfit): boolean {
  return (
    $classes`Disco Bandit, Accordion Thief`.includes(myClass()) ||
    [$item`mime army infiltration glove`, $item`tiny black hole`].some((item) =>
      haveEquippedOnOutfit(item, outfit)
    )
  );
}

export function canNavelRunawayWearing(outfit: Outfit): boolean {
  return [$item`Greatest American Pants`, $item`navel ring of navel gazing`].some((item) =>
    haveEquippedOnOutfit(item, outfit)
  );
}

export function outfitFromCurrent(): Outfit {
  const result = new Outfit();
  if (!result.equip(myFamiliar())) throw `Failed to equip ${myFamiliar()}`;
  for (const slotName of outfitSlots) {
    const slot =
      new Map([
        ["famequip", $slot`familiar`],
        ["offhand", $slot`off-hand`],
      ]).get(slotName) ?? toSlot(slotName);
    if (!result.equip(equippedItem(slot), slot)) {
      throw `Failed to equip ${equippedItem(slot)} in slot ${slot}`;
    }
  }
  return result;
}

export function isSober(): boolean {
  return myInebriety() > inebrietyLimit() - Number(myFamiliar() !== $familiar`Stooper`);
}

export function bestOutfit(): Outfit {
  const outfit = new Outfit();

  if (!isSober() && !outfit.equip($item`Drunkula's wineglass`)) {
    throw "Unable to equip Drunkula's wineglass on our grimoire outfit and we are overdrunk";
  }

  outfit.equip(bestFamiliar());
  outfit.equip($item`gnomish housemaid's kgnee`);

  if (args.outfit) {
    outfit.equip(outfitPieces(args.outfit));
    return outfit;
  }

  if (!canPickpocketWearing(outfit)) {
    for (const item of [$item`mime army infiltration glove`, $item`tiny black hole`]) {
      if (outfit.equip(item)) break;
    }
  }

  for (const item of [$item`Greatest American Pants`, $item`navel ring of navel gazing`]) {
    if (outfit.equip(item)) break;
  }

  if (myPath() === $path`Grey You` || !have($effect`Everything Looks Yellow`)) {
    outfit.equip($item`Jurassic Parka`);
  }

  if (get("questPAGhost") === "unstarted" && get("nextParanormalActivity") <= totalTurnsPlayed()) {
    outfit.equip($item`protonic accelerator pack`);
  }

  outfit.equip([$item`June cleaver`, $item`Fourth of May Cosplay Saber`], $slot`weapon`);
  outfit.equip($item`carnivorous potted plant`);
  outfit.equip($item`mafia thumb ring`);
  outfit.equip({
    modifier: "0.0014familiar weight 0.04item drop",
    avoid: [$item`time-twitching toolbelt`],
  });
  return outfit;
}
