import { Outfit } from "grimoire-kolmafia";
import {
  Familiar,
  inebrietyLimit,
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
  $items,
  $slot,
  findFairyMultiplier,
  get,
  have,
  ReagnimatedGnome,
} from "libram";
import { maxBy } from "./lib";
import { args } from "./main";
import { Calculator } from "./calculator";

export function isSober(): boolean {
  return myInebriety() > inebrietyLimit() - Number(myFamiliar() !== $familiar`Stooper`);
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
    throw "Unable to add Drunkula's wineglass to our outfit";
  }

  outfit.equip(chooseFamiliar());
  outfit.equip($item`gnomish housemaid's kgnee`);

  if (args.outfit) {
    outfit.equip(outfitPieces(args.outfit));
    return outfit;
  }

  if (!$classes`Disco Bandit, Accordion Thief`.includes(myClass())) {
    outfit.equipFirst($items`mime army infiltration glove, tiny black hole`);
  }

  outfit.equipFirst($items`Greatest American Pants, navel ring of navel gazing`);

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

  const value = Calculator.fromBaseline(outfit).unitValue(); // Estimate value of modifiers
  outfit.equip({
    modifier: `${value.famWeight}familiar weight ${value.itemDrop}item drop`,
    avoid: [$item`time-twitching toolbelt`],
  });
  return outfit;
}
