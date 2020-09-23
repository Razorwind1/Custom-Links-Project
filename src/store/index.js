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
        content: {
          label: "Steam",
          address: "C:/Program Files (x86)/Steam/steam.exe",
          img: "/assets/icons/Steam_icon_logo.png",
          tags: ["game","favorite"]
        }
      },
      {
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
        color: 'red',
        fontFamily: 'Verdana, Geneva, sans-serif',
        fontSize: '100%'
      },
      {
        name: "codingStyle",
        color: 'green',
        fontFamily: '"Brush Script MT", Helvetica, sans-serif',
        fontSize: '130%'
      }
    ]
  },

  mutations: {                                // FOR SYNC MUTATIONS
    addGridElement(state, element) {
      state.gridElements.push(element)
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
    }
  }
})
