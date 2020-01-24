import {app, BrowserWindow, Menu, ipcMain, ipcRenderer} from 'electron';
import {spawn} from 'child_process';
import * as log from 'electron-log';
import * as path from 'path';
import * as url from 'url';

import { initSplashScreen, OfficeTemplate } from 'electron-splashscreen';
import { resolve } from 'app-root-path';
import * as isDev from 'electron-is-dev';

const findProcess = require('find-process');

var mainWindow: BrowserWindow;
var loadingScreen: BrowserWindow;

var shellRunner = undefined;
let unSaved = false;

app.on('ready', () => {
  runCpnServer();
  setTimeout(() => createLoadingScreen(), 1000);
  setTimeout(() => createWindow(), 5000);
});

function createWindow() {
  const directory = isDev ? process.cwd().concat('/app') : process.env.APP_PATH;

  mainWindow = new BrowserWindow({ width: 1920, height: 1080, show: false });
  mainWindow.setMenuBarVisibility(true);
  // mainWindow.setFullScreen(true);

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './../../dist/cpn-ide/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  // mainWindow.webContents.openDevTools();

  ipcMain.on('app.init.complete', function (event, arg) {
    setTimeout(() => {
      if (mainWindow) {
        mainWindow.show();
      }

      if (loadingScreen) {
        loadingScreen.close();
        loadingScreen = undefined;
      }
    }, 1000);
  });

  // App close handler
  // app.on('before-quit', function () {
  //   log.info('app, before-quit');
  //   killCpnServer().then(() => {
  //     log.info('app, before-quit, killCpnServer() complete!');
  //   });
  // });

  let realyClosed = false;
  mainWindow.on('close', function (data) {
    if (realyClosed) {
      return;
    }

    //  ---Prompt to save
    // if (unSaved) {
    //   const choice = require('electron').dialog.showMessageBox(this,
    //     {
    //       type: 'question',
    //       buttons: ['Exit', 'Back', 'Save As' ],
    //       title: 'Confirm',
    //       message: 'Save the changes to file before closing?'
    //     });
    //   if (choice !== 0) {
    //     data.preventDefault();
    //     if (choice === 2){
    //       mainWindow.webContents.send('main.menu.save.project');
    //     }
    //     return;
    //   }
    // }


    log.info('mainWindow, close');
    killCpnServer().then(
      (result) => {
        log.info('mainWindow, close, killCpnServer() COMPLETE: ', result);
        realyClosed = true;
        mainWindow.close();
      },
      (error) => {
        log.error('mainWindow, close, killCpnServer() ERROR: ', error);
        realyClosed = true;
        mainWindow.close();
      }
    );
    data.preventDefault();
  });

  log.info('APP PATH = ', app.getAppPath());

  // mainWindow.on('closed', () => { mainWindow = null; });

  log.info('isDev = ', isDev);
  log.info('directory = ', directory);
  log.info('process.cwd() = ', process.cwd());
  log.info('__dirname = ', __dirname);

  var menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { label: 'New project', click() { newProject() } },
        { type: 'separator' },
        { label: 'Open project', click() { openProject() }, accelerator: 'Ctrl+O' },
        { label: 'Save project', click() { saveProject() }, accelerator: 'Ctrl+S' },
        { type: 'separator' },
        { label: 'Exit', click() { app.quit() }, accelerator: 'Alt+F4' }
      ]
    },
    {
      label: 'Tools',
      submenu: [
        {
          label: 'Restart CPN server', click() {
            killCpnServer().then(
              (success) => runCpnServer(),
              (error) => runCpnServer()
              );
          }
        },
        { type: 'separator' },
        { label: 'Developer tools', click() { mainWindow.webContents.openDevTools() }, accelerator: 'F12' }
      ]
    }
  ])
  Menu.setApplicationMenu(menu);

  ipcMain.on('model.save.backup',() => unSaved = true);
  ipcMain.on('project.saved',() => unSaved = false);
}

function createLoadingScreen() {
  loadingScreen = new BrowserWindow({ width: 600, height: 400, frame: false, show: true, parent: mainWindow });
  loadingScreen.setMenuBarVisibility(false);
  loadingScreen.loadURL(
    url.format({
      pathname: path.join(__dirname, './../splash.html'),
      protocol: 'file:',
      slashes: true,
    })
  );
  // loadingScreen.on('closed', () => loadingScreen = null);
}


function runCpnServer() {
  const isWin = process.platform === "win32";
  const isMac = process.platform === "darwin";

  const scriptFilename = isWin ? 'run.bat' : 'run.sh';

  log.info('scriptFilename = ', scriptFilename);

  const runScriptPath = isDev ?
    path.join(process.cwd(), './electron/backend/' + scriptFilename) :
    path.join(process.cwd(), './resources/backend/' + scriptFilename);

  const jarPath = isDev ?
    path.join(process.cwd(), './electron/backend/cpn-ide-back-1.24-SNAPSHOT.jar') :
    path.join(process.cwd(), './resources/backend/cpn-ide-back-1.24-SNAPSHOT.jar');

  log.info('runScriptPath = ', runScriptPath);

  if (isWin) {
    shellRunner = spawn('cmd', ['/c', runScriptPath], { detached: true });
  } else if (isMac) {
    shellRunner = spawn('xterm', ['-e', runScriptPath], { detached: true });
  } else {
    shellRunner = spawn('gnome-terminal', ['--', runScriptPath], { detached: true });
  }

  shellRunner.on('error', (error) => {
    log.error('runCpnServer, error = ', error);
  });

  shellRunner.on('close', function (code) {
    // log.error('killCpnServer, close, code = ', code);;
    // shellRunner = undefined;
    log.info('cpn-ide-back SERVER Process has been killed!');
  });

  // shellRunner.kill();
}

function killCpnServer() {

  // var ps = require('ps-node');
  // ps.lookup(
  //   { command: 'java' },
  //   function (err, resultList) {
  //     if (err) {
  //       throw new Error(err);
  //     }
  //     resultList.forEach(function (process) {
  //       if (process) {

  //         console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);
  //       }
  //     });
  //   }
  // );

  return new Promise((resolve, reject) => {
    log.info('killCpnServer()');

    if (shellRunner) {
      log.info('killCpnServer(), findProcess(), shellRunner.pid = ', shellRunner.pid);
      log.info('killCpnServer(), findProcess(), shellRunner.ppid = ', shellRunner.ppid);

      // kill simulator processes
      findProcess('name', 'cpnmld.x86').then(
        (list) => {
          for (const p of list) {
            if (p.pid) {
              log.info('killCpnServer(), findProcess(\'cpnmld.x86\'), p = ', p.pid, p.name);
              process.kill(p.pid);
            }
          }
        });

      // kill cpn-ide-back server process
      findProcess('name', 'cpn-ide-back').then(
        (list) => {
          if (list && list.length) {
            for (const p of list) {
              if (p.pid) {
                log.info('killCpnServer(), findProcess(\'cpn-ide-back\'), p = ', p.pid, p.name);
                process.kill(p.pid);
              }
            }
            resolve('CPN Server process KILLED!');
          } else {
            reject('NO CPN Server process DETECTED (1)!');
          }
        },
        (error) => {
          reject('NO CPN Server process DETECTED (2)!');
        });
    } else {
      reject('NO CPN Server process DETECTED (3)!');
    }
  });
}

function newProject() {
  mainWindow.webContents.send('main.menu.new.project');
}
function openProject() {
  mainWindow.webContents.send('main.menu.open.project');
}
function saveProject() {
  mainWindow.webContents.send('main.menu.save.project');
}

