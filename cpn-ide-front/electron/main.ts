import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
// import { CpnServerUrl } from '../src/cpn-server-url';

let win: BrowserWindow;

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function initCpnServerUrl() {
  // CpnServerUrl.set('http://95.161.178.222:42020');
}

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 })

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/cpn-ide/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );

  // win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}
