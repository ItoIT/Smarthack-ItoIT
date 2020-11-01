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
        if(data.length > 0 )
        {
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
                let completed = document.querySelector("#firm-completed");
                completed.style.display = 'block';

                let completedUrl = document.querySelector("#completed-url");
                completedUrl.setAttribute('href',data[0]['acte_complete_url']);
            }
        }
        else
        {
                denied[0].style.display = 'block';
                denied[1].style.display = 'block';
                denied[2].style.display = 'block';
                disableAnchor(steps[1]);
                disableAnchor(steps[2]);
        }
        alertsAnchors();
    })

}
function alertsAnchors() {
    let anchors = Array.from(document.querySelectorAll("div.step > a"));
    anchors.forEach(element => {
        element.addEventListener('click', ev => {
            if (element.classList.contains("disabled")) {
                Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Nu poti trece la pasul asta fara a avea completat pasii anteriori!',
                });
            }
        });
    });
}

updateProgress();