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