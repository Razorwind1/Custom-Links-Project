import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uniqueId } from 'uuid';
import importCss from "@/js/helper/importCss.js";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // State Data
    links: [
      // {
      //   id: "example-id",
      //   type: "file",
      //   style: "exampleStyle",                     Not implemented yet
      //   tags: [tagId, tagId2],
      //   content: {
      //     label: "Link Label",
      //     address: "ExampleAddress.com",
      //     img: "exampleImage.png",
      //     customImg: false
      //   }
      // },
    ],
    layouts: [
      {
        id: "123c740e-87a1-40fd-81a3-4c98271f4790",
        active: true,
        favourite: true,
        name: "Home",
        color: "#000000",
        theme: "default",
        size: 100,
        items: [
        ]
      },
      // {
      //   id: "example-id",
      //   active: false,
      //   favourite: true,
      //   name: "Layout Name",
      //   color: "#000000",
      //   theme: "default",                          Not implemented yet
      //   size: 100,
      //   items: [
      //     {
      //       id: itemId,
      //       pos: {
      //         x: 0,
      //         y: 0,
      //         sizeX: 1,
      //         sizeY: 1
      //       },
      //     },
      //   ]
      // },
    ],
    styles: [
      // {
      //   name: "Style Name",
      //   color: 'rgb(0, 0, 0)',
      //   fontFamily: 'Verdana, Geneva, sans-serif',
      //   fontSize: '100%',
      // }
    ],
    tags: [
      // {
      //   id: tagId,
      //   name: "Tag Name",
      //   color: "#000000"
      // },
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
      assignedLayoutsMenu: {
        active: false,
        arg: null
      },
      sidebar: {
        active: false,
        arg: null
      },
      search: {
        term: ""
      }
    },
  },
  mutations: {
    // ------- State Operations ------- 
    setState(state, payload) {
      state.links = payload.links || []
      state.layouts = payload.layouts || []
      state.styles = payload.styles || []
      state.tags = payload.tags || []
      state.theme = payload.theme || "dark"
    },
    setTheme(state, payload) {
      state.theme = payload
      importCss(payload)
    },


    // ------- Link Operations ------- 
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

      state.layouts.find(layout => layout.active)?.items.push({
        id: link.id,
        pos: {
          x: 0,
          y: 0,
          sizeX: 1,
          sizeY: 1
        },
      })
      state.links.push(link)
    },
    editLink(state, payload) {
      const link = state.links.find(link => link.id === payload.id)

      modifyLink(link, payload.data)
    },
    deleteLink(state, payload) {
      const removeIndex = state.links.findIndex(link => link.id === payload.id)
      state.links.splice(removeIndex, 1)

      state.layouts.forEach(layout => {
        const removeIndex = layout.items.findIndex(link => link.id === payload.id)
        if (removeIndex !== -1) layout.items.splice(removeIndex, 1)
      })
    },
    setLinkPosition(state, payload) {
      const link = state.layouts.find(layout => layout.active === true).items.find(link => link.id === payload.id)
      if (link) {
        link.pos.x = payload.newX
        link.pos.y = payload.newY
      }
    },
    setLinkSize(state, payload) {
      const link = state.layouts.find(layout => layout.active === true).items.find(link => link.id === payload.id)
      if (link) {
        link.pos.sizeX = payload.newW
        link.pos.sizeY = payload.newH
      }
    },


    // ------- Tag Operations ------- 
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

      state.links.forEach(link => { link.tags = link.tags.filter(tag => tag !== payload.id) });
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


    // ------- Layout Operations ------- 
    editLayout(state, payload) {
      const layout = state.layouts.find(layout => layout.id == payload.id)

      layout.color = payload.color || layout.color
      layout.name = payload.name || layout.name
      layout.size = payload.size || layout.size
    },
    deleteLayout(state, id) {
      const removeIndex = state.layouts.findIndex(layout => layout.id === id)
      state.layouts.splice(removeIndex, 1)
    },
    assignLayout(state, payload) {
      const layout = state.layouts.find(layout => layout.id == payload.layoutId);
      if (layout.items.findIndex(item => item.id === payload.linkId) === -1) {
        layout.items.push({
          id: payload.linkId,
          pos: {
            x: 0,
            y: 0,
            sizeX: 1,
            sizeY: 1
          },
        })
      }
    },
    unassignLayout(state, payload) {
      const layout = state.layouts.find(layout => layout.id == payload.layoutId) || state.layouts.find(layout => layout.active)
      const index = layout.items.findIndex(item => item.id === payload.linkId)
      if (index !== -1) {
        layout.items.splice(index, 1)
      }
    },
    activateLayout(state, id) {
      state.layouts.forEach(layout => layout.active = false)
      const layout = state.layouts.find(layout => layout.id === id)

      if (layout)
        layout.active = true
    },
    toggleFavouriteLayout(state, id) {
      if (state.layouts.filter(layout => layout.favourite === true).length >= 10) {
        state.events.alert.active = true
        state.events.alert.arg = { type: "layout-favourite-fail" }
        return;
      }
      const layout = state.layouts.find(layout => layout.id == id)

      layout.favourite = !layout.favourite
    },


    // ------- Events ------- 

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
      state.events.assignedTagsMenu.arg = null
      state.events.assignedTagsMenu.event = null
    },

    // Layouts Menu
    closeLayoutsMenu(state) {
      if (state.events.popup.arg?.type === "layout-list") {
        state.events.popup.active = false
        state.events.popup.arg = null
      }
    },

    // Assigned Layouts Menu
    showAssignedLayoutsMenu(state, payload) {
      state.events.assignedLayoutsMenu.active = true
      state.events.assignedLayoutsMenu.arg = payload
      state.events.assignedLayoutsMenu.event = payload.event
    },
    closeAssignedLayoutsMenu(state) {
      state.events.assignedLayoutsMenu.active = false
      state.events.assignedLayoutsMenu.arg = null
      state.events.assignedLayoutsMenu.event = null
    },

    // Context Menu
    showContextMenu(state, payload) {
      state.events.contextMenu.active = true
      state.events.contextMenu.arg = payload
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

    // Sidebar
    toggleSidebar(state) {
      if (state.events.sidebar.active)
        state.events.sidebar.active = false
      else
        state.events.sidebar.active = true
    }
  },
  actions: {
    async addLayout(context, payload) {
      const id = uniqueId()
      context.state.layouts.push({
        id,
        name: payload.name,
        color: payload.color,
        theme: payload.theme,
        active: false,
        favourite: false,
        size: 100,
        items: []
      })
      return id
    }
  },
  getters: {
    // Link Getters
    linkFromId: (state) => (id) => {
      return state.links.filter(element => element.id === id)[0]
    },
    linksFromTag: (state) => (tagID) => {
      return state.links.filter(link => link.tags.includes(tagID))
    },
    linksFromSearch: (state) => (links) => {
      let term = state.events.search.term.toLowerCase()
      if (!term) return links

      let tagIds = state.tags.filter(tag => tag.name.toLowerCase().includes(term)).map(tag => tag.id)

      let layoutLinkIds = []
      state.layouts.filter(layout => layout.name.toLowerCase().includes(term)).forEach(layout => layoutLinkIds.push(...layout.items.map(item => item.id)))

      let result = links.filter(link => (
        link.type?.toLowerCase().includes(term) ||
        link.style?.toLowerCase().includes(term) ||
        link.content.label?.toLowerCase().includes(term) ||
        link.content.address?.toLowerCase().includes(term) ||
        link.tags.findIndex(tag => tagIds.includes(tag)) !== -1
      ))

      layoutLinkIds.forEach(linkId => {
        if (result.findIndex(link => link.id === linkId) === -1)
          result.push(state.links.find(link => link.id === linkId))
      })

      return result
    },

    // Layout Getters
    layoutFromId: (state) => (id) => {
      return state.layouts.filter(layout => layout.id === id)[0]
    },
    layoutsFromLinkId: (state) => (id) => {
      return state.layouts.filter(layout => layout.items.find(item => item.id === id) !== undefined)
    },
    activeLayout: (state) => () => {
      return state.layouts.find(layout => layout.active === true)
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
        layouts: state.layouts,
        styles: state.styles,
        tags: state.tags,
        theme: state.theme,
      }
    }
  }
})

export default store

function modifyLink(element, data) {
  element.content.address = data.address.match(/^"*([^"]+)"*$/)[1]     // This regex is used to delete (") character from the start and the end of the given string.
  element.content.label = data.label
  element.content.customImg = data.customImg

  element.type = data.type || "url";
  if (data.imgLabel && data.imgBuffer) {
    element.content.img = data.imgLabel
    window.ipcRenderer.send("save-link-image-to-file", { buffer: data.imgBuffer, label: data.imgLabel, id: element.id })
  }
}