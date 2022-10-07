import { Outfit, OutfitSpec } from "grimoire-kolmafia";
import { canEquip, myClass, outfitPieces } from "kolmafia";
import { $classes, $effect, $familiar, $item, have } from "libram";
import { args } from "../main";
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

export function createFarmingOutfit(): OutfitSpec {
  const spec: OutfitSpec = {
    familiar: $familiar`Reagnimated Gnome`,
    famequip: $item`gnomish housemaid's kgnee`,
    modifier: "0.0014familiar weight 0.04item drop",
  };

  if (args.outfit !== "") {
    spec.equip = outfitPieces(args.outfit);
    return spec;
  }

  // Free runaway source
  const toEquip = [
    have($item`Greatest American Pants`)
      ? $item`Greatest American Pants`
      : $item`navel ring of navel gazing`,
  ];

  // Pickpocket source
  if ($classes`Disco Bandit, Accordion Thief`.includes(myClass())) {
    if (have($item`carnivorous potted plant`)) toEquip.push($item`carnivorous potted plant`);
  } else if (canEquip($item`mime army infiltration glove`)) {
    toEquip.push($item`mime army infiltration glove`);
    if (have($item`carnivorous potted plant`)) toEquip.push($item`carnivorous potted plant`);
  } else {
    toEquip.push($item`tiny black hole`);
  }
  spec.equip = toEquip;

  if (have($item`Jurassic Parka`) && !have($effect`Everything Looks Yellow`)) {
    spec.shirt = $item`Jurassic Parka`;
  }

  if (have($item`June cleaver`)) {
    spec.weapon = $item`June cleaver`;
  } else if (have($item`Fourth of May Cosplay Saber`)) {
    spec.weapon = $item`Fourth of May Cosplay Saber`;
  }

  if (have($item`mafia thumb ring`)) spec.acc1 = $item`mafia thumb ring`;

  return spec;
}
