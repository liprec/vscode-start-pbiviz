'use strict';
import * as vscode from 'vscode';

import * as pbiviz from './pbiviz-start';

export function activate(context: vscode.ExtensionContext) {
    let pbiVizStart = vscode.commands.registerCommand('extension.liprec.pbiviz.exec', () => {
        pbiviz.startPbiViz();
    });

    let pbiVizCancel = vscode.commands.registerCommand('extension.liprec.pbiviz.cancel', () => {
        pbiviz.stopPbiViz();
    });

    let pbiVizRestart = vscode.commands.registerCommand('extension.liprec.pbiviz.restart', () => {
        pbiviz.stopPbiViz();
        setTimeout(() => pbiviz.startPbiViz(), 1000); //Save delay to make sure that the child process is killed.
    });

    let pbiVizPackage = vscode.commands.registerCommand('extension.liprec.pbiviz.package', () => {
        pbiviz.pacakgePbiViz();
    });

    let pbiVizUpdate = vscode.commands.registerCommand('extension.liprec.pbiviz.update', () => {
        pbiviz.updatePbiViz();
    });

    context.subscriptions.push(pbiVizStart, pbiVizCancel, pbiVizRestart, pbiVizPackage, pbiVizUpdate);
}

export function deactivate() {
}