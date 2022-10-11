import { cliExecute, runChoice, visitUrl } from "kolmafia";
import { $familiar, $item, get, have, SongBoom } from "libram";
import { Quest } from "../engine/task";

export const DailiesQuest: Quest = {
  name: "Dailies",
  tasks: [
    {
      name: "Kgnee",
      ready: () => have($familiar`Reagnimated Gnome`),
      completed: () =>
        [
          $item`gnomish swimmer's ears`,
          $item`gnomish coal miner's lung`,
          $item`gnomish tennis elbow`,
          $item`gnomish housemaid's kgnee`,
          $item`gnomish athlete's foot`,
        ].some((item) => have(item)),
      do: (): void => {
        visitUrl("arena.php");
        runChoice(4);
      },
      outfit: { familiar: $familiar`Reagnimated Gnome` },
      limit: { tries: 1 },
    },
    {
      name: "Mummery Item",
      ready: () => have($item`mumming trunk`),
      completed: () => get("_mummeryMods").includes("Item Drop"),
      do: () => cliExecute("mummery item"),
      outfit: { familiar: $familiar`Reagnimated Gnome` },
      limit: { tries: 1 },
    },
    {
      name: "Cosplay Saber",
      ready: () => have($item`Fourth of May Cosplay Saber`),
      completed: () => get("_saberMod") !== 0,
      do: () => cliExecute("saber familiar"),
      limit: { tries: 1 },
    },
    {
      name: "SongBoom",
      ready: () => SongBoom.have() && SongBoom.songChangesLeft() > 0,
      completed: () => SongBoom.song() === "Food Vibrations",
      do: () => SongBoom.setSong("Food Vibrations"),
      limit: { tries: 1 },
    },
    {
      name: "Horsery",
      ready: () => get("horseryAvailable"),
      completed: () => get("_horsery") === "dark horse",
      do: () => cliExecute("horsery dark"),
      limit: { tries: 1 },
    },
  ],
};
