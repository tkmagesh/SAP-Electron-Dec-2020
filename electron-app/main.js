const { BrowserWindow, app, ipcMain, dialog, Menu, MenuItem, Tray } = require('electron');

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

//using promises
ipcMain.handle('evt:greet', async function(evt, data){
    console.log(data);
    return 'Hi there! [promise]';
});

ipcMain.on('evt:error', function(evt, data){
    const { title, message } = data;
    dialog.showErrorBox(title, message);
});

ipcMain.on('evt:getFileName', function(evt, data){
    const fileNames = dialog.showOpenDialogSync();
    evt.sender.send('evt:getFileNameResponse', fileNames[0]);
})
let timerId;

let tray;

app.on('ready', function(){

    createWindow();

    //create a system tray icon with menu
    tray = new Tray('images/ethernet.png');
    const ctxMenu = new Menu();
    ctxMenu.append(new MenuItem({
        label : 'Hello',
        click : function(){
            console.log('Context menu activated');
        }
    }))
    ctxMenu.append(new MenuItem({ role : 'selectall'}))
    tray.setContextMenu(ctxMenu);

    /* ************ */    
    mainWindow.on('ready-to-show', function(){
        timerId = setInterval(function(){ 
            mainWindow.webContents.send('evt:time', new Date().toTimeString());
        }, 1000);
    });

    mainWindow.on('close', () => {
        if (timerId) clearInterval(timerId);
    });

    //Menu
    const template = [
        {
            label : 'Demo',
            submenu : [
                {
                    label : 'Greet',
                    submenu : [
                        {
                            label : 'Personal',
                            click: function () {
                                console.log('Hi there!')
                            }
                        },
                        {
                            label : 'Official'
                        }
                    ]
                },
                {
                    type : 'separator'
                },
                {
                    label : 'Busy',
                    type : 'radio',
                    checked : true
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

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

//displaying context menu
app.on('browser-window-created', (evt, win) => {
    const ctxMenu = new Menu();
    ctxMenu.append(new MenuItem({
        label : 'Hello',
        click : function(){
            console.log('Context menu activated');
        }
    }))
    ctxMenu.append(new MenuItem({ role : 'selectall'}))
    win.webContents.on('context-menu', (evt, params) => {
        ctxMenu.popup(win, params.x, params.y);
    });
})

