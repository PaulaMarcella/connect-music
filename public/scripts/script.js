const $dateInputCreate = document.getElementById("date-create-event");
window.addEventListener("load", () => {
  let today = new Date();
  $dateInputCreate.value = today.toISOString().substr(0, 10);
});

// window.addEventListener("load", () => {
//   $(document).ready(function() {
//     $("#myInput").on("keyup", function() {
//       var value = $(this)
//         .val()
//         .toLowerCase();
//       $("#myList li").filter(function() {
//         $(this).toggle(
//           $(this)
//             .text()
//             .toLowerCase()
//             .indexOf(value) > -1
//         );
//       });
//     });
//   });
// });

window.addEventListener("load", () => {
  $(document).ready(function() {
    $("#search").on("keyup", function() {
      var value = $(this)
        .val()
        .toLowerCase();
      $("#box-search #items").filter(function() {
        $(this).toggle(
          $(this)
            .text()
            .toLowerCase()
            .indexOf(value) > -1
        );
      });
    });
  });
});
