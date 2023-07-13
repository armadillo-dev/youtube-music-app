const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');

let mainWindow;

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

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', () => {
  Menu.setApplicationMenu(null);
  createWindow();
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
