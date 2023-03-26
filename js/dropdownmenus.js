/*Movies Dropdown Menu*/
const xhttp_movies = new XMLHttpRequest();
let dropdownmenus = document.getElementsByClassName("movie");

let movies;
xhttp_movies.onreadystatechange = function () {
    for (let i = 0; i < dropdownmenus.length; i++) {
        console.log('this.status', this.status);
        if (this.readyState === 4 && this.status === 200) {
            movies = JSON.parse(xhttp_movies.responseText);
            movies.forEach(movie => {
                const option = document.createElement("option");
/*
                console.log('movie', movie)
*/
                option.value = movie.movieId;
                option.textContent = movie.title;
                dropdownmenus[i].appendChild(option);
            });
        }
    }
};


xhttp_movies.open("GET", "http://localhost:8080/api/v1/movies", true);
xhttp_movies.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
xhttp_movies.send();

const ddMovieForm = document.getElementById("ddMoviesForm")

ddMovieForm.addEventListener("submit", function (e) {
    e.preventDefault();
    removeElements('temp_options');

    let body = {"movieId": document.getElementById('movies').value};
    console.log(body)

    const xhttp_screenings = new XMLHttpRequest();
    let dd_screenings = document.getElementsByClassName("screening");

    let screenings;
    xhttp_screenings.onreadystatechange = function () {
        for (let i = 0; i < dd_screenings.length; i++) {
            console.log('this.status', this.status);
            if (this.readyState === 4 && this.status === 200) {
                screenings = JSON.parse(xhttp_screenings.responseText);
                console.log(screenings);
                screenings.forEach(screening => {
                    const option = document.createElement("option");
                    option.className = "temp_options"
                    const values = {values: {
                        'numberOfRows': screening.auditorium.numberOfRows,
                        'seatingCapacity': screening.auditorium.seatingCapacity,
                        'ticketPrice': screening.ticketPrice
                    }}
                    console.log(values);
                    option.value = JSON.stringify(values);
                    console.log(option.value);
                    option.textContent = screening.startTime;
                    dd_screenings[i].appendChild(option);
                });
            }
        }
    };


    xhttp_screenings.open("POST", "http://localhost:8080/api/v1/dd/screenings", true);
    xhttp_screenings.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    xhttp_screenings.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp_screenings.send(JSON.stringify(body));
})

function removeElements(param) {
    let get = document.querySelectorAll('.'+param+'');
    get.forEach(element => {
        element.remove();
    });
}