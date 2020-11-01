import {getFirmsProgress} from "./API/API.mjs";

async function createFirms()
{
    getFirmsProgress().then((data) => { 
        const firmsContainer = document.querySelector("#firms-container");
        let firmsCounter = 0;
        for(let firm of data)
        {
            if(firm.feedback || firm.register_documents_approved === true) {
                continue;
            } 
            const title = document.createElement("div");
            title.classList.add("h2");
            title.innerHTML = "<br>Firma #" + firm.id;
            firmsContainer.appendChild(title);

            const form = document.createElement("form");
            form.method = "POST";
            form.enctype = "multipart/form-data";
            firmsContainer.appendChild(form);

            const documents = document.createElement("a");
            documents.classList.add("download-button");
            documents.classList.add("btn");
            documents.classList.add("btn-primary");
            documents.target = "_blank";
            documents.href = firm.register_documents_url;
            documents.innerHTML = "Downloadeaza actele";
            form.appendChild(documents);

            const feedbackDiv = document.createElement("div");
            feedbackDiv.innerHTML = "Feedback:";
            form.appendChild(feedbackDiv);

            const textarea = document.createElement("textarea");
            textarea.name = "feedback";
            form.appendChild(textarea);

            const acceptDiv = document.createElement("div");
            acceptDiv.innerHTML = 'Accept: ';
            form.appendChild(acceptDiv);

            const approveInput = document.createElement("input");
            approveInput.name = "approve";
            approveInput.type = "checkbox";
            acceptDiv.appendChild(approveInput);

            const completeInput = document.createElement("input");
            completeInput.type = "file";
            completeInput.name = "complete";
            completeInput.style.marginBottom = "10px";
            completeInput.style.display = "none";
            form.appendChild(completeInput);

            approveInput.onchange = (event) => {
                if(event.target.checked) {
                    completeInput.style.display = "block";
                } else {
                    completeInput.style.display = "none";
                }
            }

            const firmInput = document.createElement("input");
            firmInput.type = "hidden";
            firmInput.name = "firm"
            firmInput.value = firm.id;
            form.appendChild(firmInput);

            const submit = document.createElement("input");
            submit.type = "submit";
            form.appendChild(submit);
        }
        if(firmsCounter === 0) {
            firmsContainer.innerHTML = "Nicio firma in asteptare.";
        }
    })
}

createFirms();