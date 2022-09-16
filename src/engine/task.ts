import { CombatActions, CombatStrategy } from "./combat";
import { Quest as BaseQuest, Task as BaseTask } from "grimoire-kolmafia";

export type Quest = BaseQuest<Task>;
export type Task = {
  combat?: CombatStrategy;
} & BaseTask<CombatActions>;
