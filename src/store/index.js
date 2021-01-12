import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uniqueId } from 'uuid';

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
      },
      linkHovered: {
        active: false,
        arg: null
      },
      assignedTagsMenu: {
        active: false,
        arg: null
      }
    }
  },
  mutations: {                                // FOR SYNC MUTATIONS
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
    setState(state, payload) {
      state.gridElements = payload.gridElements || [],
        state.styles = payload.styles || [],
        state.tags = payload.tags || []
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
    linkHovered(state, payload) {
      state.events.linkHovered.active = true
      state.events.linkHovered.arg = payload
    },
    linkUnHovered(state) {
      state.events.linkHovered.active = false
      state.events.linkHovered.arg = null
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
    assignedTagsMenu(state, payload) {
      state.events.assignedTagsMenu.active = true
      state.events.assignedTagsMenu.arg = payload
      state.events.assignedTagsMenu.event = payload.event
    },
    closeAssignedTagsMenu(state) {
      state.events.assignedTagsMenu.active = false
      state.events.assignedTagsMenu.id = null
      state.events.assignedTagsMenu.event = null
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
      return state.tags.find(tag => tag.id == id).name;
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
        tags: state.tags
      }
    }
  }
})

export default store

function modifyLink(element, data) {

  if (data.address && data.label) {
    element.content.address = data.address.match(/^"*([^"]+)"*$/)[1]     // This regex is used to delete (") character from the start and the end of the given string.

    // if (window.platform === "win32" && !element.content.address.includes('\\'))
    //   element.content.address = 'http://' + element.content.address      // For win platform, if the value has no '\' it will be marked as a website and http:// will be included in front of it.

    element.content.label = data.label
  }

  element.type = data.type || "url";

  if (data.imgLabel && data.imgBuffer) {
    element.content.img = data.imgLabel
    window.ipcRenderer.send("save-link-image-to-file", { buffer: data.imgBuffer, label: data.imgLabel, id: element.id })
  }
}