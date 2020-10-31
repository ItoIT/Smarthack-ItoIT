let submitReader = document.querySelector("#submitReader");

submitReader.addEventListener('click', function(e) {
    e.preventDefault();
   
    document.querySelector("#readForm").style.display = "none";
    let spinner = document.querySelector(".spinner-border");
    spinner.style.display = 'block';
    spinner.classList.remove("d-none");

    let idCard = document.querySelector("#idCard");

    const reader = new FileReader();
    const formData = new FormData();
   
    
    reader.addEventListener('load', (event) => {
        formData["image"] = reader.result;
        console.log(formData);
        var request = new XMLHttpRequest();
        request.open("post","http://localhost:5000/readIdCard");
        request.onload = function () {
            console.log(request.response);
        }
        request.send(formData);
    });
    reader.readAsDataURL(idCard.files[0]);
    
})