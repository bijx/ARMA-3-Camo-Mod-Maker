const { app, BrowserWindow, Menu } = require('electron');
const { ipcMain } = require('electron');
const main = require('./buildMod');
const path = require('path');
const fetch = require('node-fetch');

let win; // Keep a reference to the main window

ipcMain.on('create-mod', async (event, args) => {
  try {
    await main(args.className, args.author, args.options, (progress) => {
      win.webContents.send('update-progress', progress);
    });
    event.reply('create-mod-reply', 'success');
  } catch (error) {
    event.reply('create-mod-reply', `error: ${error.message}`);
  }
});

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 500,
    height: 750,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'logo.png')
  })
  // win.setMenuBarVisibility(false);
  win.setResizable(false);
  const menu = Menu.buildFromTemplate([
    {
      label: 'Help',
      submenu: [
        {
          label: 'Check for Updates',
          click: checkForUpdates    
        },
        {
          label: 'Tutorial',
          click: () => {
            require('electron').shell.openExternal('https://github.com/bijx/ARMA-3-Camo-Mod-Maker?tab=readme-ov-file#usage')
          }
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
  
  // Uncomment to open dev tools
  // win.webContents.openDevTools()


  // Load the index.html of the app.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)


// TODO: Remove these since we don't support macOS.
// Support can be re-added later if image processing is changed from Pal2PacE to Gruppe Adler's image processing library.

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'Darwin') app.quit()
})

app.on('activate', () => {
  // On macOS, re-create a window in the app when
  // the dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})


async function checkForUpdates() {
  const remotePackageUrl = 'https://raw.githubusercontent.com/bijx/ARMA-3-Camo-Mod-Maker/master/package.json';
  
  try {
    const response = await fetch(remotePackageUrl);
    const remotePackage = await response.json();
    const localVersion = require('./package.json').version;

    if (remotePackage.version !== localVersion) {
      // Version mismatch, open GitHub releases page
      require('electron').shell.openExternal('https://github.com/bijx/ARMA-3-Camo-Mod-Maker/releases');
      win.webContents.send('update-check-reply', `There is a new update available!\nLocal version: ${localVersion}\nLatest version: ${remotePackage.version}`);
    } else {
      // Versions match, no update required
      win.webContents.send('update-check-reply', 'You are using the latest version.');
    }
  } catch (error) {
    win.webContents.send('update-check-reply', `Error checking for updates: ${error.message}`);
  }
}
