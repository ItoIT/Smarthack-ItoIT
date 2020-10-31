import {getONRCS,getFirmsProgress} from "./API/API.mjs";

function createONRCS() // functie care creaza lista cu registrele inregistrate
{
    let onrcList = document.querySelector("#onrc-select");
    let alreadyHaveOnrc = document.querySelector(".already-have-onrc");
    getFirmsProgress().then((data) =>{
        if(data.length > 0 && data[0]['register_documents_approved'] === true)
        {
            alreadyHaveOnrc.innerHTML += data[0]['trade_register_name'];
            alreadyHaveOnrc.style.display = 'block';
            onrcList.style.display = 'none';
        }
        else
        {
            alreadyHaveOnrc.style.display = 'none';
            onrcList.style.display = 'block';
            getONRCS().then((data) => {
       
                data.forEach(onrc => {
                    
                    onrcList.options[onrcList.options.length] = new Option(String(onrc['name']),onrc['url']);
        
                })
            })
        }
    })
    
}

document.querySelector("#onrc-select").addEventListener('change',function(){
    let onrcList = document.querySelector("#onrc-select");
    console.log(onrcList.value);
    let button = document.querySelector("#download-button");
    button.setAttribute('href',onrcList.value);
})
createONRCS();