import {getFirmsProgress} from "./API/API.mjs";


function updateProgress() // functie care updateaza progresul de creare a firmei
{
    getFirmsProgress().then((data) => {
        console.log(data);
    })
}

updateProgress();