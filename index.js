const {app, BrowserWindow, Menu, Tray} = require('electron');
const path = require('path');

let mainWindow;
let appTray;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Youtube Music',
    width: 1200,
    height: 800,
    icon: path.join(
      __dirname,
      `assets/favicon.${process.platform === 'darwin' ? 'icns' : 'ico'}`,
    ),
    frame: true,
  });

  mainWindow.loadURL('https://music.youtube.com');

  mainWindow.on('close', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function createTray() {
  if (appTray) {
    return;
  }

  const trayIconPath = path.join(
    __dirname,
    `assets/favicon.${process.platform === 'darwin' ? 'icns' : 'ico'}`,
  );

  const trayMenu = Menu.buildFromTemplate([
    {label: 'Open', click: () => mainWindow.show()},
    {
      label: 'Quit',
      click: () => {
        appTray.destroy();
        app.quit();
      },
    },
  ]);

  appTray = new Tray(trayIconPath);
  appTray.setToolTip('Youtube Music');
  appTray.setContextMenu(trayMenu);

  appTray.on('click', () => {
    mainWindow.show();
  });
}

app.on('ready', () => {
  Menu.setApplicationMenu(null);
  createWindow();
  createTray();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
