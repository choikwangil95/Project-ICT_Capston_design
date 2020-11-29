showRouteButton.addEventListener("click", showEachMap);



function showEachMap() {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    userId = getUserId(username).then(data => {
        axios({
            method: "POST",
            url: `list/${data}/`,
        }).then(res => {
            console.log(res);
            mapTitle.style.display = 'none';
            setTitle(title);
        }).catch(error => {
            console.log(error);
        })
    })

}

function getUserId(username) {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    return axios({
        method: "GET",
        url: `get_userid/${encodeURI(username, "UTF-8")}/`,
    }).then(function (response) {
        userid = response.data.data.user_id
        return response.data.data.user_id
    })
}