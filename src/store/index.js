//import { reduce } from 'core-js/fn/array'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gridElements: [
      {
        posX: 0,
        posY: 0,
        size: 1,
        type: "exe",
        style: "gameStyle",
        tags: ["game","favorite"],
        content: {
          label: "Steam",
          address: "C:/Program Files (x86)/Steam/steam.exe",
          img: "/assets/icons/Steam_icon_logo.png",
        }
        },
      {
        posX: 1,
        posY: 0,
        size: 1,
        type: "website",
        style: "codingStyle",
        tags: ["coding"],
        content: {
          label: "Link Tailor GitHub",
          address: "https://github.com/Razorwind1/Custom-Links-Project",
          img: "/assets/icons/github_icon.jpg",
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
    ]
  },

  mutations: {                                // FOR SYNC MUTATIONS
    addGridElement(state, payload) {
      const element = {}
      element.content = {}

      if (payload.address && payload.label) {
        element.content.address = payload.address.match(/^"*([^"]+)"*$/)[1]     // This regex is used to delete (") character from the start and the end of the given string.
        element.label = payload.label

        state.gridElements.push(element)
      }
    }
  },
  actions: {                                  // FOR ASYNC ACTIONS
  },
  getters: {
    getGridElements: (state) => {
      return state.gridElements
    },
    getGridLinks: (state) => {
      state.gridElements.filter(element => element.type === "link")
    },
    getStyle: (state) => (styleName) => {
      return state.styles.filter(style => style.name === styleName)
    },
    getTags: (state) => {
      return state.tags
    },
  }
})
