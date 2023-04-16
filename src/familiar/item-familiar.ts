import { Familiar } from "kolmafia";
import { $familiar, $item, findFairyMultiplier, have, maxBy } from "libram";
import { args } from "../args";
import { isSober } from "../lib";
import { FamiliarSpec } from "./spec";

let bestNonCheerleaderFairy: Familiar;

function findBestNonCheerleaderFairy(): Familiar {
  if (!bestNonCheerleaderFairy) {
    const viableFairies = Familiar.all().filter(
      (f) =>
        have(f) &&
        findFairyMultiplier(f) &&
        f !== $familiar`Steam-Powered Cheerleader` &&
        !f.physicalDamage &&
        !f.elementalDamage
    );

    bestNonCheerleaderFairy = maxBy(viableFairies, findFairyMultiplier);
  }
  return bestNonCheerleaderFairy;
}

export function itemFamiliarSpec(): FamiliarSpec {
  if (args.familiar) return { familiar: args.familiar };
  if (
    have($familiar`Reagnimated Gnome`) &&
    have($item`gnomish housemaid's kgnee`) &&
    (isSober() || !(have($familiar`Trick-or-Treating Tot`) && have($item`li'l ninja costume`)))
  ) {
    return { familiar: $familiar`Reagnimated Gnome`, famequip: $item`gnomish housemaid's kgnee` };
  }
  if (have($familiar`Trick-or-Treating Tot`) && have($item`li'l ninja costume`)) {
    return { familiar: $familiar`Trick-or-Treating Tot`, famequip: $item`li'l ninja costume` };
  }
  return { familiar: findBestNonCheerleaderFairy() };
}
