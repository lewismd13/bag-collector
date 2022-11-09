import { OutfitEquips as BaseOutfitEquips, outfitSlots, OutfitSpec } from "grimoire-kolmafia";
import {
  adv1,
  canAdventure,
  canEquip,
  canInteract,
  cliExecute,
  expectedColdMedicineCabinet,
  getWorkshed,
  haveEquipped,
  inebrietyLimit,
  Item,
  itemAmount,
  Location,
  Monster,
  myClass,
  myInebriety,
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
  $items,
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
import { gyou } from "../lib";
import { args, turnsRemaining } from "../main";
import { bubbleVision } from "../potions";

type OutfitEquips = BaseOutfitEquips & { equip?: Item[] };

function ready(item: Item | Item[] | OutfitEquips, condition: () => boolean = () => true): boolean {
  if (item instanceof Item) {
    return have(item) && canEquip(item) && condition();
  } else if (Array.isArray(item)) {
    return condition() && item.every((i) => ready(i));
  } else {
    return ready(item.equip ?? [], condition) && outfitSlots.every((s) => ready(item[s] ?? []));
  }
}

function first(...specs: OutfitSpec[]): OutfitSpec {
  return specs.find((s) => ready(s)) ?? {};
}

function ifReady(outfit: OutfitEquips, condition: () => boolean = () => true): OutfitEquips {
  if (condition()) {
    return first(outfit);
  } else {
    return {};
  }
}

function merge(...specs: OutfitSpec[]): OutfitSpec {
  return specs.reduce((merged, spec) => {
    const equip = [...(merged.equip ?? []), ...(spec.equip ?? [])];
    if (equip.length > 0) {
      return { ...spec, ...merged, ...{ equip } };
    } else {
      return { ...spec, ...merged };
    }
  });
}

export function pickpocketOutfit(): OutfitSpec {
  if (!$classes`Disco Bandit, Accordion Thief`.includes(myClass())) {
    return first(
      { equip: $items`mime army infiltration glove` },
      { offhand: $item`tiny black hole` }
    );
  }
  return {};
}

export function baggoOutfit(): OutfitSpec {
  const base: OutfitSpec = {
    modifier: "0.0014familiar weight 0.04item drop",
    avoid: [$item`time-twitching toolbelt`],
  };

  const familiar: OutfitSpec = args.familiar
    ? { familiar: args.familiar }
    : {
        familiar: $familiar`Reagnimated Gnome`,
        famequip: $item`gnomish housemaid's kgnee`,
      };

  if (args.outfit !== "") {
    return merge(familiar, { equip: outfitPieces(args.outfit) });
  }

  const sober = myInebriety() <= inebrietyLimit();

  const specs = [
    base,
    familiar,
    ifReady(
      {
        offhand: $item`Drunkula's wineglass`,
      },
      () => !sober
    ),
    ifReady(
      { back: $item`protonic accelerator pack` },
      () =>
        get("questPAGhost") === "unstarted" &&
        get("nextParanormalActivity") <= totalTurnsPlayed() &&
        sober
    ),
    first({ pants: $item`Greatest American Pants` }, { equip: $items`navel ring of navel gazing` }),
    pickpocketOutfit(),
    ifReady({
      offhand: $item`surprisingly capacious handbag`,
    }),
    ifReady({
      offhand: $item`carnivorous potted plant`,
    }),
    ifReady({ shirt: $item`Jurassic Parka` }, () => !have($effect`Everything Looks Yellow`)),
    ifReady({ back: $item`vampyric cloake` }),
    ifReady({ weapon: $item`June cleaver` }),
    ifReady({ weapon: $item`Fourth of May Cosplay Saber` }),
    ifReady({ equip: $items`mafia thumb ring` }),
  ];

  return merge(...specs);
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
      ready: () =>
        AutumnAton.available() &&
        AutumnAton.availableLocations().includes($location`The Neverending Party`),
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
          .trySkill($skill`Summon Love Gnats`)
          .trySkill($skill`Shoot Ghost`)
          .trySkill($skill`Shoot Ghost`)
          .trySkill($skill`Shoot Ghost`)
          .trySkill($skill`Trap Ghost`)
      ),
    },
    {
      name: "Collect Bags",
      after: ["Dailies/Kgnee", "Party Fair"],
      completed: () => false,
      prepare: (): void => {
        if (canInteract()) {
          bubbleVision();
        }
        if (
          haveEquipped($item`Jurassic Parka`) &&
          get("parkaMode").toLowerCase() !== "dilophosaur"
        ) {
          cliExecute(
            `parka ${have($effect`Everything Looks Yellow`) ? "ghostasaurus" : "dilophosaur"}`
          ); // Use grimoire's outfit modes for this once it is implemented
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
        $skill`Astral Shell`,
        $skill`Ghostly Shell`,
      ]
        .filter((skill) => have(skill))
        .map((skill) => toEffect(skill)),
      choices: { 1324: 5 },
      combat: new CombatStrategy()
        .banish($monsters`biker, party girl, "plain" girl`)
        .autoattack(
          Macro.externalIf(
            !gyou(),
            Macro.if_(`!hppercentbelow 75`, Macro.step("pickpocket")).skill(
              $skill`Summon Love Gnats`
            ),
            Macro.step("pickpocket")
          )
            .if_(`match "unremarkable duffel bag" || match "van key"`, Macro.runaway())
            .trySkill($skill`Spit jurassic acid`)
            .if_(
              "!hppercentbelow 75 && !mpbelow 40",
              Macro.trySkill($skill`Double Nanovision`).trySkill($skill`Double Nanovision`)
            ),
          $monsters`burnout, jock`
        )
        .autoattack((): Macro => {
          return args.olfact !== "none"
            ? Macro.if_(Monster.get(args.olfact), Macro.trySkill($skill`Transcendent Olfaction`))
            : new Macro();
        })
        .kill(),
    },
  ],
  completed: () => turnsRemaining() <= 0,
};
