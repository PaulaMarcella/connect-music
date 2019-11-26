const $dateInputCreate = document.getElementById("date-create-event");
window.addEventListener("load", () => {
  let today = new Date();
  $dateInputCreate.value = today.toISOString().substr(0, 10);
});
