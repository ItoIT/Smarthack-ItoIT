
function succesAlert(message)
{
    alert(message);
}
let div = document.createElement("div");
div.style.color = "red";
div.innerHTML =  "Actiunea ta a fost efectuata cu succes! Ai primit un mesaj de confirmare pe email.";
succesAlert(div.toSource());