import { Args, getTasks } from "grimoire-kolmafia";
import { myAdventures, myTurncount } from "kolmafia";
import { Engine } from "./engine/engine";
import { Calculator } from "./calculator";
import { BaggoQuest } from "./tasks/baggo";
import { DailiesQuest } from "./tasks/dailies";
import { endTracking, startTracking } from "./session";

export const args = Args.create("baggo", "A script for farming duffel bags and van keys.", {
  advs: Args.number({
    help: "Number of adventures to run (use negative numbers for the number of adventures remaining).",
    default: Infinity,
  }),
  bagvalue: Args.number({ help: "Value of a single duffel bag or van key.", default: 20_000 }),
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
    help: "Name of the outfit whose pieces to equip when farming. If not given, an outfit will be automatically selected",
  }),
  familiar: Args.familiar({
    help: "Familiar to use when farming. If not given, a familiar will be automatically selected.",
  }),
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
  return Math.round(spend / (1 - Calculator.baseline().advsGainedPerTurnTakingCombat()));
}

export function main(command?: string): void {
  Args.fill(args, command);
  if (args.help) {
    Args.showHelp(args);
    return;
  }

  const tasks = getTasks([DailiesQuest(), BaggoQuest()]);
  const engine = new Engine(tasks);

  startTracking();

  try {
    engine.run();
  } finally {
    engine.destruct();
    endTracking();
  }
}
