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
        color: 'rgb(226, 97, 151)',
        fontFamily: 'Verdana, Geneva, sans-serif',
        fontSize: '100%',
        tagColor: "rgb(226, 97, 151)"
      },
      {
        name: "codingStyle",
        color: 'rgb(102, 150, 222)',
        fontFamily: '"Brush Script MT", Helvetica, sans-serif',
        fontSize: '100%',
        tagColor: "" //no associated tag, so no need for a color
      }
    ],
    tags: [
      {
        name: "favorite",
        style: "gameStyle"
      },
      {
        name: "gaming",
        style: "gameStyle"
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
    getTagColor: (state) => (tagName) => {
      var tagStyleName = state.tags.filter(tag => tag.name === tagName)
      if (tagStyleName.length >= 0) {
        tagStyleName = tagStyleName[0].style
      }
      else {
        tagStyleName = "";
      }
      var tagStyleColor = state.styles.filter(style => style.name === tagStyleName)
      if (tagStyleColor.length >= 0) {
        tagStyleColor = tagStyleColor[0].tagColor
      }
      else {
        tagStyleColor = "";
      }
      return tagStyleColor;
    },
    getTags: (state) => {
      return state.tags
    },
  }
})
