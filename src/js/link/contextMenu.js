import openLink from "@/js/link/open.js";

export default function (event, id) {
  const element = this.$store.getters.linkFromId(id)

  this.$store.commit("showContextMenu", {
    content: [
      {
        label: "Open",
        click: () => {
          openLink.bind(this)(element.id)
        },
        style: {
          backgroundColor: "var(--button-muted)"
        }
      },
      {
        label: "Edit Link",
        click: () => {
          this.$store.commit("showPopup", {
            type: "edit-link",
            linkID: element.id,
            imgUrl: element.img,
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
        label: "Delete Link",
        click: () => {
          this.$store.commit("showAlert", {
            type: "delete-link",
            id: element.id,
          });
        },
        style: {
          backgroundColor: "var(--alert-muted)"
        }
      },
    ],
    event,
  });
}
