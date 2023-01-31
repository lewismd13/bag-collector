import { Engine } from "./engine/engine";
import { args } from "./args";
import { endTracking, startTracking } from "./session";
import { BaggoQuest } from "./tasks/baggo";
import { DailiesQuest } from "./tasks/dailies";
import { Args, getTasks } from "grimoire-kolmafia";

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
