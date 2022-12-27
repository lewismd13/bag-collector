import { myAdventures, myTurncount, print, todayToString } from "kolmafia";
import { $item, get, Session, set } from "libram";
import { formatNumber } from "./lib";
import { adventures, args, turncount } from "./main";

const dailyProperties = ["bags", "keys", "adventures", "turns", "meat", "runs"] as const;
export type DailyProperty = typeof dailyProperties[number];
export type DailyResult = { current: number; total: number };

export function trackDaily(property: DailyProperty, current = 0): DailyResult {
  if (get("baggo_day", "") !== todayToString()) {
    for (const dailyProperty of dailyProperties) {
      set(`baggo_${dailyProperty}`, 0);
    }
    set("baggo_day", todayToString());
  }
  const dailyProperty = `baggo_${property}`;
  const total = get(dailyProperty, 0) + current;
  print(`set(${dailyProperty}, ${total})`);
  set(dailyProperty, total);
  return { current, total };
}

let sessionStart = Session.current();
let initialRuns = get("_navelRunaways");

function printResults(results: Record<DailyProperty, DailyResult>, attr: keyof DailyResult): void {
  const { bags, keys, meat, adventures, turns, runs } = results;
  const mpa = Math.round(((bags[attr] + keys[attr]) * args.itemvalue + meat[attr]) / turns[attr]);
  print(`Across ${formatNumber(turns[attr])} you generated`);
  print(`* ${formatNumber(bags[attr])} duffel bags`, "blue");
  print(`* ${formatNumber(keys[attr])} van keys`, "blue");
  print(`* ${formatNumber(adventures[attr])} advs`, "blue");
  print(`* ${formatNumber(runs[attr])} GAP/Navel runs`, "blue");
  print(`* ${formatNumber(meat[attr])} meat`, "blue");
  print(`That's ${formatNumber(mpa)} MPA!`, "blue");
}

export function startTracking(): void {
  sessionStart = Session.current();
  initialRuns = get("_navelRunaways");
}

export function endTracking(): void {
  const sessionResults = Session.current().diff(sessionStart);
  const runs = get("_navelRunaways") - initialRuns;

  const turns = myTurncount() - turncount;
  const dailyResults = {
    bags: trackDaily("bags", sessionResults.items.get($item`unremarkable duffel bag`) ?? 0),
    keys: trackDaily("keys", sessionResults.items.get($item`van key`) ?? 0),
    turns: trackDaily("turns", turns),
    adventures: trackDaily("adventures", turns - (adventures - myAdventures())),
    meat: trackDaily("meat", sessionResults.meat),
    runs: trackDaily("runs", runs),
  };

  print("This run of baggo:", "blue");
  printResults(dailyResults, "current");
  print("So far today:", "blue");
  printResults(dailyResults, "total");
}
