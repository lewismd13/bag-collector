import { Args, getTasks } from "grimoire-kolmafia";
import { myAdventures } from "kolmafia";
import { effectResources } from "./effects";
import { Engine } from "./engine/engine";
import { setupPotions } from "./potions";
import { BaggoQuest } from "./tasks";

export const args = Args.create("baggo", "A script for farming duffel bags and van keys.", {
  advs: Args.number({
    help: "Number of adventures to spend farming. A value of -1 will spend all of your adventures, including those generated.",
    default: -1,
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
});

export const initialAdvs = myAdventures();

export function turnsRemaining(): number {
  if (args.advs === -1) return myAdventures();
  return args.advs - (initialAdvs - myAdventures());
}

export function main(command?: string): void {
  Args.fill(args, command);
  if (args.help) {
    Args.showHelp(args);
    return;
  }

  const tasks = getTasks([BaggoQuest]);
  const engine = new Engine(tasks);

  if (engine.getNextTask()) {
    setupPotions();
    for (const resource of effectResources) {
      if (resource.available()) {
        resource.prepare?.();
        resource.do();
      }
    }
    if (args.buff) return;
  }

  try {
    engine.run();
  } finally {
    engine.destruct();
  }
}
