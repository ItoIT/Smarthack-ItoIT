import {getBankList, getUserBank} from "./API/API";

function addBank(numeBanca, pdfBanca, idBanca) // functie care adauga in lista de banci o banca
{
    
    let boxes = document.querySelector("#boxes");
    let box = document.createElement("div");
    box.classList = "box";
    
    let input = document.createElement("input");
    input.type="radio";
    input.name = "banca";
    input.id = numeBanca;
    input.classList = "checkbox";
    input.addEventListener('click', function (){
        let downloadButton = document.querySelector("#download-button");
        downloadButton.setAttribute('href', pdfBanca)
    });
    let label = document.createElement("label");
    label.setAttribute("for",numeBanca);
    
    label.innerHTML = numeBanca;
    
    box.appendChild(input);
    box.appendChild(label);
    boxes.appendChild(box);
}


async function createBankList()  // functie care creaza lista de banci in alegebanca.jinja
{
    getBankList().then(res => res.json())
    .then((data) => {
        data['data'].forEach(bank => {
            addBank(bank['nume'],bank['url'],bank['id']);
        })
    })
    getUserBank().then(res => res.json())
    .then((data) => { 
        console.log(data);
    })
    
    let boxes = document.querySelector("#boxes");
    if(boxes.childElementCount > 0)
    {
        let downloadButton = document.querySelector("#download-button");
        downloadButton.style.display = 'block';
    }

}