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
  const isDev = () => process.env.NODE_ENV === 'development';
  const directory = isDev() ? process.cwd().concat('/app') : process.env.APP_PATH;

  win = new BrowserWindow({ width: 800, height: 600 });
  win.setMenuBarVisibility(false);

  // console.log('isDev() = ', isDev());
  // console.log('directory = ', directory);
  // console.log('process.cwd() = ', process.cwd());
  // console.log('__dirname = ', __dirname);

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
