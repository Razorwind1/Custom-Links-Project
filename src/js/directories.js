import path from 'path'
import { app } from 'electron'

const 
APP = path.dirname(app.getPath('exe')),
// --------------------------- \\
    USER_DATA = path.join(APP, 'user_data'),
    // --------------------------- \\
        LINK_ICONS = path.join(USER_DATA, 'link_icons'),
        // --------------------------- \\

    RESOURCES = path.join(APP, 'resources'),
    // --------------------------- \\
        DEFAULT_ICON = path.join(RESOURCES, 'default_icon.png')

export default {
    APP,
    USER_DATA,
    LINK_ICONS,
    DEFAULT_ICON
}