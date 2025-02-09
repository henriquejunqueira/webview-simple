const { app, BrowserWindow, globalShortcut } = require('electron');
const config = require('./config.js');

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800, // sets the window width
    height: 600, // sets the height of the window
    // titleBarStyle: 'hidden', // hides the window title bar
    alwaysOnTop: true, // keeps the window always overlapping the others
    webPreferences: {
      nodeIntegration: true, // defines integration with node
    },
  });

  // and load the index.html of the app.
  //   win.loadFile('./index.html');
  //   win.loadURL('http://localhost:3000');
  //   win.loadURL(
  //     'https://www.electronjs.org/pt/docs/latest/tutorial/tutorial-first-app'
  //   );
  win.loadURL(config.url);

  // Open the DevTools.
  //   win.webContents.openDevTools();
}

function toogleDevTools() {
  win.webContents.openDevTools();
}

// Registers a global keyboard shortcut
function createShortcuts() {
  globalShortcut.register('CmdOrCtrl+J', toogleDevTools);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow).then(createShortcuts);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
