import { Engine } from "./engine/engine";
import { args } from "./args";
import { endTracking, startTracking } from "./session";
import { BaggoQuest } from "./tasks/baggo";
import { DailiesQuest } from "./tasks/dailies";
import { Args, getTasks } from "grimoire-kolmafia";
import { availableAmount, Monster, wait } from "kolmafia";
import { $item, $monster } from "libram";
import { debug } from "./lib";

export let olfactMonster: Monster | undefined;

export function chooseOlfactMonster(): Monster | undefined {
  const bags = availableAmount($item`unremarkable duffel bag`);
  const keys = availableAmount($item`van key`);
  const diff =
    args.balance < 1 ? Math.abs((bags - keys) / ((bags + keys) / 2)) : Math.abs(bags - keys);

  switch (args.olfact) {
    case "none":
      return undefined;
    case "burnout":
      return $monster`burnout`;
    case "jock":
      return $monster`jock`;
    case "balance":
      if (diff <= args.balance) return undefined;
      return keys < bags ? $monster`burnout` : $monster`jock`;
    default:
      throw `Unknown olfact target: ${args.olfact}`;
  }
}

export function main(command?: string): void {
  Args.fill(args, command);
  if (args.help) {
    Args.showHelp(args);
    return;
  }

  olfactMonster = chooseOlfactMonster();
  if (args.olfact === "balance") {
    debug(`Choosing to olfact ${olfactMonster ?? "nothing"}`, "blue");
    wait(5);
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
