import { getCurrentModes, Outfit, outfitSlots } from "grimoire-kolmafia";
import { equippedItem, myFamiliar, toSlot } from "kolmafia";
import { $slot } from "libram";
import { Resource } from "./resources";

export function equipFirst<T extends Resource>(outfit: Outfit, resources: T[]): T | undefined {
  for (const resource of resources) {
    if (!resource.available()) continue;
    if (!outfit.canEquip(resource.equip ?? [])) continue;
    if (!outfit.equip(resource.equip ?? [])) continue;
    return resource;
  }
  return undefined;
}

export function fromCurrent(): Outfit {
  const outfit = new Outfit();
  outfit.equip(myFamiliar());
  for (const slotName of outfitSlots) {
    const slot =
      new Map([
        ["famequip", $slot`familiar`],
        ["offhand", $slot`off-hand`],
      ]).get(slotName) ?? toSlot(slotName);
    outfit.equip(equippedItem(slot), slot);
  }
  outfit.setModes(getCurrentModes());
  return outfit;
}
