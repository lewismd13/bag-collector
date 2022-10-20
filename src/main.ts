import { Args, getTasks } from "grimoire-kolmafia";
import { canInteract, Familiar, myAdventures, myTurncount, toFamiliar } from "kolmafia";
import { Engine } from "./engine/engine";
import { expectedAdvsGainedPerCombat } from "./lib";
import { setupPotions } from "./potions";
import { endTracking, startTracking } from "./session";
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
    {
      help: "The familiar to use",
    },
    (val: string) => toFamiliar(val),
    "FAMILIAR"
  ),
});

export const adventures = myAdventures();
export const turncount = myTurncount();

export function turnsRemaining(): number {
  if (isFinite(args.advs) && args.advs > 0) {
    const spent = myTurncount() - turncount;
    return Math.min(args.advs - spent, myAdventures());
  }
  const spend = myAdventures() + Math.min(0, args.advs);
  return Math.round(spend / (1 - expectedAdvsGainedPerCombat()));
}

export function main(command?: string): void {
  Args.fill(args, command);
  if (args.help) {
    Args.showHelp(args);
    return;
  }

  const tasks = getTasks([DailiesQuest, BaggoQuest]);
  const engine = new Engine(tasks);

  startTracking();

  if (engine.getNextTask()) {
    if (canInteract()) setupPotions();
    if (args.buff) return;
  }

  try {
    engine.run();
  } finally {
    engine.destruct();
    endTracking();
  }
}
