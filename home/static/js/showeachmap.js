function showEachMap() {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    axios({
        method: "POST",
        url: 'create_map/',
        data: {
            "title": title,
        },
    }).then(res => {
        console.log(res);
        mapTitle.style.display = 'none';
        setTitle(title);
    }).catch(error => {
        console.log(error);
    })
}
