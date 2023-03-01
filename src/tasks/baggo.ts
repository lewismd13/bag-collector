import { args } from "../args";
import { CombatStrategy } from "../engine/combat";
import { Engine } from "../engine/engine";
import { Quest } from "../engine/task";
import { gyou, isSober, turnsRemaining } from "../lib";
import { chooseOutfit } from "../outfit";
import { bubbleVision, potionSetup } from "../potions";
import { OutfitSpec } from "grimoire-kolmafia";
import {
  adv1,
  canAdventure,
  canInteract,
  expectedColdMedicineCabinet,
  getWorkshed,
  itemAmount,
  Location,
  myAdventures,
  myClass,
  myLocation,
  myMaxhp,
  myThrall,
  putCloset,
  restoreHp,
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
  $monster,
  $monsters,
  $skill,
  $thrall,
  AutumnAton,
  Counter,
  FloristFriar,
  get,
  have,
  Macro,
  SourceTerminal,
} from "libram";
import { olfactMonster } from "../main";
import { meatFamiliar } from "../familiar/meat-familiar";

const FLORIST_FLOWERS = [
  FloristFriar.StealingMagnolia,
  FloristFriar.AloeGuvnor,
  FloristFriar.PitcherPlant,
];

let potionsCompleted = false;

const effects = [
  $skill`Blood Bond`,
  $skill`Leash of Linguini`,
  $skill`Empathy of the Newt`,
  $skill`The Spirit of Taking`,
  $skill`Fat Leon's Phat Loot Lyric`,
  $skill`Singer's Faithful Ocelot`,
  $skill`The Polka of Plenty`,
  $skill`Disco Leer`,
  $skill`Astral Shell`,
  $skill`Ghostly Shell`,
]
  .filter((skill) => have(skill))
  .map((skill) => toEffect(skill));

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
          FloristFriar.isFull() || FLORIST_FLOWERS.every((flower) => !flower.available()),
        do: () => FLORIST_FLOWERS.forEach((flower) => flower.plant()),
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
        name: "Potions",
        completed: () => !canInteract() || potionsCompleted,
        do: potionSetup,
        post: () => {
          potionsCompleted = true;
        },
        outfit: chooseOutfit,
      },
      {
        name: "Proton Ghost",
        ready: () =>
          have($item`protonic accelerator pack`) &&
          canAdventure(get("ghostLocation", Location.none)) &&
          myAdventures() > 0,
        completed: () => get("questPAGhost") === "unstarted" || args.buff,
        do: (): void => {
          const location = get("ghostLocation");
          if (location) {
            adv1(location, 0, "");
          } else {
            throw "Could not determine ghost location";
          }
        },
        effects,
        outfit: (): OutfitSpec => {
          return { ...chooseOutfit().spec(), back: $item`protonic accelerator pack` };
        },
        combat: new CombatStrategy().macro(
          Macro.trySkill($skill`Sing Along`)
            .trySkill($skill`Summon Love Gnats`)
            .trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Shoot Ghost`)
            .trySkill($skill`Trap Ghost`)
        ),
      },
      {
        name: "Digitized Embezzler",
        completed: () => Counter.get("Digitize Monster") > 0,
        ready: () => SourceTerminal.getDigitizeMonster() === $monster`Knob Goblin Embezzler`,
        do: $location`Noob Cave`,
        outfit: { familiar: meatFamiliar(), modifier: "meat" },
        effects,
      },
      {
        name: "Party Fair",
        completed: () => get("_questPartyFair") !== "unstarted" || args.buff,
        do: (): void => {
          visitUrl(toUrl($location`The Neverending Party`));
          if (["food", "booze"].includes(get("_questPartyFairQuest"))) runChoice(1);
          else runChoice(2);
        },
        limit: { tries: 1 },
      },
      {
        name: "Collect Bags",
        after: ["Potions", "Party Fair"],
        completed: () => turnsRemaining() <= 0 || args.buff,
        prepare: () => {
          bubbleVision();
          if (gyou()) restoreHp(myMaxhp());
        },
        do: $location`The Neverending Party`,
        outfit: chooseOutfit,
        effects,
        choices: { 1324: 5 },
        combat: new CombatStrategy()
          .startingMacro(() => Macro.externalIf(!isSober(), Macro.attack().repeat()))
          .banish($monsters`biker, party girl, "plain" girl`)
          .macro(
            () =>
              Macro.externalIf(
                !gyou(),
                Macro.if_(`!hppercentbelow 75`, Macro.step("pickpocket")),
                Macro.step("pickpocket")
              )
                .if_(`match "unremarkable duffel bag" || match "van key"`, Engine.runMacro())
                .trySkill($skill`Spit jurassic acid`)
                .trySkill($skill`Summon Love Gnats`)
                .if_(
                  "!hppercentbelow 75 && !mpbelow 40",
                  Macro.trySkill($skill`Double Nanovision`).trySkill($skill`Double Nanovision`)
                ),
            $monsters`burnout, jock`
          )
          .macro((): Macro => {
            return olfactMonster
              ? Macro.if_(olfactMonster, Macro.trySkill($skill`Transcendent Olfaction`))
              : new Macro();
          })
          .kill(),
      },
    ],
  };
}
