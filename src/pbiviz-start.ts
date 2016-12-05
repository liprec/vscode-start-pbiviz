'use strict';
import * as vscode from 'vscode';

let spawn = require('child_process').spawn;
let exec = require('child_process').exec;

let pbivizProcess;
let pbiVizOutputChannel;
let pbiVizPID = 0;
let runningStatus = false;

export function startPbiViz() {
    runPbiViz('start');
}

export function stopPbiViz() {
    // cancel running process
    if (pbivizProcess) {
        let isWin = /^win/.test(process.platform);
        if(!isWin) {
            pbivizProcess.kill();
        } else {
            exec('taskkill /PID ' + pbivizProcess.pid + ' /T /F', function (error, stdout, stderr) {});             
        }
    } else {
        runningStatus = null;
    }
}

export function pacakgePbiViz() {
    runPbiViz('package');
}

export function updatePbiViz() {
    runPbiViz('update');
}

function runPbiViz(parameter: string) {
    if (pbiVizOutputChannel==undefined) {
        pbiVizOutputChannel = vscode.window.createOutputChannel('PBIViz Cli Control');
    } else {
        pbiVizOutputChannel.clear();
    }
    pbiVizOutputChannel.show(false);
    
    if (pbiVizPID != 0) {
        vscode.window.showErrorMessage('Process is already running!');
        return;
    }

    let dirName = vscode.workspace.rootPath
    if (!dirName || dirName === '' || dirName === '.') {
        vscode.window.showWarningMessage('Unkown working directory! Try to save the file befor running.');
        return;
    }

    try {
        let opt : any = {};
        if (vscode.workspace) {
            opt.cwd = dirName;
            opt.shell = true;
        }
        
        pbivizProcess = spawn('pbiviz', [parameter], opt);

        let pbiVizPID = pbivizProcess.pid;

        pbivizProcess.stdout.on('data', (data) => {
            pbiVizOutputChannel.append(`${data}`);
        });

        pbivizProcess.stderr.on('data', (data) => {
            vscode.window.showErrorMessage(`Error starting pbiviz. See output for more details.`);
            pbiVizOutputChannel.append(`Error: ${data}`)
        });

        pbivizProcess.on('close', (code) => {
            pbiVizPID = pbiVizPID === pbivizProcess.pid ? 0 : pbiVizPID; 
            pbivizProcess= null;
            if (parameter==="start") {
                pbiVizOutputChannel.show(false);
                pbiVizOutputChannel.append(`\nPbiViz process stopped.\n`);
            }
        });

    } catch (err) {
        console.log(err);
    }
}