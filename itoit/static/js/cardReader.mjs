let submitReader = document.querySelector("#submitReader");

submitReader.addEventListener("click", function (e) {
  document.querySelector("#readForm").style.display = "none";
  let spinner = document.querySelector(".container-spinner");
  spinner.style.display = "flex";
  spinner.classList.remove("d-none");
});
