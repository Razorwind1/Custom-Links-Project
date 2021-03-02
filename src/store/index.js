import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uniqueId } from 'uuid';
import importCss from "@/js/helper/importCss.js";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // State Data
    links: [
      {
        id: 0,
        type: "file",
        style: "gameStyle",
        tags: [1, 2],
        content: {
          label: "Steam",
          address: "C:/Program Files (x86)/Steam/steam.exe",
          img: "Steam_icon_logo.png",
        }
      },
      {
        id: 1,
        type: "url",
        style: "codingStyle",
        tags: [3],
        content: {
          label: "TailorLink GitHub",
          address: "https://github.com/Razorwind1/Custom-Links-Project",
          img: "github_icon.jpg",
        }
      },
    ],
    layouts: [
      {
        id: "0001",
        active: false,
        favourite: true,
        name: "Home",
        color: "#502010",
        theme: "default",
        items: [
          {
            id: 0,
            pos: {
              x: 0,
              y: 0,
              sizeX: 1,
              sizeY: 1
            },
          },
          {
            id: 1,
            pos: {
              x: 0,
              y: 1,
              sizeX: 1,
              sizeY: 1
            },
          }
        ]
      },
      {
        id: "0002",
        active: false,
        favourite: true,
        name: "Gaming",
        color: "#102010",
        theme: "default",
        items: [
          {
            id: 0,
            pos: {
              x: 0,
              y: 0,
              sizeX: 1,
              sizeY: 1
            },
          },
        ]
      },
      {
        id: "0003",
        active: true,
        favourite: true,
        name: "Coding",
        color: "#902010",
        theme: "default",
        items: [
          {
            id: 1,
            pos: {
              x: 0,
              y: 0,
              sizeX: 1,
              sizeY: 1
            },
          },
        ]
      }
    ],
    styles: [
      {
        name: "gameStyle",
        color: 'rgb(226, 97, 151)',
        fontFamily: 'Verdana, Geneva, sans-serif',
        fontSize: '100%',
      },
      {
        name: "codingStyle",
        color: 'rgb(102, 150, 222)',
        fontFamily: '"Brush Script MT", Helvetica, sans-serif',
        fontSize: '100%',
      }
    ],
    tags: [
      {
        id: 1,
        name: "favorite",
        color: "#A716D6E0"
      },
      {
        id: 2,
        name: "gaming",
        color: "#A716D6E0"
      },
      {
        id: 3,
        name: "New Tag",
        color: "#333"
      }
    ],
    theme: "dark",
    // Global Events
    events: {
      contextMenu: {
        active: false,
        arg: null
      },
      alert: {
        active: false,
        arg: null
      },
      popup: {
        active: false,
        arg: null
      },
      colorPicker: {
        active: false,
        arg: null
      },
      assignedTagsMenu: {
        active: false,
        arg: null
      },
      assignedLayoutsMenu: {
        active: false,
        arg: null
      },
      sidebar: {
        active: false,
        arg: null
      }
    },
  },
  mutations: {
    // ------- State Operations ------- 
    setState(state, payload) {
      state.links = payload.links || []
      state.layouts = payload.layouts || []
      state.styles = payload.styles || []
      state.tags = payload.tags || []
      state.theme = payload.theme || "dark"
    },
    setTheme(state, payload) {
      state.theme = payload
      importCss(payload)
    },


    // ------- Link Operations ------- 
    addLink(state, payload) {
      const link = {
        id: uniqueId()
      }
      link.content = {}
      link.pos = {
        x: 0,
        y: 0,
        sizeX: 1,
        sizeY: 1
      }
      link.tags = []

      modifyLink(link, payload.data)

      state.links.push(link)
    },
    editLink(state, payload) {
      const link = state.links.find(link => link.id === payload.id)

      modifyLink(link, payload.data)
    },
    deleteLink(state, payload) {
      const removeIndex = state.links.findIndex(link => link.id === payload.id)
      state.links.splice(removeIndex, 1)

      state.layouts.forEach(layout => {
        const removeIndex = layout.items.findIndex(link => link.id === payload.id)
        if (removeIndex !== -1) layout.items.splice(removeIndex, 1)
      })
    },
    setLinkPosition(state, payload) {
      const link = state.layouts.find(layout => layout.active === true).items.find(link => link.id === payload.id)
      if (link) {
        link.pos.x = payload.newX
        link.pos.y = payload.newY
      }
    },
    setLinkSize(state, payload) {
      const link = state.layouts.find(layout => layout.active === true).items.find(link => link.id === payload.id)
      if (link) {
        link.pos.sizeX = payload.newW
        link.pos.sizeY = payload.newH
      }
    },


    // ------- Tag Operations ------- 
    addTag(state) {
      state.tags.push({
        id: uniqueId(),
        name: "New Tag",
        color: "#333"
      })
    },
    editTag(state, payload) {
      const tag = state.tags.find(tag => tag.id == payload.tagID)

      tag.color = payload.newColor || tag.color
      tag.name = payload.newName || tag.name
    },
    deleteTag(state, payload) {
      const removeIndex = state.tags.findIndex(tag => tag.id === payload.id)
      state.tags.splice(removeIndex, 1)

      state.links.forEach(link => { link.tags = link.tags.filter(tag => tag !== payload.id) });
    },
    assignTag(state, payload) {
      const index = state.links.find(gridEl => gridEl.id == payload.linkID).tags.indexOf(payload.tagID);
      if (index < 0) {
        state.links.find(gridEl => gridEl.id == payload.linkID).tags.push(payload.tagID);
      }
    },
    unassignTag(state, payload) {
      const index = state.links.find(gridEl => gridEl.id == payload.linkID).tags.indexOf(payload.tagID);
      if (index > -1) {
        state.links.find(gridEl => gridEl.id == payload.linkID).tags.splice(index, 1);
      }
    },


    // ------- Layout Operations ------- 
    addLayout(state, layoutName, layoutColor) {
      state.layouts.push({
        id: uniqueId(),
        name: layoutName,
        color: layoutColor
      })
    },
    editLayout(state, payload) {
      const layout = state.layouts.find(layout => layout.id == payload.id)

      layout.color = payload.color || layout.color
      layout.name = payload.name || layout.name
    },
    deleteLayout(state, id) {
      const removeIndex = state.layouts.findIndex(layout => layout.id === id)
      state.layouts.splice(removeIndex, 1)
    },
    assignLayout(state, payload) {
      const layout = state.layouts.find(layout => layout.id == payload.layoutId);
      if (!layout.items.includes(item => item.id === payload.linkId)) {
        layout.items.push({
          id: payload.linkId,
          pos: {
            x: 0,
            y: 0,
            sizeX: 1,
            sizeY: 1
          },
        })
      }
    },
    unassignLayout(state, payload) {
      const layout = state.layouts.find(layout => layout.id == payload.layoutId)
      const index = layout.items.findIndex(item => item.id === payload.linkId)
      if (index !== -1) {
        layout.items.splice(index, 1)
      }
    },
    activateLayout(state, id) {
      state.layouts.forEach(layout => layout.active = false)
      const layout = state.layouts.find(layout => layout.id === id)

      if (layout)
        layout.active = true
    },
    toggleFavouriteLayout(state, id) {
      const layout = state.layouts.find(layout => layout.id == id)

      layout.favourite = !layout.favourite
    },


    // ------- Events ------- 

    // Popup
    showPopup(state, payload) {
      state.events.popup.active = true
      state.events.popup.arg = payload
    },
    closePopup(state) {
      state.events.popup.active = false
      state.events.popup.arg = null
    },

    // Alert
    showAlert(state, payload) {
      state.events.alert.active = true
      state.events.alert.arg = payload
    },
    closeAlert(state) {
      state.events.alert.active = false
      state.events.alert.arg = null
    },

    // Assigned Tags Menu
    showAssignedTagsMenu(state, payload) {
      state.events.assignedTagsMenu.active = true
      state.events.assignedTagsMenu.arg = payload
      state.events.assignedTagsMenu.event = payload.event
    },
    closeAssignedTagsMenu(state) {
      state.events.assignedTagsMenu.active = false
      state.events.assignedTagsMenu.id = null
      state.events.assignedTagsMenu.event = null
    },

    // Layouts Menu
    closeLayoutsMenu(state) {
      if (state.events.popup.arg?.type === "layout-list") {
        state.events.popup.active = false
        state.events.popup.arg = null
      }
    },

    // Assigned Layouts Menu
    showAssignedLayoutsMenu(state, payload) {
      state.events.assignedLayoutsMenu.active = true
      state.events.assignedLayoutsMenu.arg = payload
      state.events.assignedLayoutsMenu.event = payload.event
    },
    closeAssignedLayoutsMenu(state) {
      state.events.assignedLayoutsMenu.active = false
      state.events.assignedLayoutsMenu.id = null
      state.events.assignedLayoutsMenu.event = null
    },

    // Context Menu
    showContextMenu(state, payload) {
      state.events.contextMenu.active = true
      state.events.contextMenu.arg = payload.content
      state.events.contextMenu.event = payload.event
    },
    closeContextMenu(state) {
      state.events.contextMenu.active = false
      state.events.contextMenu.arg = null
      state.events.contextMenu.event = null
    },

    // Color Picker
    showColorPicker(state, payload) {
      state.events.colorPicker.active = true
      state.events.colorPicker.arg = payload.arg
      state.events.colorPicker.event = payload.event
    },
    closeColorPicker(state) {
      state.events.colorPicker.active = false
      state.events.colorPicker.arg = null
      state.events.colorPicker.event = null
    },

    // Sidebar
    toggleSidebar(state, payload) {
      if (state.events.sidebar.active || (payload && payload.resizing))
        state.events.sidebar.active = false
      else
        state.events.sidebar.active = true
    }
  },
  getters: {
    // Link Getters
    linkFromId: (state) => (id) => {
      return state.links.filter(element => element.id === id)[0]
    },
    linksFromTag: (state) => (tagID) => {
      return state.links.filter(link => link.tags.includes(tagID))
    },
    // Layout Getters
    layoutFromId: (state) => (id) => {
      return state.layouts.filter(layout => layout.id === id)[0]
    },
    layoutsFromLinkId: (state) => (id) => {
      return state.layouts.filter(layout => layout.items.find(item => item.id === id) !== undefined)
    },
    // Style Getters
    styleFromName: (state) => (styleName) => {
      return state.styles.filter(style => style.name === styleName)
    },
    // Tag Getters
    tagsFromLinkId: (state) => (id) => {
      return state.links.find(gridEl => gridEl.id === id).tags;
    },
    tagNameFromId: (state) => (id) => {
      return state.tags.find(tag => tag.id === id).name;
    },
    tagColorFromId: (state) => (id) => {
      if (state.tags.find(tag => tag.id === id) === undefined) {
        return id;
      } else {
        return state.tags.find(tag => tag.id === id).color;
      }
    },
    // State Data
    stateUserData: (state) => {
      return {
        links: state.links,
        layouts: state.layouts,
        styles: state.styles,
        tags: state.tags,
        theme: state.theme,
      }
    }
  }
})

export default store

function modifyLink(element, data) {
  if (data.address && data.label) {
    element.content.address = data.address.match(/^"*([^"]+)"*$/)[1]     // This regex is used to delete (") character from the start and the end of the given string.
    element.content.label = data.label
  }
  element.type = data.type || "url";
  if (data.imgLabel && data.imgBuffer) {
    element.content.img = data.imgLabel
    window.ipcRenderer.send("save-link-image-to-file", { buffer: data.imgBuffer, label: data.imgLabel, id: element.id })
  }
}