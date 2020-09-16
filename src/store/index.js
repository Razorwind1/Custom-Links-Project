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
        type: "link",
        color: "",
        label: "Steam",
        content: {
          address: "C:/Program Files (x86)/Steam/steam.exe",
          img: "/assets/icons/Skyrim2.png",
          tags: ["gaming"]
        },
        style: []
      },
      {
        posX: 1,
        posY: 0,
        size: 1,
        type: "link",
        color: "",
        label: "Link Tailor GitHub",
        content: {
          address: "https://github.com/Razorwind1/Custom-Links-Project",
          img: "",
          tags: ["dev", "link-tailor"]
        }
      },
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
    }
  }
})
