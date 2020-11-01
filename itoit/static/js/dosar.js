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