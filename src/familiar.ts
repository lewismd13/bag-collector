import { Familiar, Item } from "kolmafia";
import { $familiar, $item, findFairyMultiplier, have } from "libram";
import { maxBy } from "./lib";
import { args } from "./main";

function chosenGnomePart(): Item | undefined {
  return [
    $item`gnomish swimmer's ears`,
    $item`gnomish coal miner's lung`,
    $item`gnomish tennis elbow`,
    $item`gnomish housemaid's kgnee`,
    $item`gnomish athlete's foot`,
  ].find((part) => have(part));
}

export function bestFamiliar(): Familiar {
  if (args.familiar) return args.familiar;

  if (
    have($familiar`Reagnimated Gnome`) &&
    chosenGnomePart() === $item`gnomish housemaid's kgnee`
  ) {
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
