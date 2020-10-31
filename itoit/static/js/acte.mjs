import {getFirmsProgress} from "./API/API.mjs";

// bank_documents_approved
// register_documents_approved
// factura_capital_approved
function disableAnchor(anchor)
{
    anchor.removeAttribute('href');
    anchor.classList.add('disabled');
    anchor.setAttribute('color','grey');
}
function updateProgress() // functie care updateaza progresul de creare a firmei
{
    let approved = document.querySelectorAll(".fa-check");
    let denied = document.querySelectorAll(".fa-times");
    let steps = document.querySelectorAll(".step-a");
    getFirmsProgress().then((data) => {
        console.log(data);
       
        if(data[0]['bank_documents_approved']  === false)
        {
            approved[0].style.display = 'none';
            approved[1].style.display = 'none';
            approved[2].style.display = 'none';
            denied[0].style.display = 'block';
            denied[1].style.display = 'block';
            denied[2].style.display = 'block';
            disableAnchor(steps[1]);
            disableAnchor(steps[2]);
            
        }
        else if(data[0]['factura_capital_approved'] === false)
        {
            approved[0].style.display = 'block';
            approved[1].style.display = 'none';
            approved[2].style.display = 'none';
            denied[0].style.display = 'none';
            denied[1].style.display = 'block';
            denied[2].style.display = 'block';
            disableAnchor(steps[2]);
        }
        else if(data[0]['register_documents_approved'] === false)
        {
            approved[0].style.display = 'block';
            approved[1].style.display = 'block';
            approved[2].style.display = 'none';
            denied[0].style.display = 'none';
            denied[1].style.display = 'none';
            denied[2].style.display = 'block';
        }
        else
        {
            approved[0].style.display = 'block';
            approved[1].style.display = 'block';
            approved[2].style.display = 'block';
            denied[0].style.display = 'none';
            denied[1].style.display = 'none';
            denied[2].style.display = 'none';
        }
    })

}

updateProgress();