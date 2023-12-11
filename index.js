const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const main = require('./buildMod');

let win; // Keep a reference to the main window

ipcMain.on('create-mod', async (event, args) => {
  try {
    await main(args.className, args.author, args.options, (progressValue) => {
      win.webContents.send('update-progress', progressValue);
    });
    event.reply('create-mod-reply', 'success');
  } catch (error) {
    event.reply('create-mod-reply', `error: ${error.message}`);
  }
});

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.setMenuBarVisibility(false);
  win.setResizable(false);
  win.webContents.openDevTools()


  // Load the index.html of the app.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'Darwin') app.quit()
})

app.on('activate', () => {
  // On macOS, re-create a window in the app when
  // the dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

