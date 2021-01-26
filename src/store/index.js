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
        pos: {
          x: 0,
          y: 0,
          sizeX: 1,
          sizeY: 1
        },
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
        pos: {
          x: 0,
          y: 1,
          sizeX: 1,
          sizeY: 1
        },
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


      editingFields: {
        active: false
      },
      linkHovered: {
        active: false,
        arg: null
      },
    },
  },
  mutations: {
    // State Operations
    setState(state, payload) {
      state.links = payload.links || [],
        state.styles = payload.styles || [],
        state.tags = payload.tags || [],
        state.theme = payload.theme || "dark"
    },
    setTheme(state, payload) {
      state.theme = payload
      importCss(payload)
    },
    // Link Operations
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
    },
    setLinkPosition(state, payload) {
      const link = state.links.find(link => link.id === payload.id)
      if (link) {
        link.pos.x = payload.newX
        link.pos.y = payload.newY
      }
    },
    setLinkSize(state, payload) {
      const link = state.links.find(link => link.id === payload.id)
      if (link) {
        link.pos.sizeX = payload.newW
        link.pos.sizeY = payload.newH
      }
    },
    // Tag Operations
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

      state.gridElements.forEach(element => { element.tagsList = element.tagsList.filter(tag => tag !== payload.id) });
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
    // Events
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
    // Other
    allowEditingFields(state) {
      state.events.editingFields.active = true
    },
    closeEditingFields(state) {
      state.events.editingFields.active = false
    },
    linkHovered(state, payload) {
      state.events.linkHovered.active = true
      state.events.linkHovered.arg = payload
    },
    linkUnHovered(state) {
      state.events.linkHovered.active = false
      state.events.linkHovered.arg = null
    },
  },
  getters: {
    // Link Getters
    linkFromId: (state) => (id) => {
      return state.links.filter(element => element.id === id)[0]
    },
    linksFromTag: (state) => (tagID) => {
      return state.links.filter(link => link.tags.includes(tagID))
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
        styles: state.styles,
        tags: state.tags,
        theme: state.theme
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