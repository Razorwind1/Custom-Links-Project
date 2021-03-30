import openLink from "@/js/link/open.js";

export default function (event, id) {
  const element = this.$store.getters.linkFromId(id)

  this.$store.commit("showContextMenu", {
    content: [
      {
        label: "Open",
        click: () => {
          this.$store.commit("closeContextMenu");
          openLink.bind(this)(element.id)
        },
        class: "open"
      },
      {
        label: "Edit Link",
        click: () => {
          this.$store.commit("closeContextMenu");
          this.$store.commit("showPopup", {
            type: "edit-link",
            linkID: element.id,
            imgUrl: element.content.img,
          });
        },
      },
      {
        label: "Tags",
        click: () => {
          this.$store.commit("closeContextMenu");
          this.$store.commit("showAssignedTagsMenu", {
            element,
            event,
          });
        },
      },
      {
        label: "Layouts",
        click: () => {
          this.$store.commit("closeContextMenu");
          this.$store.commit("showAssignedLayoutsMenu", {
            element,
            event,
          });
        },
      },
      {
        label: "Open in Explorer",
        click: () => {
          this.$store.commit("closeContextMenu");
          window.ipcRenderer.send("open-in-explorer", element?.content?.address)
        },
        class: "open-in-explorer"
      },
      {
        label: "Remove",
        click: () => {
          this.$store.commit("closeContextMenu");
          this.$store.commit("unassignLayout", {
            linkId: element.id
          })
        },
        class: "remove"
      },
      {
        label: "Delete Link",
        click: () => {
          this.$store.commit("closeContextMenu");
          this.$store.commit("showAlert", {
            type: "delete-link",
            id: element.id,
          });
        },
        class: "delete"
      },
    ],
    event,
    element
  });
}
