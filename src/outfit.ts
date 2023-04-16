import { args } from "./args";
import { SimulatedState } from "./simulated-state";
import { Engine } from "./engine/engine";
import { gyou, isSober } from "./lib";
import { Outfit } from "grimoire-kolmafia";
import { myClass, outfitPieces, totalTurnsPlayed } from "kolmafia";
import { $classes, $effect, $item, $items, $slot, get, have } from "libram";
import { itemFamiliarSpec } from "./familiar/item-familiar";

export function baggoOutfit(includeFamiliar = true): Outfit {
  const outfit = new Outfit();

  if (includeFamiliar) outfit.equip(itemFamiliarSpec());

  if (!isSober() && !outfit.equip($item`Drunkula's wineglass`)) {
    throw "Unable to equip Drunkula's wineglass on baggo outfit";
  }

  if (args.outfit) {
    outfit.equip(outfitPieces(args.outfit));
    return outfit;
  }

  if (!$classes`Disco Bandit, Accordion Thief`.includes(myClass()) && isSober()) {
    outfit.equipFirst($items`mime army infiltration glove, tiny black hole`);
  }

  if (!Engine.runSource) {
    outfit.equipFirst($items`Greatest American Pants, navel ring of navel gazing`);
  }

  if ((!have($effect`Everything Looks Yellow`) && isSober()) || gyou()) {
    outfit.equip($item`Jurassic Parka`);
    outfit.setModes({
      parka: !have($effect`Everything Looks Yellow`) ? "dilophosaur" : "kachungasaur",
    });
  }

  if (
    get("questPAGhost") === "unstarted" &&
    get("nextParanormalActivity") <= totalTurnsPlayed() &&
    isSober()
  ) {
    outfit.equip($item`protonic accelerator pack`);
  }

  outfit.equip($items`June cleaver, Fourth of May Cosplay Saber`, $slot`weapon`);
  outfit.equip($item`carnivorous potted plant`);
  outfit.equip($item`mafia thumb ring`);
  outfit.setModes({ parka: "ghostasaurus" });

  const valuator = SimulatedState.prototype.valueOf.bind(SimulatedState.baseline(outfit));
  outfit.equip({
    modifier: `${valuator(1, 0).toFixed(2)}familiar weight, ${valuator(0, 1).toFixed(2)}item drop`,
    avoid: [$item`time-twitching toolbelt`], // Might be uncessary in recent versions of mafia
  });
  return outfit;
}
