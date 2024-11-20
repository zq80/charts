const remote=window.require('@electron/remote')
const Store = require('electron-store')

const excelPath = new Store()
var filePath = excelPath.get('excelPath')

const $=(id)=>{
    return document.getElementById(id)
}

document.addEventListener('DOMContentLoaded',()=>{
    let savedLocation=excelPath.get('excelPath')
    if(savedLocation){
        $('saved-file-location').value=savedLocation
    }
    $('select-new-location').addEventListener('click',()=>{
        remote.dialog.showOpenDialog({
            properties:['openFile'],
            title:"选择excel文件",
            filters: [
                {name: 'excel文件', extensions: ['xlsx']}
            ]
        }).then(result=>{
            // console.log(result.filePaths)
            if(Array.isArray(result.filePaths)){
                $('saved-file-location').value=result.filePaths[0]
                savedLocation=result.filePaths[0]
            }
        })
    })
    $('settings-form').addEventListener('submit',()=>{
        excelPath.set('excelPath',savedLocation)
        remote.getCurrentWindow().close()
    })
})
