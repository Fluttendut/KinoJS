console.log("Jeg er i fetch movies")
const urlMovies = "http://localhost:8080/movies"

function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
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
    cell.innerHTML = movie.genre

    //Update knap, sender kommune til PUT
    cell = row.insertCell(cellCount++)
    let pbUpdate = document.createElement("button")
    pbUpdate.textContent = "Opdater"
    pbUpdate.className = "buttonupdate"
    pbUpdate.addEventListener('click', function () {
        console.log("hej")
    })
    cell.appendChild(pbUpdate)
}

actionFetchMovies()