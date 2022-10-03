# bag-collector

`bag-collector` is a script for farming duffel bags and van keys outside of TCRS, typically as part of a full loop after running `garbo nobarf`.

## Installation

Run this command in the graphical CLI:

```text
git checkout https://github.com/MrFizzyBubbs/bag-collector.git
```

Will require [a recent build of KoLMafia](http://builds.kolmafia.us/job/Kolmafia/lastSuccessfulBuild/).

## Usage

Be out of ronin and either type `baggo` in the graphical CLI or select it from the Scripts menu. There are several optional arguments:

1. `turns` NUMBER - Number of turns to spend farming. Defaults to your current number of adventures. _[default: myAdventures()]_ _[setting: baggo_turns]_
2. `itemvalue` NUMBER - Value of a single duffel bag or van key. _[default: 20000]_ _[setting: baggo_bagvalue]_
3. `olfact` TEXT - Which monster to olfact. _[default: none]_ _[setting: baggo_olfact]_
   - none - Do not olfact.
   - burnout - Drops van key (food).
   - jock - Drops duffel bag (booze).
4. `buff` - Only buff up, do not spend any adventures. _[default: false]_ _[setting: baggo_buff]_

These arguments be specified in the CLI when running the script (e.g., `baggo turns=100`) or as a preference (e.g., `set itemvalue=15000`).
