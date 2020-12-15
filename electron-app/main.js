const { BrowserWindow, app, ipcMain } = require('electron');

function createWindow(){
    const mainWindow = new BrowserWindow({
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

ipcMain.on('evt:greet', function(evt, data){
    console.log(data);
    evt.sender.send('evt:greetResponse', 'Hi there!');
});

app.on('ready', function(){
    createWindow();
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

