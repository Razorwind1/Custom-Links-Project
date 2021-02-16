module.exports = function (event, element) {
  console.log(this)
  this.$store.commit("showContextMenu", {
    content: [
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
        label: "Delete Link",
        click: () => {
          this.$store.commit("showAlert", {
            type: "delete-link",
            id: element.id,
          });
        },
      },
      {
        label: "Edit Tags",
        click: () => {
          this.$store.commit("closeContextMenu");

          this.$store.commit("showAssignedTagsMenu", {
            element,
            event,
          });
        },
      },
    ],
    event,
  });
}
