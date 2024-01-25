const { app, BrowserWindow,Menu} = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true, // Recommended for security
      preload: path.join(__dirname, 'preload.js'), // Use a preload script
    },
  title: "TiresOnHighways",
  });

  // Load the index.html file
  mainWindow.setTitle("TiresOnHighways");
  mainWindow.loadURL('https://tiresonhighways.vercel.app');
  const menu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(menu);
}
app.whenReady().then(createWindow);

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