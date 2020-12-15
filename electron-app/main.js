const { BrowserWindow, app, ipcMain, dialog } = require('electron');

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        maxHeight : 600,
        maxWidth: 800,
        backgroundColor: '#fff',
        title : 'Parent Window',
        //frame : false,
        webPreferences: {
            nodeIntegration : true,
            enableRemoteModule : true
        }
    });
    mainWindow.loadFile('index.html');
    mainWindow.webContents.openDevTools();
}



//async 
/* 
ipcMain.on('evt:greet', function(evt, data){
    console.log(data);
    evt.sender.send('evt:greetResponse', 'Hi there!');
}); 
*/

//sync
ipcMain.on('evt:greet', function(evt, data){
    console.log(data);
    evt.returnValue = 'Hi there! [sync]';
});

ipcMain.on('evt:error', function(evt, data){
    const { title, message } = data;
    dialog.showErrorBox(title, message);
});

ipcMain.on('evt:getFileName', function(evt, data){
    const fileNames = dialog.showOpenDialogSync();
    evt.sender.send('evt:getFileNameResponse', fileNames[0]);
})

app.on('ready', function(){
    createWindow();
    mainWindow.on('ready-to-show', function(){
        setInterval(function(){ 
            mainWindow.webContents.send('evt:time', new Date().toTimeString());
        }, 1000);
    });
})

app.on('window-all-closed', function(){
    if (process.platform === 'darwin' /*mac*/){
        app.quit();
    }
});

app.on('activate', function(){
    if (BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
});

