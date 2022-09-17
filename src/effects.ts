import { cliExecute, getClanLounge, use, useSkill } from "kolmafia";
import { $effect, $item, $skill, get, getModifier, have, SourceTerminal } from "libram";

export type EffectResource = {
  name: string;
  available: () => boolean;
  prepare?: () => void;
  do: () => void;
};

export const effectResources: EffectResource[] = [
  {
    name: "Fortune",
    available: () =>
      $item`Clan Carnival Game`.name in getClanLounge() && !get("_clanFortuneBuffUsed"),
    do: () => cliExecute("fortune buff item"),
  },
  {
    name: "Enhance",
    available: () => SourceTerminal.have() && SourceTerminal.getEnhanceUses() < 3,
    do: (): void => {
      while (SourceTerminal.getEnhanceUses() < 3) SourceTerminal.enhance($effect`items.enh`);
    },
  },
  {
    name: "KGB",
    available: () => have($item`Kremlin's Greatest Briefcase`) && get("_kgbClicksUsed") < 22,
    do: (): void => {
      const buffTries = Math.ceil((22 - get("_kgbClicksUsed")) / 3);
      cliExecute(`Briefcase buff ${new Array<string>(buffTries).fill("item").join(" ")}`);
    },
  },
  {
    name: "Favorite Bird",
    available: () =>
      have($item`Bird-a-Day calendar`) &&
      !get("_favoriteBirdVisited") &&
      (getModifier("Item Drop", $effect`Blessing of your favorite Bird`) > 0 ||
        getModifier("Familiar Weight", $effect`Blessing of your favorite Bird`) > 0),
    prepare: (): void => {
      if (!have($skill`Seek out a Bird`)) {
        use(1, $item`Bird-a-Day calendar`);
      }
    },
    do: () => useSkill($skill`Visit your Favorite Bird`),
  },
  {
    name: "Bird",
    available: () =>
      get("_birdsSoughtToday") < 6 &&
      (getModifier("Item Drop", $effect`Blessing of the Bird`) > 0 ||
        getModifier("Familiar Weight", $effect`Blessing of the Bird`) > 0),
    prepare: (): void => {
      if (!have($skill`Seek out a Bird`)) {
        use(1, $item`Bird-a-Day calendar`);
      }
    },
    do: () => useSkill($skill`Seek out a Bird`, 6 - get("_birdsSoughtToday")),
  },
  {
    name: "Pool Table",
    available: () => $item`Clan pool table`.name in getClanLounge() && get("_poolGames") < 3,
    do: (): void => {
      while (get("_poolGames") < 3) cliExecute("pool stylish");
    },
  },
];
