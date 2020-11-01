import{ getFirmsProgress } from "./API/API.mjs";

console.log("aaaa");

function getUser()
{
    const endpoint_data = {
        method: "GET",
    };
    var url = "/user";
    return fetch(url, endpoint_data)
        .then(res => res.json())
        .then((data) => {
            return data;
        })
        .catch(e => {
            console.log(e);
            return [];
        });
}

getUser().then((data) => {
    console.log(data);
    let nume = data['name'];
    let cnp = data['cnp'];
    let adresaSediu = data['adresa_sediu'];
    let domiciliu = data['domiciliu'];
    let oras = domiciliu.split(" ")[domiciliu.split(" ").length - 2];
    let judet = domiciliu.split(" ")[domiciliu.split(" ").length - 1];
    let orasFirma = adresaSediu.split(" ")[adresaSediu.split(" ").length - 2];
    let judetFirma = adresaSediu.split(" ")[adresaSediu.split(" ").length - 1];
    console.log(oras);
    let strada = "";
    let stradaNr = "";
    let i = 0;
    for(i = 0; i  < domiciliu.length; i++)
    {
        if( domiciliu[i] >= '0' && domiciliu[i] <= '9')
        {
            break;
        }
        strada += domiciliu[i];
    }
    let j = i;

    for(j = i; i  < domiciliu.length; i++)
    {
        if( domiciliu[i] >= '0' && domiciliu[i] <= '9')
        {
            stradaNr += domiciliu[i];
        }
        else
        {
            break;
        }
    }
    let stradaFirma = "";
    let stradaFirmaNr = "";
     i = 0;
    for(i = 0; i  < adresaSediu.length; i++)
    {
        if( adresaSediu[i] >= '0' && adresaSediu[i] <= '9')
        {
            break;
        }
        stradaFirma += adresaSediu[i];
    }
    j = i;

    for(j = i; i  < adresaSediu.length; i++)
    {
        if( adresaSediu[i] >= '0' && adresaSediu[i] <= '9')
        {
            stradaFirmaNr += adresaSediu[i];
        }
        else
        {
            break;
        }
    }


    let email = data['email'];
    let serie = data['serie'];
   
    let serie1 = serie.split(" ")[0];
    let nr =  serie.split(" ")[1];
    console.log(serie1);

    let allName = document.querySelectorAll("#nume");
    allName.forEach(name => {
        name.innerHTML = nume;
    });
    let allCNP = document.querySelectorAll("#cnp");
    allCNP.forEach(a => {
        a.innerHTML = cnp;
    });
    let allEmail = document.querySelectorAll("#email");
    allEmail.forEach(a => {
        a.innerHTML = email;
    });
    let allSerie = document.querySelectorAll("#serie");
    allSerie.forEach(a => {
        a.innerHTML = serie1;
    });
    let allNr = document.querySelectorAll("#nr");
    allNr.forEach(a => {
        a.innerHTML = nr;
    });
    let allTelefon = document.querySelectorAll("#telefon");
    allTelefon.forEach(a => {
        a.innerHTML = "-";
    });
    let allOras = document.querySelectorAll("#resedinta");
    allOras.forEach(a => {
        a.innerHTML = oras;
    });
    let allJudet = document.querySelectorAll("#judet");
    allJudet.forEach(a => {
        a.innerHTML = judet;
    });
    let allFirmaOras = document.querySelectorAll("#sediu-firma-oras");
    allFirmaOras.forEach(a => {
        a.innerHTML = orasFirma;
    });
    let allFirmaJudet = document.querySelectorAll("#judet-firma");
    allFirmaJudet.forEach(a => {
        a.innerHTML = judetFirma;
    });
    let allStrada = document.querySelectorAll("#resedinta-strada");
    allStrada.forEach(a => {
        a.innerHTML = strada;
    });
    let allStradaNr = document.querySelectorAll("#resedinta-nr");
    allStradaNr.forEach(a => {
        a.innerHTML = stradaNr;
    });
    let allStradaFirma = document.querySelectorAll("#strada-firma");
    allStradaFirma.forEach(a => {
        a.innerHTML = stradaFirma;
    });
    let allStradaFirmaNr = document.querySelectorAll("#nr-strada-firma");
    allStradaFirmaNr.forEach(a => {
        a.innerHTML = stradaFirmaNr;
    });
    getFirmsProgress().then((data) => {
        let allNumeFirma = document.querySelectorAll("#nume-firma");
        allNumeFirma.forEach(a => {
            a.innerHTML = data[0]['name'];
        });
        })
    console.log(stradaNr);
})

