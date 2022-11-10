import { Args, getTasks } from "grimoire-kolmafia";
import { Familiar, myAdventures, myTurncount, print } from "kolmafia";
import { $item, $slot, Session } from "libram";
import { Engine } from "./engine/engine";
import { formatNumber, printOutfit } from "./lib";
import { bestOutfit } from "./outfit";
import { setupPotions } from "./potions";
import { Sim } from "./sim";
import { BaggoQuest } from "./tasks/baggo";
import { DailiesQuest } from "./tasks/dailies";

export const args = Args.create("baggo", "A script for farming duffel bags and van keys.", {
  advs: Args.number({
    help: "Number of adventures to run (use negative numbers for the number of adventures remaining).",
    default: Infinity,
  }),
  itemvalue: Args.number({ help: "Value of a single duffel bag or van key.", default: 20_000 }),
  olfact: Args.string({
    help: "Which monster to olfact.",
    options: [
      ["none", "Do no olfact."],
      ["burnout", "Drops van key (food)."],
      ["jock", "Drops duffel bag (booze)."],
    ],
    default: "none",
  }),
  buff: Args.flag({ help: "Only buff up, do not spend any adventures.", default: false }),
  outfit: Args.string({
    help: "Name of the outfit whose pieces to equip when farming.",
    default: "",
  }),
  familiar: Args.custom<Familiar>(
    { help: "Familiar to use when farming." },
    Familiar.get,
    "FAMILIAR"
  ),
});

export const adventures = myAdventures();
export const turncount = myTurncount();

export function turnsRemaining(): number {
  if (args.advs === 0) return 0;
  if (isFinite(args.advs) && args.advs > 0) {
    const spent = myTurncount() - turncount;
    return Math.min(args.advs - spent, myAdventures());
  }
  const spend = myAdventures() + Math.min(0, args.advs);
  // return Math.round(spend / (1 - expectedAdvsGainedPerCombatTurn(bestOutfit(), 45)));
  return 0;
}

export function main(command?: string): void {
  Args.fill(args, command);
  if (args.help) {
    Args.showHelp(args);
    return;
  }

  const sim = new Sim(bestOutfit(), 50, 200);
  printOutfit(sim.outfit);
  print(`can pickpocket: ${sim.canPickpocket()}`);
  print(`can navel runaway: ${sim.canNavelRunaway()}`);
  print(`item bonus: ${sim.itemBonus()}`);
  print(`expected bags/keys: ${sim.expectedBagsOrKeysPerAdv()}`);

  const sim2 = new Sim(bestOutfit(), 51, 200);
  const sim3 = new Sim(bestOutfit(), 50, 201);
  print(
    `value of 1 lb: ${
      (sim2.expectedBagsOrKeysPerAdv() - sim.expectedBagsOrKeysPerAdv()) * args.itemvalue
    }`
  );
  print(
    `value of 1%: ${
      (sim3.expectedBagsOrKeysPerAdv() - sim.expectedBagsOrKeysPerAdv()) * args.itemvalue
    }`
  );

  // const tasks = getTasks([DailiesQuest(), BaggoQuest()]);
  // const engine = new Engine(tasks);
  // const sessionStart = Session.current();

  // if (engine.getNextTask()) {
  //   setupPotions();
  //   if (args.buff) return;
  // }

  // try {
  //   engine.run();
  // } finally {
  //   engine.destruct();
  // }

  // const sessionResults = Session.current().diff(sessionStart);
  // const bags = sessionResults.items.get($item`unremarkable duffel bag`) ?? 0;
  // const keys = sessionResults.items.get($item`van key`) ?? 0;
  // const advs = adventures - myAdventures();
  // const turns = myTurncount() - turncount;
  // const mpa = Math.round(((bags + keys) * args.itemvalue + sessionResults.meat) / advs);
  // print(`This run of baggo, you spent ${turns} turns and generated:`, "blue");
  // print(`* ${formatNumber(bags)} duffel bags`, "blue");
  // print(`* ${formatNumber(keys)} van keys`, "blue");
  // print(`* ${formatNumber(turns - advs)} advs`, "blue");
  // print(`* ${formatNumber(sessionResults.meat)} meat`, "blue");
  // print(`That's ${formatNumber(mpa)} MPA!`, "blue");
}
