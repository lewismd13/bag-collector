import { Outfit } from "grimoire-kolmafia";
import { outfitPieces, myPath, totalTurnsPlayed, myClass } from "kolmafia";
import { $item, $path, have, $effect, get, $slot, $classes } from "libram";
import { bestFamiliar } from "./familiar";
import { args } from "./main";

export function canPickpocket(outfit: Outfit): boolean {
  return (
    $classes`Disco Bandit, Accordion Thief`.includes(myClass()) ||
    [$item`mime army infiltration glove`, $item`tiny black hole`].some(
      (item) => [...outfit.equips.values()].filter((i) => i === item).length > 0 // TODO replace with outfit.haveEquipped once it is made public
    )
  );
}

export function bestOutfit(): Outfit {
  const outfit = new Outfit();

  outfit.equip(bestFamiliar());
  outfit.equip($item`gnomish housemaid's kgnee`);
  outfit.equip({
    modifier: "0.0014familiar weight 0.04item drop",
    avoid: [$item`time-twitching toolbelt`],
  });

  if (args.outfit) {
    outfit.equip(outfitPieces(args.outfit));
    return outfit;
  }

  if (!canPickpocket(outfit)) {
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
  return outfit;
}
