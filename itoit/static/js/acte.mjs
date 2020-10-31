import {getFirmsProgress} from "./API/API.mjs";

// bank_documents_approved
// register_documents_approved
// factura_capital_approved
function updateProgress() // functie care updateaza progresul de creare a firmei
{
    let approved = document.querySelectorAll(".fa-check");
    let denied = document.querySelectorAll(".fa-times");
    getFirmsProgress().then((data) => {
        if(data[0]['bank_documents_approved']  === false)
        {
            approved[0].style.display = 'none';
            approved[1].style.display = 'none';
            approved[2].style.display = 'none';
            denied[0].style.display = 'block';
            denied[0].style.display = 'block';
            denied[0].style.display = 'block';
        }
        else if(data[0]['factura_capital_approved'] === false)
        {
            approved[0].style.display = 'block';
            approved[1].style.display = 'none';
            approved[2].style.display = 'none';
            denied[0].style.display = 'none';
            denied[0].style.display = 'block';
            denied[0].style.display = 'block';
        }
        else if(data[0]['register_documents_approved'] === false)
        {
            approved[0].style.display = 'block';
            approved[1].style.display = 'block';
            approved[2].style.display = 'none';
            denied[0].style.display = 'none';
            denied[0].style.display = 'none';
            denied[0].style.display = 'block';
        }
        else
        {
            approved[0].style.display = 'block';
            approved[1].style.display = 'block';
            approved[2].style.display = 'block';
            denied[0].style.display = 'none';
            denied[0].style.display = 'none';
            denied[0].style.display = 'none';
        }
    })

}

updateProgress();