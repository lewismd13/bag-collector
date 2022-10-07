import { OutfitSpec } from "grimoire-kolmafia";
import {
  canEquip,
  cliExecute,
  expectedColdMedicineCabinet,
  getWorkshed,
  Item,
  itemAmount,
  Monster,
  myClass,
  myLocation,
  outfitPieces,
  putCloset,
  runChoice,
  toEffect,
  totalTurnsPlayed,
  toUrl,
  visitUrl,
} from "kolmafia";
import {
  $effect,
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
  set,
  SongBoom,
} from "libram";
import { CombatStrategy } from "./engine/combat";
import { Quest } from "./engine/task";
import { args, turnsRemaining } from "./main";
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
  runChoice(5);
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
    if (!get("_floristPlantsUsed").includes(flower.name)) {
      visitUrl("place.php?whichplace=forestvillage&action=fv_friar");
      runChoice(1, `plant=${flower.id}`);
    }
  }
}

export const BaggoQuest: Quest = {
  name: "Baggo",
  tasks: [
    {
      name: "Acquire Kgnee",
      after: [],
      ready: () =>
        have($familiar`Reagnimated Gnome`) &&
        !have($item`gnomish housemaid's kgnee`) &&
        !get("_baggo_checkedGnome", false),
      completed: () =>
        !have($familiar`Reagnimated Gnome`) ||
        have($item`gnomish housemaid's kgnee`) ||
        get("_baggo_checkedGnome", false),
      do: (): void => {
        visitUrl("arena.php");
        runChoice(4);
        set("_baggo_checkedGnome", true);
      },
      outfit: { familiar: $familiar`Reagnimated Gnome` },
      limit: { tries: 1 },
    },
    {
      name: "Upgrade Saber",
      completed: () =>
        get("_saberMod") > 0 ||
        !have($item`Fourth of May Cosplay Saber`) ||
        have($item`June cleaver`),
      do: () => cliExecute("saber familiar"),
      limit: { tries: 1 },
    },
    {
      name: "Set Boombox",
      ready: () => SongBoom.have() && SongBoom.songChangesLeft() !== 0,
      completed: () => SongBoom.song() === "Food Vibrations",
      do: () => SongBoom.setSong("Food Vibrations"),
      limit: { tries: 1 },
    },
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
      name: "Closet Massagers",
      completed: () => itemAmount($item`personal massager`) === 0,
      do: () => putCloset(itemAmount($item`personal massager`), $item`personal massager`),
      limit: { tries: 1 },
    },
    {
      name: "Collect Bags",
      after: ["Acquire Kgnee", "Handle Quest"],
      completed: () => turnsRemaining() <= 0,
      prepare: (): void => {
        bubbleVision();
        coldMedicineCabinet();
        floristFriar();
        if (get("parkaMode").toLowerCase() !== "dilophosaur") cliExecute("parka dilophosaur"); // Use grimoire's outfit modes for this once it is implemented
      },
      do: $location`The Neverending Party`,
      outfit: (): OutfitSpec => {
        if (args.outfit !== "") {
          return {
            equip: outfitPieces(args.outfit),
            familiar: $familiar`Reagnimated Gnome`,
            famequip: $item`gnomish housemaid's kgnee`,
          };
        }

        const toEquip = [runwaySource()];
        if (myClass().primestat === $stat`moxie`) {
          if (have($item`carnivorous potted plant`)) toEquip.push($item`carnivorous potted plant`);
        } else if (canEquip($item`mime army infiltration glove`)) {
          toEquip.push($item`mime army infiltration glove`);
          if (have($item`carnivorous potted plant`)) toEquip.push($item`carnivorous potted plant`);
        } else {
          toEquip.push($item`tiny black hole`);
        }
        if (!have($effect`Everything Looks Yellow`) && have($item`Jurassic Parka`)) {
          toEquip.push($item`Jurassic Parka`);
        }

        return {
          weapon: have($item`June cleaver`)
            ? $item`June cleaver`
            : $item`Fourth of May Cosplay Saber`,
          acc1: $item`mafia thumb ring`,
          familiar: $familiar`Reagnimated Gnome`,
          famequip: $item`gnomish housemaid's kgnee`,
          equip: toEquip,
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
