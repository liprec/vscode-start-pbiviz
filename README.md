# vscode-start-pbiviz README

This Visual Studio Code extension adds the option to directly interact with the PowerBI Visual tools ([*pbiviz*](https://github.com/Microsoft/PowerBI-visuals-tools))
for developing Power BI Custom Visuals without leaving Visual Studio Code.

## Features

Add 'build-in' support for *pbiviz* in Visual Studio Code.

- Start *pbiviz* and load the Power BI Custom Visual [(]Ctrl+F8]
- Restart *pbiviz* and reload the new Power BI Custom Visual code [Ctrl+Shift+F8]
- Stop *pbiviz* [Ctrl+F9]
- Package Power BI Custom Visual [Ctrl+Shift+B]
- Update Power BI Custom Visual API

## Requirements

The PowerBI Visual Tools (pbiviz) should be installed before this extension can be used. 
See [the Power BI Visual Tools Readme](https://github.com/Microsoft/PowerBI-visuals-docs/blob/master/tools/README.md#installation)
for more information on how to install the tools.

## Known issues

An stack trace is shown in the output if *pbiviz* is started the second time: I have not yet found a good way to
determine if *pbiviz* is running and it cannot be started multiple times. 

## Release Notes

### 0.0.4

- Added 'pbiviz package' command
- Added 'pbiviz update' command
- Reduce output window pop-up

### 0.0.3

- [Bug] Fixed restart sequence to avoid 'race' conditions with child process.

### 0.0.2
Initial release of this extension.
Simple start, stop and restart of pbiviz
