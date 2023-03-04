import { $familiar, $item, have } from "libram";
import { itemFamiliarSpec } from "./item-familiar";
import { FamiliarSpec } from "./spec";

// This isn't garbo; don't expect a lot here
export function freeFightFamiliarSpec(): FamiliarSpec {
  if (have($familiar`Reagnimated Gnome`) && have($item`gnomish housemaid's kgnee`)) {
    return { familiar: $familiar`Reagnimated Gnome`, famequip: $item`gnomish housemaid's kgnee` };
  }
  if (have($familiar`Temporal Riftlet`)) return { familiar: $familiar`Temporal Riftlet` };
  return itemFamiliarSpec();
}
