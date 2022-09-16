/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Engine, getTasks } from "grimoire-kolmafia";
import { myAdventures, myTurncount } from "kolmafia";
import { effectResources } from "./effects";
import { CombatActions } from "./engine/combat";
import { setupPotions } from "./potions";
import { BaggoQuest } from "./tasks";

export const args = Args.create("baggo", "A script for farming duffel bags and van keys.", {
  turns: Args.number({
    help: "Number of turns to spend farming. Defaults to your current number of adventures.",
    default: myAdventures(),
  }),
  bagvalue: Args.number({ help: "Value of a single duffel bag or van key.", default: 20_000 }),
});

export const initialTurncount = myTurncount();

export function turnsRemaining(): number {
  return args.turns - (myTurncount() - initialTurncount);
}

export function main(command?: string): void {
  Args.fill(args, command);
  if (args.help) {
    Args.showHelp(args);
    return;
  }

  const tasks = getTasks([BaggoQuest]);
  const engine = new Engine<CombatActions>(tasks);

  if (engine.getNextTask()) {
    setupPotions();
    for (const resource of effectResources) {
      if (resource.available()) {
        resource.prepare?.();
        resource.do();
      }
    }
  }

  try {
    engine.run();
  } finally {
    engine.destruct();
  }
}
