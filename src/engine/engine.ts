import { args } from "../args";
import { Calculator } from "../calculator";
import { CombatActions, MyActionDefaults } from "./combat";
import { equipFirst } from "./outfit";
import { unusedBanishes } from "./resources";
import { Task } from "./task";
import { Engine as BaseEngine, CombatResources, CombatStrategy, Outfit } from "grimoire-kolmafia";
import {
  cliExecute,
  haveEffect,
  haveEquipped,
  Item,
  Location,
  mallPrice,
  myAdventures,
  readCcs,
  setAutoAttack,
  toInt,
  writeCcs,
} from "kolmafia";
import {
  $effect,
  $item,
  $items,
  get,
  getBanishedMonsters,
  have,
  Macro,
  PropertiesManager,
} from "libram";

const grimoireCCS = "grimoire_macro";
type FreeRun = { item: Item; successRate: number; price: number };
const RUN_SOURCES = [
  { item: $item`tattered scrap of paper`, successRate: 0.5 },
  { item: $item`green smoke bomb`, successRate: 0.9 },
  { item: $item`GOTO`, successRate: 0.3 },
];

export class Engine extends BaseEngine<CombatActions, Task> {
  cachedCss = "";
  static runSource: FreeRun | null = null;

  static runMacro(): Macro {
    if (!Engine.runSource)
      return Macro.externalIf(
        $items`navel ring of navel gazing, Greatest American Pants`.some((i) => haveEquipped(i)),
        Macro.runaway()
      );
    return Macro.while_(
      `hascombatitem ${toInt(Engine.runSource.item)}`,
      Macro.item(Engine.runSource.item)
    );
  }

  constructor(tasks: Task[]) {
    super(tasks, { combat_defaults: new MyActionDefaults() });
    if (args.freerun) {
      Engine.runSource =
        RUN_SOURCES.map(({ item, successRate }) => ({
          item,
          successRate,
          price:
            Calculator.current().bagsGainedPerAdv() * args.bagvalue - mallPrice(item) / successRate, // Break-even price
        }))
          .sort((a, b) => b.price - a.price)
          .find(({ price }) => price > 0) ?? null;
    }
  }

  acquireItems(task: Task): void {
    const items = task.acquire
      ? typeof task.acquire === "function"
        ? task.acquire()
        : task.acquire
      : [];

    if (Engine.runSource) {
      items.push({
        ...Engine.runSource,
        num: Math.ceil(
          Math.log(1 / (1 - 0.999)) / Math.log(1 / (1 - Engine.runSource.successRate))
        ),
      });
    }
    super.acquireItems({ ...task, acquire: items });
  }

  execute(task: Task): void {
    const beaten_turns = haveEffect($effect`Beaten Up`);
    const start_advs = myAdventures();
    super.execute(task);
    // Crash if we unexpectedly lost the fight
    if (have($effect`Beaten Up`) && haveEffect($effect`Beaten Up`) <= 3) {
      // Poetic Justice gives 5
      if (
        haveEffect($effect`Beaten Up`) > beaten_turns || // Turns of beaten-up increased, so we lost
        (haveEffect($effect`Beaten Up`) === beaten_turns && myAdventures() < start_advs) // Turns of beaten-up was constant but adventures went down, so we lost fight while already beaten up
      )
        throw `Fight was lost (debug info: ${beaten_turns} => ${haveEffect(
          $effect`Beaten Up`
        )}, (${start_advs} => ${myAdventures()}); stop.`;
    }
  }

  setCombat(
    task: Task,
    task_combat: CombatStrategy<CombatActions>,
    task_resources: CombatResources<CombatActions>
  ): void {
    // Save regular combat macro
    const macro = task_combat.compile(
      task_resources,
      this.options?.combat_defaults,
      task.do instanceof Location ? task.do : undefined
    );

    if (macro.toString() !== this.cachedCss) {
      // Use the macro through a CCS file
      this.cachedCss = macro.toString();
      writeCcs(`[ default ]\n"${macro.toString()}"`, grimoireCCS);
      cliExecute(`ccs ${grimoireCCS}`); // force Mafia to reparse the ccs
    }

    // Save autoattack combat macro
    const autoattack = task_combat.compileAutoattack().step(macro);

    if (autoattack.toString().length > 1) {
      autoattack.save();
      autoattack.setAutoAttack();
    } else {
      setAutoAttack(0);
    }
  }

  customize(
    task: Task,
    outfit: Outfit,
    combat: CombatStrategy<CombatActions>,
    resources: CombatResources<CombatActions>
  ): void {
    // Set up a banish if needed
    const banishSources = unusedBanishes(combat.where("banish"));
    if (combat.can("banish")) resources.provide("banish", equipFirst(outfit, banishSources));

    const alreadyBanished = [...getBanishedMonsters().values()];
    for (const monster of alreadyBanished) {
      const strategy = combat.currentStrategy(monster);
      if (strategy === "banish") combat.macro(Macro.runaway(), monster);
    }
  }

  initPropertiesManager(manager: PropertiesManager): void {
    // Properties adapted from garbo
    manager.set({
      logPreferenceChange: true,
      logPreferenceChangeFilter: [
        ...new Set([
          ...get("logPreferenceChangeFilter").split(","),
          "libram_savedMacro",
          "maximizerMRUList",
          "testudinalTeachings",
          "_lastCombatStarted",
        ]),
      ]
        .sort()
        .filter((a) => a)
        .join(","),
      battleAction: "custom combat script",
      autoSatisfyWithMall: true,
      autoSatisfyWithNPCs: true,
      autoSatisfyWithCoinmasters: true,
      autoSatisfyWithStash: false,
      dontStopForCounters: true,
      maximizerFoldables: true,
      afterAdventureScript: "",
      betweenBattleScript: "",
      choiceAdventureScript: "",
      familiarScript: "",
      currentMood: "apathetic",
      autoTuxedo: true,
      autoPinkyRing: true,
      autoGarish: true,
      allowNonMoodBurning: false,
      allowSummonBurning: true,
      libramSkillsSoftcore: "none",
    });
    if (this.options.ccs !== "") {
      if (this.options.ccs === undefined && readCcs(grimoireCCS) === "") {
        // Write a simple CCS so we can switch to it
        writeCcs("[ default ]\nabort", grimoireCCS);
      }
      manager.set({ customCombatScript: this.options.ccs ?? grimoireCCS });
    }
  }

  destruct(): void {
    super.destruct();
    setAutoAttack(0);
  }
}
