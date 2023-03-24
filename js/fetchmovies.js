const urlMovies = "http://localhost:8080/api/v1/movies"

async function fetchAny(url) {
    console.log(url)
    let options = {
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            "Content-Type": "application/json"
        },
        mode: 'cors'
    };
    console.log(options)
    return await fetch(url, options)
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                throw Error(res.statusText)
            }
        })
}


async function actionFetchMovies() {
    await fetchAny(urlMovies)
        .then((r) => {
            console.log(r)
            r.forEach(showMovie)
        })
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
    pbUpdate.className = "btn btn-primary" /*buttonupdate*/
    pbUpdate.addEventListener('click', function () {
        //window.location.href = "editmovie.html"
        window.location.href = `editmovie.html?title=${movie.title}&genre=${movie.genre}&length=${movie.length}&rating=${movie.rating}&ageRestriction=${movie.ageRestriction}&movieId=${movie.movieId}`
    })
    cell.appendChild(pbUpdate)

    //Delete movie
    cell = row.insertCell(cellCount++)
    let pbDelete = document.createElement("button")
    pbDelete.textContent = "Delete"
    pbDelete.className = "btn btn-primary" /*buttondelete*/
    pbDelete.addEventListener('click', function () {
        const rowdel = document.getElementById(movie.title)
        rowdel.remove();
        restDeleteMovie(movie)
    })
    cell.appendChild(pbDelete)

}

async function restDeleteMovie(movie) {
    const url = "http://localhost:8080/api/v1/deleteMovie/" + movie.title;
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

actionFetchMovies();

function searchFunction() {
    // Declare variables
    var input, filter, table, tr, th, i, txtValue;
    input = document.getElementById("inpSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("tblMovies");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        th = tr[i].getElementsByTagName("td")[0];
        if (th) {
            txtValue = th.textContent || th.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


