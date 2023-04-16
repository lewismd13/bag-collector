import { Familiar } from "kolmafia";
import {
  $familiar,
  $item,
  findFairyMultiplier,
  findLeprechaunMultiplier,
  have,
  maxBy,
} from "libram";
import { isSober } from "../lib";
import { FamiliarSpec } from "./spec";

let bestLeprechaun: Familiar;

function findBestLeprechaun(): Familiar {
  if (!bestLeprechaun) {
    const validFamiliars = Familiar.all().filter(
      (f) => have(f) && f !== $familiar`Ghost of Crimbo Commerce`
    );

    validFamiliars.sort((a, b) => findLeprechaunMultiplier(b) - findLeprechaunMultiplier(a));

    const bestLepMult = findLeprechaunMultiplier(validFamiliars[0]);
    const firstBadLeprechaun = validFamiliars.findIndex(
      (f) => findLeprechaunMultiplier(f) < bestLepMult
    );

    const bestLeprechauns =
      firstBadLeprechaun === -1 ? validFamiliars : validFamiliars.slice(0, firstBadLeprechaun);
    bestLeprechaun = maxBy(bestLeprechauns, findFairyMultiplier);
  }
  return bestLeprechaun;
}

export function meatFamiliarSpec(): FamiliarSpec {
  if (!isSober() && have($familiar`Trick-or-Treating Tot`) && have($item`li'l pirate costume`)) {
    return { familiar: $familiar`Trick-or-Treating Tot`, famequip: $item`li'l pirate costume` };
  }
  if (have($familiar`Robortender`)) return { familiar: $familiar`Robortender` };
  return { familiar: findBestLeprechaun() };
}
