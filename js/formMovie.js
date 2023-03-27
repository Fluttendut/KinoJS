document.addEventListener('DOMContentLoaded', createFormEventListener);

let formMovie;

function createFormEventListener() {
    if (document.getElementById("formAddMovie") != null) {
        formMovie = document.getElementById("formAddMovie");
        formMovie.addEventListener("submit", handleAddFormSubmit);
    } else {
        formMovie = document.getElementById("formEditMovie");
        formMovie.addEventListener("submit", handleEditFormSubmit);}
}

async function handleAddFormSubmit(event) {
    console.log("nu er vi i add submit")
    event.preventDefault();
    const URL = formMovie.action;
    let title = document.getElementById("inpTitle").value;
    let genre = document.getElementById("inpGenre").value;
    let length = document.getElementById("inpLength").value;
    let rating = document.getElementById("inpRating").value;
    let ageRestriction = document.getElementById("inpAgeRestriction").value;


    const movie = {
        title: title.trim(),
        genre: genre.trim(),
        length: length.trim(),
        rating: rating.trim(),
        ageRestriction: ageRestriction.trim(),
    };

    const options = {
        method: "post",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            "Content-Type": "application/json"},
        mode: 'cors',
        body: JSON.stringify(movie)
    };
    await fetch(URL, options)
        .then((res) => {
            if (res.status === 200) {
                console.log(res)
                location.href = '../html/moviemanager.html';
                return res.json()
            } else {
                throw Error(res.statusText)
            }
        })
        .catch(console.error);
}

async function handleEditFormSubmit(event) {
    console.log("nu er vi i edit submit")
    event.preventDefault();
    const URL = formMovie.action;
    let title = document.getElementById("inpTitle").value;
    let genre = document.getElementById("inpGenre").value;
    let length = document.getElementById("inpLength").value;
    let rating = document.getElementById("inpRating").value;
    let ageRestriction = document.getElementById("inpAgeRestriction").value;
    let movieId = document.getElementById("inpMovieId").value;

    const movie = {
        title: title,
        genre: genre,
        length: length,
        rating: rating,
        ageRestriction: ageRestriction,
        movieId: movieId
    };

    const options = {
        method: "post",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            "Content-Type": "application/json"},
        mode: 'cors',
        body: JSON.stringify(movie)
    };
    await fetch(URL, options)
        .then((res) => {
            if (res.status === 200) {
                console.log(res)
                location.href = '../html/moviemanager.html';
                return res.json()
            } else {
                throw Error(res.statusText)
            }
        })
        .catch(console.error);
}

function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/[(\d+)?]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/[(\d+)?]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/[\d+]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /[(\d+)]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string'){
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;

}
