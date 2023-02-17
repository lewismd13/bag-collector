# Overview

This is a script for farming duffel bags and van keys, using the [grimoire](https://github.com/Loathing-Associates-Scripting-Society/grimoire) framework.

## Strategy

The script was originally designed to be run in aftercore after something like [garbo](https://github.com/Loathing-Associates-Scripting-Society/garbage-collector) has handled dieting and usage of daily resources, typically via `garbo nobarf`. It has evolved to be capable of running in ronin, Grey You, and even TCRS.

## Installation

To install the script, use the following command in the KoLMafia CLI.

```text
git checkout MrFizzyBubbs/bag-collector.git release
```

## Usage

Run `baggo`. It really is that simple!

The script provides several options that can be changed in a few different ways:

- By setting a mafia setting, e.g. `set baggo_olfact=jock`.
- By providing an argument at runtime, e.g. `baggo olfact=jock`. Note that any arguments provided at runtime override mafia settings.

Run `baggo help` for the full set of script commands and options:

```
> baggo help

A script for farming duffel bags and van keys.

Options:
  turns NUMBER - Number of turns to run (use negative numbers for the number of turns remaining). [default: Infinity]
  bagvalue NUMBER - Value of a single duffel bag or van key. [default: 20000] [setting: baggo_bagvalue]
  olfact TEXT - Which monster to olfact. [default: none] [setting: baggo_olfact]
    olfact none - Do no olfact.
    olfact burnout - Drops van key (food).
    olfact jock - Drops duffel bag (booze).
    olfact balance - Automatically choose one of the above options to keep your available bags/keys relatively equal.
  balance NUMBER - Maximum difference between your available bags/keys to be considered equal. This argument is only used when olfact=balance. [default: 50] [setting: baggo_balance]
  buff - Only do setup and buffing, do not adventure. [default: false] [setting: baggo_buff]
  outfit TEXT - Name of the outfit whose pieces to equip when farming. If not given, an outfit will be automatically selected [setting: baggo_outfit]
  familiar FAMILIAR - Familiar to use when farming. If not given, a familiar will be automatically selected. [setting: baggo_familiar]
  freerun - Use free runaway items after a successful pickpocket if economical. [default: false] [setting: baggo_freerun]
  help - Show this message and exit.
```
