
//import modules
const { MSICreator } = require('electron-wix-msi');
const path = require('path');



//define input and output directory
const APP_DIR = path.resolve(__dirname, './dist_electron/win-unpacked');
const OUT_DIR = path.resolve(__dirname, './windows_installer');
const ICO_PATH = path.resolve(__dirname, './build/icon.ico');
const BANNER_IMG_PATH = path.resolve(__dirname, './public/assets/installer/LinkTailor_Installer_Banner.png');
const BACKGROUND_IMG_PATH = path.resolve(__dirname, './public/assets/installer/LinkTailor_Installer_Background.png');
const INSTALLER_ICO_PATH = path.resolve(__dirname, './public/assets/installer/LinkTailor_Dark_Icon_32.ico');

//instansiate the MSICreator
const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,
    description: 'The LinkTailor application is for users to save and arrange layouts of links, making it easier for them to access applications, files, and websites.',
    exe: 'LinkTailor',
    name: 'LinkTailor Desktop Application',
    shortName: 'LinkTailor',
    shortcutFolderName: 'LinkTailor',
    shortcutName: 'LinkTailor',
    programFilesFolderName: 'LinkTailor',
    appIconPath: ICO_PATH,
    manufacturer: 'UC 2021 Senior Design Team 6',
    version: '1.0.1',
    //configure installer UI
    ui: {
        chooseDirectory: true,
        template: '',
        images: {
            background: BACKGROUND_IMG_PATH,
            banner: BANNER_IMG_PATH,
            exclamationIcon: INSTALLER_ICO_PATH,
            infoIcon: INSTALLER_ICO_PATH
        }
    },
});

//create a .wxs tempate file & compile to a .msi file
async function CreateMsi() {
    await msiCreator.create();
    await msiCreator.compile();
}
CreateMsi();

//msiCreator.create().then(function(){msiCreator.compile()});

