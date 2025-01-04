const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const server = require('./server.cjs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    autoHideMenuBar: true,
    frame: true
  });

  // Always load from localhost:5173
  win.loadURL('http://localhost:5173');

  if (isDev) {
    win.webContents.openDevTools();
    win.setMenuBarVisibility(true);
  } else {
    win.setMenuBarVisibility(false);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  server.close(); // Close the server when the app closes
  if (process.platform !== 'darwin') {
    app.quit();
  }
}); 