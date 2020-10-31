import {getBankList, getUserBank} from "./API/API.mjs";

function addBank(numeBanca, pdfBanca, idBanca) // functie care adauga in lista de banci o banca
{
    
    let boxes = document.querySelector("#boxes");
    let box = document.createElement("div");
    box.classList = "box";
    
    let input = document.createElement("input");
    input.type="radio";
    input.name = "banca";
    input.id = numeBanca;
    input.value = String(idBanca);
    input.classList = "checkbox";
    input.addEventListener('click', function (){
        let downloadButton = document.querySelector("#download-button");
        downloadButton.setAttribute('href', pdfBanca)
        checkedBank();
    });
    let label = document.createElement("label");
    label.setAttribute("for",numeBanca);
    
    label.innerHTML = numeBanca;
    
    box.appendChild(input);
    box.appendChild(label);
    boxes.appendChild(box);
}

function checkedBank()
{
    let boxes = document.querySelector("#boxes");
    if(boxes.childElementCount > 0)
    {
        let downloadButton = document.querySelector("#download-button");
        downloadButton.style.display = 'block';
    }
}
async function createBankList()  // functie care creaza lista de banci in alegebanca.jinja
{
    getBankList().then((data) => {
        data.forEach(bank => {
            console.log(bank);
            addBank(bank['name'],bank['url'],bank['id']);
        })
    })
    getUserBank().then((data) => { 
        console.log(data);
    })
    
    

}
createBankList();