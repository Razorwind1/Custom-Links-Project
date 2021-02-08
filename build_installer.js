
//import modules
const { MSICreator } = require('electron-wix-msi');
const path = require('path');



//define input and output directory
const APP_DIR = path.resolve(__dirname, './dist_electron/win-unpacked');
const OUT_DIR = path.resolve(__dirname, './windows_installer');

//instansiate the MSICreator
const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,
    description: 'The TailorLink application is for users to save and arrange layouts of links, making it easier for them to access applications, files, and websites.',
    exe: 'TailorLink',
    name: 'TailorLink desktop application',
    manufacturer: 'UC 2021 Senior Design Team 6',
    version: '1.0.0',
    //configure installer UI
    ui: {
        chooseDirectory: true
    },
});

//create a .wxs tempate file & compile to a .msi file
msiCreator.create().then(function(){msiCreator.compile()}
);

