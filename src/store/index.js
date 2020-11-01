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
        type: "exe",
        style: "gameStyle",
        tagsList: ["gaming", "favorite"],
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
        type: "website",
        style: "codingStyle",
        tagsList: ["coding", "favorite"],
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
        name: "favorite",
        color: "rgb(226, 97, 151)"
      },
      {
        name: "gaming",
        color: "blue"
      }
    ],
    events: {
      contextMenu: {
        active: false,
        arg: null
      },
      popup: {
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
    showPopup(state, payload) {
      state.events.popup.active = true
      state.events.popup.arg = payload
    },
    closePopup(state) {
      state.events.popup.active = false
      state.events.popup.arg = null
    },
    contextMenu(state, payload) {
      state.events.contextMenu.active = true
      state.events.contextMenu.arg = payload
    },
    closeContextMenu(state) {
      state.events.contextMenu.active = false
      state.events.contextMenu.arg = null
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
    getTags: (state) => {
      return state.tags
    },
    getLinksByTag: (state) => (tagName) => {
      const elementsArray = state.gridElements;
      var retArray = [];
      elementsArray.forEach(element => {
        element.tagsList.forEach(tag => {
          if (tag === tagName) {
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

  if (data.imgLabel && data.imgBuffer) {
    element.content.img = data.imgLabel
    window.ipcRenderer.send("save-link-image-to-file", { buffer: data.imgBuffer, label: data.imgLabel, id: element.id })
  }
}