import { Args } from "grimoire-kolmafia";

export const args = Args.create("baggo", "A script for farming duffel bags and van keys.", {
  turns: Args.number({
    help: "Number of turns to run (use negative numbers for the number of turns remaining).",
    default: Infinity,
    setting: "",
  }),
  bagvalue: Args.number({ help: "Value of a single duffel bag or van key.", default: 20_000 }),
  olfact: Args.string({
    help: "Which monster to olfact.",
    options: [
      ["none", "Do no olfact."],
      ["burnout", "Drops van key (food)."],
      ["jock", "Drops duffel bag (booze)."],
    ],
    default: "none",
  }),
  buff: Args.flag({
    help: "Only do setup and buffing, do not adventure.",
    default: false,
  }),
  outfit: Args.string({
    help: "Name of the outfit whose pieces to equip when farming. If not given, an outfit will be automatically selected",
  }),
  familiar: Args.familiar({
    help: "Familiar to use when farming. If not given, a familiar will be automatically selected.",
  }),
  freerun: Args.flag({
    help: "Use free runaway items after a successful pickpocket if economical.",
    default: false,
  }),
});
