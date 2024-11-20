const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const menuTemplate=require('./menuTemplate')

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
    win.loadFile('index.html')
    return win
}

app.whenReady().then(() => {
    win=createWindow()
    const menu= Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)

    ipcMain.on('open-settings-window',()=>{
        const settingsWindow = new BrowserWindow({
            width: 500,
            height: 400,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
            parent:win,

        })
        settingsWindow.menuBarVisible=false
        // const settingsFileLocation=`file://${path.join(__dirname,'./settings/settings.html')}`
        // console.log(settingsFileLocation)
        settingsWindow.loadFile('./settings/settings.html')

        remote.enable(settingsWindow.webContents)

        settingsWindow.on('close',()=>{
            win.loadFile('index.html')
        })
    })
})
