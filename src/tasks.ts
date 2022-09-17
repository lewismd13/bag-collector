import { OutfitSpec } from "grimoire-kolmafia";
import {
  expectedColdMedicineCabinet,
  getWorkshed,
  Item,
  myClass,
  myLocation,
  runChoice,
  toEffect,
  totalTurnsPlayed,
  toUrl,
  visitUrl,
} from "kolmafia";
import {
  $familiar,
  $item,
  $location,
  $monsters,
  $skill,
  $stat,
  FloristFriar,
  get,
  have,
  Macro,
} from "libram";
import { CombatStrategy } from "./engine/combat";
import { Quest } from "./engine/task";
import { turnsRemaining } from "./main";
import { bubbleVision } from "./potions";

export function runwaySource(): Item {
  return have($item`Greatest American Pants`)
    ? $item`Greatest American Pants`
    : $item`navel ring of navel gazing`;
}

export function coldMedicineCabinet(): void {
  if (getWorkshed() !== $item`cold medicine cabinet`) return;
  if (get("_coldMedicineConsults") >= 5) return;
  if (get("_nextColdMedicineConsult") > totalTurnsPlayed()) return;
  if (expectedColdMedicineCabinet()["pill"] !== $item`Extrovermectin™`) return;
  visitUrl("campground.php?action=workshed");
  runChoice(1);
}

export function floristFriar(): void {
  if (!FloristFriar.have()) return;
  if (myLocation() !== $location`The Neverending Party`) return;
  if (FloristFriar.isFull()) return;
  for (const flower of [
    FloristFriar.StealingMagnolia,
    FloristFriar.AloeGuvnor,
    FloristFriar.PitcherPlant,
  ]) {
    if (flower.available()) flower.plant();
  }
}

export const BaggoQuest: Quest = {
  name: "Baggo",
  tasks: [
    {
      name: "Handle Quest",
      completed: () => get("_questPartyFair") !== "unstarted",
      do: (): void => {
        visitUrl(toUrl($location`The Neverending Party`));
        if (["food", "booze"].includes(get("_questPartyFairQuest"))) runChoice(1);
        else runChoice(2);
      },
      limit: { tries: 1 },
    },
    {
      name: "Collect Bags",
      after: ["Handle Quest"],
      completed: () => turnsRemaining() <= 0,
      prepare: () => bubbleVision(),
      do: $location`The Neverending Party`,
      post: (): void => {
        coldMedicineCabinet();
        floristFriar();
      },
      outfit: (): OutfitSpec => {
        return {
          weapon: $item`June cleaver`,
          offhand: $item`carnivorous potted plant`,
          acc1: $item`mafia thumb ring`,
          acc2:
            myClass().primestat !== $stat`moxie` ? $item`mime army infiltration glove` : undefined,
          familiar: $familiar`Reagnimated Gnome`,
          famequip: $item`gnomish housemaid's kgnee`,
          equip: [runwaySource()],
          modifier: "0.0014familiar weight 0.04item drop",
        };
      },
      effects: [
        $skill`Blood Bond`,
        $skill`Leash of Linguini`,
        $skill`Empathy of the Newt`,
        $skill`The Spirit of Taking`,
        $skill`Fat Leon's Phat Loot Lyric`,
        $skill`Singer's Faithful Ocelot`,
      ]
        .filter((skill) => have(skill))
        .map((skill) => toEffect(skill)),
      choices: { 1324: 5 },
      combat: new CombatStrategy()
        .banish(...$monsters`biker, party girl, "plain" girl`)
        .macro(
          Macro.step("pickpocket").if_(
            [$item`van key`, $item`unremarkable duffel bag`]
              .map((item) => `match "${item}"`)
              .join(" || "),
            Macro.runaway()
          ),
          ...$monsters`burnout, jock`
        )
        .kill(...$monsters`burnout, jock`),
    },
  ],
};
