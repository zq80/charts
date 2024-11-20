const {app, BrowserWindow} = require('electron')

const remote = require('@electron/remote/main')
const path = require("path");
remote.initialize()

const Store = require('electron-store')
Store.initRenderer()

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1800,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })
    // console.log('require.config888888888888888888888888888888888888', require)
    remote.enable(win.webContents)
    win.loadFile('index3.html')

}

app.whenReady().then(() => {
    createWindow()
})
