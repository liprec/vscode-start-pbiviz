'use strict';
import * as vscode from 'vscode';

let spawn = require('child_process').spawn;
let exec = require('child_process').exec;

let pbivizProcess;
let pbiVizPID = 0;
let runningStatus = false;

export function startPbiViz() {
    let pbiVizOutputChannel = vscode.window.createOutputChannel('PBIViz Cli Control');

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
        
        pbivizProcess = spawn('pbiviz', ['start'], opt);

        let pbiVizPID = pbivizProcess.pid;

        pbivizProcess.stdout.on('data', (data) => {
            pbiVizOutputChannel.show();
            pbiVizOutputChannel.append(`${data}`);
        });

        pbivizProcess.stderr.on('data', (data) => {
            vscode.window.showErrorMessage(`Error starting pbiviz. See output for more details.`);
            pbiVizOutputChannel.append(`Error: ${data}`)
        });

        pbivizProcess.on('close', (code) => {
            pbiVizPID = pbiVizPID === pbivizProcess.pid ? 0 : pbiVizPID; 
            pbivizProcess= null;
            pbiVizOutputChannel.show();
            pbiVizOutputChannel.append(`PbiViz process stopped.`);
        });

    } catch (err) {
        console.log(err);
    }
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
