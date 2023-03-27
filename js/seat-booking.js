const theater = document.querySelector('.theater');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const screeningSelect = document.getElementById('screenings');
let ticketPrice;

ddScreeningForm.addEventListener("submit", function (e) {
    let data = JSON.parse(screeningSelect.value);
    console.log(data);
    ticketPrice = data["values"]["ticketPrice"];
})

/*populateUI();*/

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    //copy selected seats into arr
    // map through array
    //return new array of indexes

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    if (isNaN(selectedSeatsCount * ticketPrice))
        total.innerText = 0;
    else
        total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localstorage and populate ui
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        screeningSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
screeningSelect.addEventListener('change', (e) => {
    console.log("vi er i movieSelectEvent!")
    ticketPrice = +e.target.value;
    console.log(ticketPrice)
    setMovieData(e.target.selectedIndex, e.target.value);
    localStorage.clear()
    updateSelectedCount();
});

// Seat click event
theater.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// intial count and total
/*
updateSelectedCount();*/
