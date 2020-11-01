let submitReader = document.querySelector("#submitReader");
if(submitReader)
{
  submitReader.addEventListener("click", function (e) {
    let form = document.querySelector("#readForm");
    if(form)
    {
      form.style.display = "none";
      let spinner = document.querySelector(".container-spinner");
      spinner.style.display = "flex";
      spinner.classList.remove("d-none");
    }
   
  });
}
let loadData = document.querySelector("#loadData");
loadData.addEventListener("click", function (e) {
  window.open('/dosar','_blank')
 
});

