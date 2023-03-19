document.addEventListener('DOMContentLoaded', createFormEventListener);
let formMovie;

function createFormEventListener() {
    formMovie = document.getElementById("formMovie");
    formMovie.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    console.log("nu er vi i submit")
    event.preventDefault();
    const URL = formMovie.action;
    let title = document.getElementById("inpTitle").value;
    let genre = document.getElementById("inpGenre").value;
    let length = document.getElementById("inpLength").value;
    let rating = document.getElementById("inpRating").value;
    let ageRestriction = document.getElementById("inpAgeRestriction").value;

    const movie = {
        title: title,
        genre: genre,
        length: length,
        rating: rating,
        ageRestriction: ageRestriction
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

/*
async function postFormData(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries())
    console.log(plainFormData)

    const movie = {}
    movie. = "?" //Hvad skal der stå her?
    plainFormData.movie = movie

    const formDataJsonString = JSON.stringify(plainFormData)

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: formDataJsonString
    }

    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }
    return response.json();
}
 */



