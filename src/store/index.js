//import { reduce } from 'core-js/fn/array'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
        content: {
          label: "Steam",
          address: "C:/Program Files (x86)/Steam/steam.exe",
          img: "Steam_icon_logo.png",
          tags: ["game", "favorite"]
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
        content: {
          label: "Link Tailor",
          address: "https://github.com/Razorwind1/Custom-Links-Project",
          img: "github_icon.jpg",
          tags: ["coding"],
        }
      },
    ],
    styles: [
      {
        name: "gameStyle",
        color: 'rgb(226, 97, 151)',
        fontFamily: 'Verdana, Geneva, sans-serif',
        fontSize: '100%'
      },
      {
        name: "codingStyle",
        color: 'rgb(102, 150, 222)',
        fontFamily: '"Brush Script MT", Helvetica, sans-serif',
        fontSize: '100%'
      }
    ]
  },

  mutations: {                                // FOR SYNC MUTATIONS
    addGridElement(state, payload) {
      const element = {
        id: state.gridElements.length + 1     // NEED BETTER ID MECHANISM
      }
      element.content = {}

      modifyLink(element, payload.data)

      state.gridElements.push(element)
    },
    editGridElement(state, payload) {
      const element = state.gridElements.find(element => element.id === payload.id)

      modifyLink(element, payload.data)
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
    }
  }
})

function modifyLink(element, data) {

  if (data.address && data.label) {
    element.content.address = data.address.match(/^"*([^"]+)"*$/)[1]     // This regex is used to delete (") character from the start and the end of the given string.

    // if (window.platform === "win32" && !element.content.address.includes('\\'))
    //   element.content.address = 'http://' + element.content.address      // For win platform, if the value has no '\' it will be marked as a website and http:// will be included in front of it.

    element.content.label = data.label
  }

  if (data.imgLabel && data.imgBuffer) { 
    element.content.img = data.imgLabel
    window.ipcRenderer.send("save-link-image-to-file", {buffer: data.imgBuffer, label: data.imgLabel, id: element.id})
  }
}