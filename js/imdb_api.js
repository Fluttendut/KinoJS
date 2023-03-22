/*async function top250Movies() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3547a3a4e0msh0968d3136499576p110f56jsn0d874f3adb9b',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    };

    return await fetch('https://imdb8.p.rapidapi.com/title/get-top-rated-movies', options)
        .then(response => response.json())
        /!*
                .then(response => console.log(response))
        *!/
        .catch(err => console.error(err));

}*/

/*async function movieDetails(id) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e2c30fe6a9mshda392063ecdec23p1989e5jsn7708d89e1742',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    };

    return await fetch('https://imdb8.p.rapidapi.com/title/get-details?tconst=' + id, options)
        .then(response => response.json())
        /!*        .then(response => console.log(response))*!/
        .catch(err => console.error(err));
}*/


let formSearchIMDB = document.getElementById("formSearchIMDB");
formSearchIMDB.addEventListener("submit", fetchIMDB);


async function searchMovie(searchParam) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3547a3a4e0msh0968d3136499576p110f56jsn0d874f3adb9b',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    };

    return await fetch('https://imdb8.p.rapidapi.com/title/v2/find?title=' + searchParam + '&titleType=movie&limit=20&sortArg=moviemeter%2Casc', options)
        .then(response => response.json())
        /*        .then(response => console.log(response))*/
        .catch(err => console.error(err));
}

async function fetchIMDB() {
    console.log("vi er nu i fetchIMDB")
    event.preventDefault();
    let searchParam = document.getElementById("inpSearchIMDB").value;
    let lastSearch;
    if (localStorage.getItem("lastSearch") !== null) {
        lastSearch = localStorage.getItem("lastSearch")
    }
    if (searchParam !== lastSearch) {
        localStorage.setItem("lastSearch", searchParam)
        let movies = await searchMovie(searchParam)
        localStorage.setItem("movies", JSON.stringify(movies))
        openNewTab();
    }
    else  {
        openNewTab();
    }
}

function openNewTab() {
    console.log("vi er i changeWindow")
    window.open(
        "../html/imdb_api_test.html", "_blank");
    createTableFromSession()
}

function createTableFromSession() {
    console.log("vi er i createTableFromSession")
    let movies = localStorage.getItem("movies")
    movies = JSON.parse(movies)
    console.log(movies)
    let results = movies.results;
    console.log(results)
    return results.forEach(createTableFromIMDB)
}

function createTableFromIMDB(movie) {
    const tblMovieIMDB = document.getElementById("tblMoviesIMDB");
    console.log(tblMovieIMDB)
    let cellCount = 0
    let rowCount = tblMovieIMDB.rows.length
    let row = tblMovieIMDB.insertRow(rowCount)
    row.id = movie.id;

    let cell = row.insertCell(cellCount++)
    /*cell.innerHTML = '<a href="' + 'www.imdb.com' + movie.id + '">' + 'www.imdb.com' + movie.id + '</a>';*/
    cell.innerHTML = movie.title
/*    cell = row.insertCell(cellCount++)
    cell.innerHTML = movie.image.url*/

    //Add Movie
    cell = row.insertCell(cellCount++)
    let pbUpdate = document.createElement("button")
    pbUpdate.textContent = "Link"
    pbUpdate.className = "buttonupdate"
    pbUpdate.addEventListener('click', function () {
        /*
                window.location.href = `addmovie.html?title=${movie.title}&genre=${movie.genre}&length=${movie.length}&rating=${movie.rating}&ageRestriction=${movie.ageRestriction}&movieId=${movie.movieId}`
        */
        window.location.href = `https://www.imdb.com/${movie.id}`
        console.log("Der trykkes på knappen!")
    })
    cell.appendChild(pbUpdate)
}

