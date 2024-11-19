const { app, BrowserWindow } = require('electron')

const remote=require('@electron/remote/main')
const path = require("path");
remote.initialize()

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1800,
        height: 800,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        },
    })
    remote.enable(win.webContents)
    win.loadFile('index.html')


}

app.whenReady().then(() => {
    createWindow()
})
