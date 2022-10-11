import {
  cliExecute,
  expectedColdMedicineCabinet,
  getWorkshed,
  itemAmount,
  Monster,
  myLocation,
  putCloset,
  runChoice,
  toEffect,
  totalTurnsPlayed,
  toUrl,
  visitUrl,
} from "kolmafia";
import {
  $item,
  $location,
  $monsters,
  $skill,
  AutumnAton,
  FloristFriar,
  get,
  have,
  Macro,
} from "libram";
import { CombatStrategy } from "../engine/combat";
import { createFarmingOutfit } from "../engine/outfit";
import { Quest } from "../engine/task";
import { args, turnsRemaining } from "../main";
import { bubbleVision } from "../potions";

export function coldMedicineCabinet(): void {
  if (getWorkshed() !== $item`cold medicine cabinet`) return;
  if (get("_coldMedicineConsults") >= 5) return;
  if (get("_nextColdMedicineConsult") > totalTurnsPlayed()) return;
  if (expectedColdMedicineCabinet()["pill"] !== $item`Extrovermectin™`) return;
  visitUrl("campground.php?action=workshed");
  runChoice(5);
}

export const BaggoQuest: Quest = {
  name: "Baggo",
  tasks: [
    {
      name: "Closet Massagers",
      completed: () => itemAmount($item`personal massager`) === 0,
      do: () => putCloset(itemAmount($item`personal massager`), $item`personal massager`),
      limit: { tries: 1 },
    },
    {
      name: "Florist Friar",
      ready: () => FloristFriar.have() && myLocation() === $location`The Neverending Party`,
      completed: () =>
        FloristFriar.isFull() ||
        [FloristFriar.StealingMagnolia, FloristFriar.AloeGuvnor, FloristFriar.PitcherPlant].every(
          (flower) => !flower.available()
        ),
      do: () =>
        [FloristFriar.StealingMagnolia, FloristFriar.AloeGuvnor, FloristFriar.PitcherPlant].forEach(
          (flower) => flower.plant()
        ),
    },
    {
      name: "Autumn-Aton",
      ready: () => AutumnAton.available(),
      completed: () => AutumnAton.currentlyIn() !== null,
      do: () => AutumnAton.sendTo($location`The Neverending Party`),
    },
    {
      name: "Party Fair",
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
      after: ["Dailies/Kgnee", "Party Fair"],
      completed: () => turnsRemaining() <= 0,
      prepare: (): void => {
        bubbleVision();
        coldMedicineCabinet();
        if (get("parkaMode").toLowerCase() !== "dilophosaur") cliExecute("parka dilophosaur"); // Use grimoire's outfit modes for this once it is implemented
      },
      do: $location`The Neverending Party`,
      outfit: createFarmingOutfit,
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
        .banish($monsters`biker, party girl, "plain" girl`)
        .macro(
          Macro.step("pickpocket")
            .if_(`match "unremarkable duffel bag" || match "van key"`, Macro.runaway())
            .trySkill($skill`Double Nanovision`)
            .trySkill($skill`Double Nanovision`)
            .trySkill($skill`Spit jurassic acid`),
          $monsters`burnout, jock`
        )
        .macro((): Macro => {
          return args.olfact !== "none"
            ? Macro.if_(Monster.get(args.olfact), Macro.trySkill($skill`Transcendent Olfaction`))
            : new Macro();
        })
        .kill(),
    },
  ],
};
