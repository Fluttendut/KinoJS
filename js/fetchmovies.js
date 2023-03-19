const urlMovies = "http://localhost:8080/movies"

function fetchAny(url) {
    console.log(url)
    let options =  {
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },
        mode: 'cors'
    };
    console.log(options)
    return fetch(url, options)
        .then((response) => response.json())
        .then(json => console.log(JSON.stringify(json)))
}

let lstMovies = []
async function actionFetchMovies() {
    lstMovies = await fetchAny(urlMovies);
    lstMovies.forEach(showMovie)
}
function showMovie(movie) {
    console.log(movie)
    createTable(movie)
}

const tblMovie = document.getElementById("tblMovies");
function createTable(movie) {
    console.log(movie.title)
    if (!movie.title) return;

    console.log(tblMovie)
    let cellCount = 0
    let rowCount = tblMovie.rows.length
    let row = tblMovie.insertRow(rowCount)
    row.id = movie.title;

    let cell = row.insertCell(cellCount++)
    cell.innerHTML = movie.title
    cell = row.insertCell(cellCount++)
    cell.innerHTML = movie.genre
    cell = row.insertCell(cellCount++)
    cell.innerHTML = movie.length
    cell = row.insertCell(cellCount++)
    cell.innerHTML = movie.rating
    cell = row.insertCell(cellCount++)
    cell.innerHTML = movie.ageRestriction

    //Edit movie
    cell = row.insertCell(cellCount++)
    let pbUpdate = document.createElement("button")
    pbUpdate.textContent = "Edit"
    pbUpdate.className = "buttonupdate"
    pbUpdate.addEventListener('click', function () {
        //window.location.href = "editmovie.html"
        window.location.href=`editmovie.html?title=${movie.title}&genre=${movie.genre}&length=${movie.length}&rating=${movie.rating}&ageRestriction=${movie.ageRestriction}`
    })
    cell.appendChild(pbUpdate)

    //Delete movie
    cell = row.insertCell(cellCount++)
    let pbDelete = document.createElement("button")
    pbDelete.textContent = "Delete"
    pbDelete.className = "buttondelete"
    pbDelete.addEventListener('click', function () {
        const rowdel = document.getElementById(movie.title)
        rowdel.remove();
        restDeleteMovie(movie)
    })
    cell.appendChild(pbDelete)

}
async function restDeleteMovie(movie) {
    const url = "http://localhost:8080/deleteMovie/" + movie.title;
    const fetchOptions = {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            "Content-type": "application/json"
        },
        body: ""
    }
    fetchOptions.body = JSON.stringify(movie);
    //calls backend and wait for return
    const response = await fetch(url, fetchOptions);
    console.log(response);
    if (!response.ok) {
        console.log("Delete failed");
    }
    return response;
}

