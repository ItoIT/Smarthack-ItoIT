import {getONRCS} from "./API/API.mjs";

function createONRCS() // functie care creaza lista cu registrele inregistrate
{
    let onrcList = document.querySelector("#onrc-select");
    getONRCS().then((data) => {
        data.forEach(onrc => {
            let onrcOption = document.createElement("option");
            onrcOption.value = onrc['name'];
            onrcOption.innerHtml = onrc['name'];
            onrcList.appendChild(onrcOption);
        })
    })
}
document.querySelector("#download-button").addEventListener('click',function(){
    let onrcList = document.querySelector("#onrc-select");
    if(onrcList.value == 0)
    {
        console.log("ALERTA ALEGE UN JUDET");
    }
})
createONRCS();