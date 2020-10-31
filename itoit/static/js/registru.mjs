import {getONRCS} from "./API/API.mjs";

function createONRCS() // functie care creaza lista cu registrele inregistrate
{
    let onrcList = document.querySelector("#onrc-select");
    getONRCS().then((data) => {
       
        data.forEach(onrc => {
            
            onrcList.options[onrcList.options.length] = new Option(String(onrc['name']),onrc['url']);

        })
    })
}

document.querySelector("#onrc-select").addEventListener('change',function(){
    let onrcList = document.querySelector("#onrc-select");
    console.log(onrcList.value);
    let button = document.querySelector("#download-button");
    button.setAttribute('href',onrcList.value);
})
createONRCS();