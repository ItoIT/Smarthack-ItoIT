import {getFirmsProgress} from "./API/API.mjs";

async function createFirms()
{
    getFirmsProgress().then((data) => { 
        for(let firm of data)
        {
            if(firm.feedback || (firm.bank_documents_approved === true && firm.factura_capital_approved === true)) {
                continue;
            } 
            const firmsContainer = document.querySelector("#firms-container");
    
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
            documents.href = firm.bank_documents_url;
            documents.innerHTML = "Downloadeaza actele";
            form.appendChild(documents);

            if(firm.bank_documents_approved === true) {
                const documents = document.createElement("a");
                documents.classList.add("download-button");
                documents.classList.add("btn");
                documents.classList.add("btn-primary");
                documents.target = "_blank";
                documents.href = firm.factura_capital_url;
                documents.innerHTML = "Downloadeaza factura";
                form.appendChild(documents);
            }

            const feedbackDiv = document.createElement("div");
            feedbackDiv.innerHTML = "Feedback:";
            form.appendChild(feedbackDiv);

            const textarea = document.createElement("textarea");
            textarea.name = "feedback";
            form.appendChild(textarea);

            const acceptDiv = document.createElement("div");
            acceptDiv.innerHTML = 'Accept: <input name="approve" type="checkbox">';
            form.appendChild(acceptDiv);

            const firmInput = document.createElement("input");
            firmInput.type = "hidden";
            firmInput.name = "firm"
            firmInput.value = firm.id;
            form.appendChild(firmInput);

            const submit = document.createElement("input");
            submit.type = "submit";
            form.appendChild(submit);
        }
    })
}

createFirms();