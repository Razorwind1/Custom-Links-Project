module.exports = function (el) {
  el.querySelectorAll(".required").forEach(requiredItems => requiredItems.classList.remove("required"))
  el.querySelectorAll("span.required-text").forEach(requiredText => requiredText.remove())

  // Handle Input Field Validation
  const requiredInputs = el.querySelectorAll("input[required]");
  const emptyRequiredInputs = Array.from(requiredInputs).filter(
    (input) => input.value === ""
  );
  emptyRequiredInputs.forEach(input => {
    input.classList.add("required")
    setTimeout(() => {input.classList.remove("required")}, 800)
    input.insertAdjacentHTML("afterend", "<span class='required-text'>This field is required.</span>")
  })

  return emptyRequiredInputs.length === 0
}