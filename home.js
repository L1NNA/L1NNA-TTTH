const {
  app,
  BrowserWindow,
  globalShortcut
} = require('electron');
const path = require('path')
const localShortcut = require('electron-localshortcut')

let demo;

app.on('ready', () => {

  demo = new BrowserWindow({
    icon: __dirname + '/icons/l1nna.ico', frame: false, webPreferences: {
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  demo.setMenu(null);
  demo.loadURL(`file:///${__dirname}/home.html`);
  demo.on('close', () => { demo = null });

  app.on('browser-window-focus', () => {
    // do something
    globalShortcut.register('CommandOrControl+R', () => {
      demo.reload();
    })

    globalShortcut.register('CommandOrControl+E', () => {
      demo.toggleDevTools();
    })
    globalShortcut.register('Alt+Left', () => {
      demo.webContents.executeJavaScript('window.enav.back()');
    })
    globalShortcut.register('Alt+Right', () => {
      demo.webContents.executeJavaScript('window.enav.forward()');
    })
    globalShortcut.register('CommandOrControl+Tab', () => {
      demo.webContents.executeJavaScript('window.enav.nextTab()');
    })
    globalShortcut.register('CommandOrControl+F', () => {
      demo.webContents.executeJavaScript('window.toggle_search()');
    })
  })

  app.on('browser-window-blur', () => {
    globalShortcut.unregisterAll()
  });
});