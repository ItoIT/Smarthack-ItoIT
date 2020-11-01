import { getFirmsProgress } from "./API/API.mjs";

async function createFirms() {
  getFirmsProgress().then((data) => {
    const spinnerContainer = document.querySelector(".container-spinner");
    spinnerContainer.style.display = "none";

    let filtered_data = data.filter((item) => {
      if (
        item.feedback ||
        (item.bank_documents_approved === true &&
          item.factura_capital_approved === true)
      ) {
        return false;
      } else {
        return true;
      }
    });

    if (filtered_data.length == 0) {
      const firmsContainer = document.querySelector("#firms-container");
      const notification = document.createElement("p");
      notification.classList.add("h2");
      notification.classList.add("notification-text")
      notification.innerHTML = "Nu s-au gasit firme asociate cu aceasta banca!";
      firmsContainer.appendChild(notification);
    } else {
      for (let firm of data) {
        if (
          firm.feedback ||
          (firm.bank_documents_approved === true &&
            firm.factura_capital_approved === true)
        ) {
          continue;
        }

        const firmsContainer = document.querySelector("#firms-container");

        const title = document.createElement("div");
        title.classList.add("h2");
        // title.classList.add("mt-3");
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

        if (firm.bank_documents_approved === true) {
          const documents = document.createElement("a");
          documents.classList.add("download-button");
          documents.classList.add("btn");
          documents.classList.add("btn-primary");
          documents.classList.add("mt-3")
          documents.target = "_blank";
          documents.href = firm.factura_capital_url;
          documents.innerHTML = "Downloadeaza factura";
          form.appendChild(documents);
        }

        const feedbackDiv = document.createElement("div");
        feedbackDiv.innerHTML = "Feedback:";
        feedbackDiv.classList = "mt-3";
        form.appendChild(feedbackDiv);

        const textarea = document.createElement("textarea");
        textarea.name = "feedback";
        textarea.classList.add("feedback-textarea");
        form.appendChild(textarea);

        const acceptDiv = document.createElement("div");

        const label = document.createElement("label");
        label.setAttribute("for", "approve");
        label.classList.add("mb-3");
        label.classList.add("mr-3");
        label.innerHTML = "Approve:";

        const approveInput = document.createElement("input");
        approveInput.setAttribute("id", "approve");
        approveInput.setAttribute("type", "checkbox");
        approveInput.name = "approve";
        approveInput.classList = "checkbox";

        acceptDiv.appendChild(label);
        acceptDiv.appendChild(approveInput);
        form.appendChild(acceptDiv);

        const ibanInput = document.createElement("input");
        ibanInput.name = "iban";
        ibanInput.style.marginBottom = "10px";
        ibanInput.style.display = "none";
        ibanInput.classList.add("mb-3");
        ibanInput.placeholder = "IBAN";
        form.appendChild(ibanInput);

        if (firm.bank_documents_approved === false) {
          approveInput.onchange = (event) => {
            if (event.target.checked) {
              ibanInput.style.display = "block";
            } else {
              ibanInput.style.display = "none";
            }
          };
        }

        const firmInput = document.createElement("input");
        firmInput.type = "hidden";
        firmInput.name = "firm";

        firmInput.value = firm.id;
        form.appendChild(firmInput);

        const submit = document.createElement("input");
        submit.type = "submit";
        submit.classList = "btn btn-primary";
        form.appendChild(submit);
      }
    }
  });
}

createFirms();
