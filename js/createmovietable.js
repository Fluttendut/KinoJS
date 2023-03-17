console.log("vi er i create table")

const pbCreateTable = document.getElementById("pbCreateTable")
const tblMovies = document.getElementById("tblMovies")

function createTable(movie) {

    let cellCount = 0
    let rowCount = tblMovies.rows.length
    let row = tblMovies.insertRow(rowCount)
    row.id = movie.title;

    let cell = row.insertCell(cellCount++)
    cell.innerHTML = movie.genre

    cell = row.insertCell(cellCount++)
    cell.innerHTML = movie.length

    cell = row.insertCell(cellCount++)
    cell.innerHTML = movie.rating

    cell = row.insertCell(cellCount++)
    cell.innerHTML = movie.ageRestriction

    //Delete knap, sender movie til DELETE
    cell = row.insertCell(cellCount++)
    let pbDelete = document.createElement("button")
    pbDelete.textContent = "Delete"
    pbDelete.className = "buttondelete"
    pbDelete.addEventListener('click', function () {
        const rowdel = document.getElementById(movie.title)
        rowdel.remove();
        deleteMovie(movie)
    })
    cell.appendChild(pbDelete)

}

async function deleteMovie(movie) {
    console.log("slet movie: " + movie.title)
}

async function updateMovie(movie) {
    console.log(movie)
    const response = await restUpdateMovie(movie)
    console.log(response)
}

async function restUpdateMovie(movie) {
    const url = "http://localhost:8080/movies/" + movie.title;
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: ""
    }
    fetchOptions.body = JSON.stringify(movie);
    //calls backend and wait for return
    const response = await fetch(url, fetchOptions);
    console.log(response);
    if (!response.ok) {
        console.log("Update failed");
    }
    return response;
}

function actionCreateTable() {
    lstMovies.forEach(createTable)
}

pbCreateTable.addEventListener('load', actionCreateTable)
