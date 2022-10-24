import { OutfitSpec } from "grimoire-kolmafia";
import {
  adv1,
  canAdventure,
  canEquip,
  cliExecute,
  expectedColdMedicineCabinet,
  getWorkshed,
  haveEquipped,
  itemAmount,
  Location,
  Monster,
  myAdventures,
  myClass,
  myLocation,
  myThrall,
  outfitPieces,
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
  $classes,
  $effect,
  $familiar,
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
import { bubbleVision } from "../potions";

export function baggoOutfit(): OutfitSpec {
  const spec: OutfitSpec = {
    familiar: $familiar`Reagnimated Gnome`,
    famequip: $item`gnomish housemaid's kgnee`,
    modifier: "0.0014familiar weight 0.04item drop",
    avoid: [$item`time-twitching toolbelt`],
  };

  if (args.outfit !== "") {
    spec.equip = outfitPieces(args.outfit);
    return spec;
  }

  // Free runaway source
  const toEquip = [
    have($item`Greatest American Pants`)
      ? $item`Greatest American Pants`
      : $item`navel ring of navel gazing`,
  ];

  // Pickpocket source
  if ($classes`Disco Bandit, Accordion Thief`.includes(myClass())) {
    if (have($item`carnivorous potted plant`)) toEquip.push($item`carnivorous potted plant`);
  } else if (canEquip($item`mime army infiltration glove`)) {
    toEquip.push($item`mime army infiltration glove`);
    if (have($item`carnivorous potted plant`)) toEquip.push($item`carnivorous potted plant`);
  } else {
    toEquip.push($item`tiny black hole`);
  }
  spec.equip = toEquip;

  if (have($item`Jurassic Parka`) && !have($effect`Everything Looks Yellow`)) {
    spec.shirt = $item`Jurassic Parka`;
  }

  if (have($item`June cleaver`)) {
    spec.weapon = $item`June cleaver`;
  } else if (have($item`Fourth of May Cosplay Saber`)) {
    spec.weapon = $item`Fourth of May Cosplay Saber`;
  }

  if (have($item`mafia thumb ring`)) spec.acc1 = $item`mafia thumb ring`;

  return spec;
}

const floristFlowers = [
  FloristFriar.StealingMagnolia,
  FloristFriar.AloeGuvnor,
  FloristFriar.PitcherPlant,
];

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
        have($item`protonic accelerator pack`) && canAdventure(get("ghostLocation", Location.none)),
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
        return {
          ...baggoOutfit(),
          back: $item`protonic accelerator pack`,
        };
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
      after: ["Dailies/Kgnee", "Party Fair"],
      completed: () => turnsRemaining() < 1 || myAdventures() === 0,
      prepare: (): void => {
        bubbleVision();
        if (
          haveEquipped($item`Jurassic Parka`) &&
          get("parkaMode").toLowerCase() !== "dilophosaur"
        ) {
          cliExecute("parka dilophosaur"); // Use grimoire's outfit modes for this once it is implemented
        }
      },
      do: $location`The Neverending Party`,
      outfit: baggoOutfit,
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
