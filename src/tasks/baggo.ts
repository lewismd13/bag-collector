import { OutfitSpec } from "grimoire-kolmafia";
import {
  adv1,
  canAdventure,
  expectedColdMedicineCabinet,
  getWorkshed,
  itemAmount,
  Location,
  Monster,
  myAdventures,
  myClass,
  myLocation,
  myThrall,
  putCloset,
  runChoice,
  toEffect,
  totalTurnsPlayed,
  toUrl,
  useSkill,
  visitUrl,
} from "kolmafia";
import {
  $class,
  $item,
  $location,
  $monsters,
  $skill,
  $thrall,
  AutumnAton,
  FloristFriar,
  get,
  have,
  Macro,
} from "libram";
import { CombatStrategy } from "../engine/combat";
import { Quest } from "../engine/task";
import { args, turnsRemaining } from "../main";
import { chooseOutfit } from "../outfit";
import { bubbleVision } from "../potions";

const floristFlowers = [
  FloristFriar.StealingMagnolia,
  FloristFriar.AloeGuvnor,
  FloristFriar.PitcherPlant,
];

export function BaggoQuest(): Quest {
  return {
    name: "Baggo",
    tasks: [
      {
        name: "Closet Massagers",
        completed: () => itemAmount($item`personal massager`) === 0,
        do: () => putCloset(itemAmount($item`personal massager`), $item`personal massager`),
        limit: { tries: 1 },
      },
      {
        name: "Spice Ghost",
        ready: () => myClass() === $class`Pastamancer` && have($skill`Bind Spice Ghost`),
        completed: () => myThrall() === $thrall`Spice Ghost`,
        do: () => useSkill($skill`Bind Spice Ghost`),
        limit: { tries: 1 },
      },
      {
        name: "Florist Friar",
        ready: () => FloristFriar.have() && myLocation() === $location`The Neverending Party`,
        completed: () =>
          FloristFriar.isFull() || floristFlowers.every((flower) => !flower.available()),
        do: () => floristFlowers.forEach((flower) => flower.plant()),
        limit: { tries: 1 },
      },
      {
        name: "Autumn-Aton",
        ready: () => AutumnAton.available(),
        completed: () => AutumnAton.currentlyIn() !== null,
        do: () => AutumnAton.sendTo($location`The Neverending Party`),
      },
      {
        name: "Cold Medicine Cabinet",
        ready: () =>
          getWorkshed() === $item`cold medicine cabinet` &&
          get("_nextColdMedicineConsult") <= totalTurnsPlayed() &&
          expectedColdMedicineCabinet()["pill"] === $item`Extrovermectin™`,
        completed: () => get("_coldMedicineConsults") >= 5,
        do: (): void => {
          visitUrl("campground.php?action=workshed");
          runChoice(5);
        },
        limit: { tries: 5 },
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
        name: "Proton Ghost",
        ready: () =>
          have($item`protonic accelerator pack`) &&
          canAdventure(get("ghostLocation", Location.none)),
        completed: () => get("questPAGhost") === "unstarted",
        do: (): void => {
          const location = get("ghostLocation");
          if (location) {
            adv1(location, 0, "");
          } else {
            throw "Could not determine ghost location";
          }
        },
        outfit: (): OutfitSpec => {
          return { ...chooseOutfit().spec(), back: $item`protonic accelerator pack` };
        },
        combat: new CombatStrategy().macro(
          Macro.trySkill($skill`Sing Along`)
            .trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Trap Ghost`)
        ),
      },
      {
        name: "Collect Bags",
        after: ["Party Fair"],
        completed: () => turnsRemaining() < 1 || myAdventures() === 0,
        prepare: () => bubbleVision(),
        do: $location`The Neverending Party`,
        outfit: () => chooseOutfit(),
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
}
