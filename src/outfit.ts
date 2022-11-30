import { Outfit } from "grimoire-kolmafia";
import {
  Familiar,
  inebrietyLimit,
  Item,
  myClass,
  myFamiliar,
  myInebriety,
  outfitPieces,
  totalTurnsPlayed,
} from "kolmafia";
import {
  $classes,
  $effect,
  $familiar,
  $item,
  $slot,
  findFairyMultiplier,
  get,
  have,
  ReagnimatedGnome,
} from "libram";
import { maxBy } from "./lib";
import { args } from "./main";

export function isSober(): boolean {
  return myInebriety() > inebrietyLimit() - Number(myFamiliar() !== $familiar`Stooper`);
}

export function equipFirst(items: Item[], outfit: Outfit): boolean {
  return items.some((x) => outfit.equip(x));
}

export function chooseFamiliar(): Familiar {
  if (args.familiar !== undefined) return args.familiar;

  if (ReagnimatedGnome.chosenParts().includes($item`gnomish housemaid's kgnee`)) {
    return $familiar`Reagnimated Gnome`;
  }

  const viableFairies = Familiar.all().filter(
    (f) =>
      have(f) &&
      findFairyMultiplier(f) &&
      f !== $familiar`Steam-Powered Cheerleader` &&
      !f.physicalDamage &&
      !f.elementalDamage
  );
  const bestFairy = maxBy(viableFairies, findFairyMultiplier);
  return bestFairy;
}

export function chooseOutfit(): Outfit {
  const outfit = new Outfit();

  if (!isSober() && !outfit.equip($item`Drunkula's wineglass`)) {
    throw "Unable to equip Drunkula's wineglass";
  }

  outfit.equip(chooseFamiliar());
  outfit.equip($item`gnomish housemaid's kgnee`);

  if (args.outfit) {
    outfit.equip(outfitPieces(args.outfit));
    return outfit;
  }

  if ($classes`Disco Bandit, Accordion Thief`.includes(myClass())) {
    equipFirst([$item`mime army infiltration glove`, $item`tiny black hole`], outfit);
  }

  equipFirst([$item`Greatest American Pants`, $item`navel ring of navel gazing`], outfit);

  if (!have($effect`Everything Looks Yellow`)) {
    outfit.equip($item`Jurassic Parka`);
    outfit.setModes({
      parka: "dilophosaur",
    });
  }
  if (
    get("questPAGhost") === "unstarted" &&
    get("nextParanormalActivity") <= totalTurnsPlayed() &&
    isSober()
  ) {
    outfit.equip($item`protonic accelerator pack`);
  }

  outfit.equip([$item`June cleaver`, $item`Fourth of May Cosplay Saber`], $slot`weapon`);
  outfit.equip($item`carnivorous potted plant`);
  outfit.equip($item`mafia thumb ring`);
  outfit.setModes({ parka: "ghostasaurus" });
  // TODO run sim and get modifier weights
  outfit.equip({
    modifier: "0.0014familiar weight 0.04item drop",
    avoid: [$item`time-twitching toolbelt`],
  });
  return outfit;
}
