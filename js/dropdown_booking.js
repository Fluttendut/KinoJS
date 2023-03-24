const xhttp = new XMLHttpRequest();
let dd_movies = document.getElementsByClassName("movie");
/*
let dd_screenings = document.getElementById("screenings");
*/

let movies;
console.log("vi ved starten af functionen!")
xhttp.onreadystatechange = function() {
    for (let i = 0; i < dd_movies.length; i++) {
        console.log('this.status', this.status);
        if (this.readyState === 4 && this.status === 200) {
            movies = JSON.parse(xhttp.responseText);
            movies.forEach(movie => {
                const option = document.createElement("option");
                console.log('movie',movie)
                option.value = movie.movieId;
                option.textContent = movie.title;
                dd_movies[i].appendChild(option);
            });
/*            const countryData = movies.find(
                movie => elements_movies[i].value === movie.alpha2Code
            );*/
        }
    }
};


xhttp.open("GET", "http://localhost:8080/api/v1/movies", true);
xhttp.setRequestHeader('Authorization', 'Bearer '+ sessionStorage.getItem('token'));
xhttp.send();