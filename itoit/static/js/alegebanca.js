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

let boxes = document.querySelector("#boxes");
console.log(boxes.childElementCount);
if(boxes.childElementCount > 0)
{
    let downloadButton = document.querySelector("#download-button");
    downloadButton.style.display = 'block';
}
