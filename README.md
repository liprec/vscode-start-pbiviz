# vscode-start-pbiviz README

This Visual Studio Code extension adds the option to directly start and restart the PowerBI Visual tools ([*pbiviz*](https://github.com/Microsoft/PowerBI-visuals-tools))
for developing Power BI Custom Visuals.

## Features

Add 'build-in' support for *pbiviz* in Visual Studio Code.

- Ctrl+F8:        Start *pbiviz* and load the Power BI Custom Visual
- Crtl+Shift+F8:  Restart *pbiviz* and reload the new Power BI Custom Visual code
- Ctrl+F9:        Stop *pbiviz*

## Requirements

The PowerBI Visual Tools (pbiviz) should be installed before this extension can be used. 
See [the Power BI Visual Tools Readme](https://github.com/Microsoft/PowerBI-visuals-docs/blob/master/tools/README.md#installation)
for more information on how to install the tools.

## Known issues

An stack trace is shown in the output if *pbiviz* is started the second time: I have not yet found a good way to
determine if *pbiviz* is running and it cannot be started multiple times. 

## Release Notes

### 0.0.2
Initial release of this extension.
Simple start, stop and restart of pbiviz
