import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uniqueId } from 'uuid';
import importCss from "@/js/importCss.js";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    gridElements: [
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
        tagsList: [1, 2],
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
        tagsList: [3],
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
      editingFields: {
        active: false
      }
    },
  },
  mutations: {                                // FOR SYNC MUTATIONS
    setState(state, payload) {
      state.gridElements = payload.gridElements || [],
      state.styles = payload.styles || [],
      state.tags = payload.tags || [],
      state.theme = payload.theme || "dark"
    },
    setAppTheme(state, payload){
      state.theme = payload
      importCss(payload)
    },

    addGridElement(state, payload) {
      const element = {
        id: uniqueId()
      }
      element.content = {}
      element.pos = {
        x: 0,
        y: 0,
        sizeX: 1,
        sizeY: 1
      }
      element.tagsList = []

      modifyLink(element, payload.data)

      state.gridElements.push(element)
    },
    editGridElement(state, payload) {
      const element = state.gridElements.find(element => element.id === payload.id)

      modifyLink(element, payload.data)
    },
    deleteGridElement(state, payload) {
      const removeIndex = state.gridElements.findIndex(element => element.id === payload.id)
      state.gridElements.splice(removeIndex, 1)
    },
    
    setGridElementPosition(state, payload) {
      const element = state.gridElements.find(element => element.id === payload.id)
      if (element) {
        element.pos.x = payload.newX
        element.pos.y = payload.newY
      }
    },
    resizeGridElement(state, payload) {
      const element = state.gridElements.find(element => element.id === payload.id)
      if (element) {
        element.pos.sizeX = payload.newW
        element.pos.sizeY = payload.newH
      }
    },

    editTagColor(state, payload) {
      state.tags.find(tag => tag.id == payload.tagID).color = payload.newColor;
    },
    editTagName(state, payload) {
      state.tags.find(tag => tag.id == payload.tagID).name = payload.newName;
    },

    showPopup(state, payload) {
      state.events.popup.active = true
      state.events.popup.arg = payload
    },
    closePopup(state) {
      state.events.popup.active = false
      state.events.popup.arg = null
    },

    showAlert(state, payload) {
      state.events.alert.active = true
      state.events.alert.arg = payload
    },
    closeAlert(state) {
      state.events.alert.active = false
      state.events.alert.arg = null
    },

    contextMenu(state, payload) {
      state.events.contextMenu.active = true
      state.events.contextMenu.arg = payload.content
      state.events.contextMenu.event = payload.event
    },
    closeContextMenu(state) {
      state.events.contextMenu.active = false
      state.events.contextMenu.arg = null
      state.events.contextMenu.event = null
    },

    colorPicker(state, payload) {
      state.events.colorPicker.active = true
      state.events.colorPicker.arg = payload.arg
      state.events.colorPicker.event = payload.event
    },
    closeColorPicker(state) {
      state.events.colorPicker.active = false
      state.events.colorPicker.arg = null
      state.events.colorPicker.event = null
    },
    allowEditingFields(state) {
      state.events.editingFields.active = true
    },
    closeEditingFields(state) {
      state.events.editingFields.active = false
    },
    addNewTag(state) {
      state.tags.push({
        id: uniqueId(),
        name: "New Tag",
        color: "#333"
      })
    },
    deleteTag(state, payload){
      const removeIndex = state.tags.findIndex(tag => tag.id === payload.id)
      state.tags.splice(removeIndex, 1)
    }
  },
  actions: {                                  // FOR ASYNC ACTIONS
  },
  getters: {
    getGridElements: (state) => {
      return state.gridElements
    },
    getGridLinks: (state) => {
      return state.gridElements.filter(element => element.type === "link")
    },
    getGridLink: (state) => (id) => {
      return state.gridElements.filter(element => element.id === id)[0]
    },
    getStyle: (state) => (styleName) => {
      return state.styles.filter(style => style.name === styleName)
    },
    getTagsofLink: (state) => (id) => {
      return state.gridElements.find(gridEl => gridEl.id === id).tagsList;
    },
    getTags: (state) => {
      return state.tags
    },
    getTagName: (state) => (id) => {
      return state.tags.find(tag => tag.id === id).name;
    },
    getTagColor: (state) => (id) => {
      if (state.tags.find(tag => tag.id === id) === undefined) {
        return id;
      } else {
        return state.tags.find(tag => tag.id === id).color;
      }

    },
    getLinksByTag: (state) => (tagID) => {
      const elementsArray = state.gridElements;
      var retArray = [];
      elementsArray.forEach(element => {
        element.tagsList.forEach(tag => {
          if (tag === tagID) {
            retArray.push(element);
          }
        });
      });
      return retArray;
    },
    stateUserData: (state) => {
      return {
        gridElements: state.gridElements,
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