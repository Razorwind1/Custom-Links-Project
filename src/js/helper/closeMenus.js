export default function() {
    this.$store.commit("closeContextMenu");
    this.$store.commit("closeAssignedTagsMenu");
    this.$store.commit("closeAssignedLayoutsMenu");
    // this.$store.commit("closeLayoutsMenu");
}