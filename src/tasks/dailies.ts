import {
  availableAmount,
  buyUsingStorage,
  canEquip,
  cliExecute,
  getClanLounge,
  Item,
  mallPrice,
  mySign,
  retrieveItem,
  Slot,
  storageAmount,
  toSlot,
  use,
  useSkill,
} from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $skill,
  AsdonMartin,
  get,
  getModifier,
  have,
  ReagnimatedGnome,
  SongBoom,
  SourceTerminal,
} from "libram";
import { Quest, Task } from "../engine/task";
import { itemFamiliar } from "../familiar/item-familiar";
import { canPull, gyou, ronin, turnsRemaining } from "../lib";

function pull(item: Item): Task {
  return {
    name: `Pull ${item}`,
    ready: () =>
      canPull(item) && (toSlot(item) === Slot.none || canEquip(item)) && storageAmount(item) >= 1,
    completed: () => !canPull(item),
    do: () => cliExecute(`pull ${item}`),
  };
}

function buyPull(item: Item, price: number): Task[] {
  if (item.tradeable && ronin()) {
    return [
      {
        name: `Buy ${item} to pull`,
        ready: () =>
          canPull(item) &&
          (toSlot(item) === Slot.none || canEquip(item)) &&
          mallPrice(item) <= price,
        completed: () => storageAmount(item) >= 1,
        do: () => buyUsingStorage(item, 1, price),
      },
      pull(item),
    ];
  } else {
    return [pull(item)];
  }
}

export function DailiesQuest(): Quest {
  return {
    name: "Dailies",
    tasks: [
      {
        name: "Pool Table",
        ready: () => $item`Clan pool table`.name in getClanLounge(),
        completed: () => get("_poolGames") >= 3,
        do: () => cliExecute("pool stylish"),
        limit: { tries: 3 },
      },
      {
        name: "Kgnee",
        ready: () => have($familiar`Reagnimated Gnome`),
        completed: () => have($item`gnomish housemaid's kgnee`),
        do: () => ReagnimatedGnome.choosePart("kgnee"),
        outfit: { familiar: $familiar`Reagnimated Gnome` },
        limit: { tries: 1 },
      },
      {
        name: "Source Terminal Enhance",
        ready: () => SourceTerminal.have(),
        completed: () => SourceTerminal.getEnhanceUses() >= 3,
        do: () => SourceTerminal.enhance($effect`items.enh`),
        limit: { tries: 3 },
      },
      {
        name: "Kremlin's Greatest Briefcase Buff",
        ready: () => have($item`Kremlin's Greatest Briefcase`),
        completed: () => get("_kgbClicksUsed") >= 22,
        do: () => cliExecute("Briefcase buff item"),
        limit: { tries: 8 },
      },
      {
        name: "Asdon Martin Fuel",
        ready: () => gyou() && ronin() && !["Mongoose", "Wallaby", "Vole"].includes(mySign()),
        completed: () =>
          have($effect`Driving Observantly`, turnsRemaining()) ||
          have($item`loaf of soda bread`, 100),
        do: () =>
          retrieveItem(5, $item`all-purpose flower`) &&
          use(5, $item`all-purpose flower`) &&
          retrieveItem(availableAmount($item`wad of dough`), $item`loaf of soda bread`),
      },
      {
        name: "Asdon Martin",
        ready: () => AsdonMartin.installed(),
        completed: () => have($effect`Driving Observantly`, turnsRemaining()),
        do: () => AsdonMartin.drive($effect`Driving Observantly`, turnsRemaining()),
      },
      {
        name: "Horsery",
        ready: () => get("horseryAvailable"),
        completed: () => get("_horsery") === "dark horse",
        do: () => cliExecute("horsery dark"),
        limit: { tries: 1 },
      },
      {
        name: "Mummery Item",
        ready: () => have($item`mumming trunk`),
        completed: () => get("_mummeryMods").includes("Item Drop"),
        do: () => cliExecute("mummery item"),
        outfit: () => {
          return {
            familiar: itemFamiliar(),
          };
        },
        limit: { tries: 1 },
      },
      {
        name: "Clan Fortune",
        ready: () => $item`Clan Carnival Game`.name in getClanLounge(),
        completed: () => get("_clanFortuneBuffUsed"),
        do: () => cliExecute("fortune buff item"),
      },
      {
        name: "SongBoom",
        ready: () => SongBoom.have() && SongBoom.songChangesLeft() > 0,
        completed: () => SongBoom.song() === "Food Vibrations",
        do: () => SongBoom.setSong("Food Vibrations"),
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
        name: "Bird Calendar",
        ready: () => have($item`Bird-a-Day calendar`),
        completed: () => have($skill`Seek out a Bird`),
        do: () => use(1, $item`Bird-a-Day calendar`),
        limit: { tries: 1 },
      },
      {
        name: "Daily Bird",
        after: ["Bird Calendar"],
        ready: () =>
          getModifier("Item Drop", $effect`Blessing of the Bird`) > 0 ||
          getModifier("Familiar Weight", $effect`Blessing of the Bird`) > 0,
        completed: () => get("_birdsSoughtToday") >= 6,
        do: () => useSkill($skill`Seek out a Bird`, 6 - get("_birdsSoughtToday")),
      },
      {
        name: "Favorite Bird",
        after: ["Bird Calendar"],
        ready: () =>
          have($skill`Visit your Favorite Bird`) &&
          (getModifier("Item Drop", $effect`Blessing of your favorite Bird`) > 0 ||
            getModifier("Familiar Weight", $effect`Blessing of your favorite Bird`) > 0),
        completed: () => get("_favoriteBirdVisited"),
        do: () => useSkill($skill`Visit your Favorite Bird`),
      },
      ...buyPull($item`human musk`, 15000),
      ...buyPull($item`ice house`, 50000),
      pull($item`mime army infiltration glove`),
      {
        name: "Craft Tiny Black Hole",
        ready: () => !have($item`mime army infiltration glove`),
        do: () => retrieveItem($item`tiny black hole`),
        completed: () => have($item`tiny black hole`),
        limit: { tries: 1 },
      },
    ],
  };
}
