import {getBankList,getFirmsProgress} from "./API/API.mjs";

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
    getFirmsProgress().then((data) => { 
        let alreadyHaveBank = document.querySelector(".already-have-bank");
        let eraseBankChoice = document.querySelector(".bank-choice");
        if(data.length > 0 && data[0]['bank_documents_approved']  === true )
        { 
            alreadyHaveBank.innerHTML += " " + data[0]['bank_name'];
            alreadyHaveBank.style.display = 'block';
            eraseBankChoice.style.display = 'none';
        }
        else
        {
            alreadyHaveBank.style.display = 'none';
            eraseBankChoice.style.display = 'block';
            getBankList().then((data) => {
                data.forEach(bank => {
                    console.log(bank);
                    addBank(bank['name'],bank['url'],bank['id']);
                })
            })
        }
    })
}
createBankList();