import { Familiar } from "kolmafia";
import { $familiar, $item, findFairyMultiplier, have } from "libram";
import { args } from "../args";
import { maxBy } from "../lib";

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

export function itemFamiliar(): Familiar {
  if (args.familiar) return args.familiar;
  if (have($familiar`Reagnimated Gnome`) && have($item`gnomish housemaid's kgnee`)) {
    return $familiar`Reagnimated Gnome`;
  }
  if (have($familiar`Trick-or-Treating Tot`) && have($item`li'l ninja costume`)) {
    return $familiar`Trick-or-Treating Tot`;
  }
  return findBestNonCheerleaderFairy();
}
