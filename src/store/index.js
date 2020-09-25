//import { reduce } from 'core-js/fn/array'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gridElements: [
      {
        id: 0,
        posX: 0,
        posY: 0,
        size: 1,
        type: "exe",
        style: "gameStyle",
        content: {
          label: "Steam",
          address: "C:/Program Files (x86)/Steam/steam.exe",
          img: "/assets/icons/Steam_icon_logo.png",
          tags: ["game", "favorite"]
        }
      },
      {
        id: 1,
        posX: 1,
        posY: 0,
        size: 1,
        type: "website",
        style: "codingStyle",
        content: {
          label: "Link Tailor GitHub",
          address: "https://github.com/Razorwind1/Custom-Links-Project",
          img: "/assets/icons/github_icon.jpg",
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
        id: state.gridElements.length + 1
      }
      element.content = {}

      modifyLink(element, payload)

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
    element.content.label = data.label
  }
}