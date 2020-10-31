export function getBankList() {
    const endpoint_data = {
        method: "GET",
    };
    var url = "/banci";
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
export function getUserBank() {
    const endpoint_data = {
        method: "GET",
    };
    var url = "";
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
export function getONRCS() {
    const endpoint_data = {
        method: "GET",
    };
    var url = "/registers";
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
export function getFirmsProgress() {
    const endpoint_data = {
        method: "GET",
    };
    var url = "/firms";
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
export function readIdCard() {
    const endpoint_data = {
        method: "POST",
    };
    
    var url = "/readIdCard";
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


