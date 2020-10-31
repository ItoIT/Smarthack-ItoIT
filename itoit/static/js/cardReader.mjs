let submitReader = document.querySelector("#submitReader");

submitReader.addEventListener("click", function (e) {
  document.querySelector("#readForm").style.display = "none";
  let spinner = document.querySelector(".spinner-border");
  spinner.style.display = "block";
  spinner.classList.remove("d-none");

  $("#readForm").ajaxForm({
    complete: function (xhr) {
      alert("Upload complete");
    },
  });
});
