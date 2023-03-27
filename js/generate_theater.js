const ddScreeningForm = document.getElementById("ddScreeningForm");
ddScreeningForm.addEventListener("submit", function (e) {
    e.preventDefault();
    removeElements('seat');
    removeElements('row');
    removeElements('screen');
    removeElements('auditorium');


    let data = JSON.parse(document.getElementById('screenings').value);
    console.log(data);
    let auditoriumNumber = data["values"]["auditoriumNumber"];
    let numberOfRows = data["values"]["numberOfRows"];
    let seatingCapacity = data["values"]["seatingCapacity"];
    console.log(numberOfRows, seatingCapacity);
    generateSeatScript(numberOfRows, seatingCapacity, auditoriumNumber)

});


/*Script to generate seats*/
function generateSeatScript(numberOfRows, seatingCapacity, auditoriumNumber) {
    console.log("vi er i genSeatScript!")
    let theater = document.querySelector('.theater');
    let seatsPerRow = seatingCapacity / numberOfRows
    console.log(seatsPerRow)
    let count = seatingCapacity;

    const auditoriumDiv = document.createElement('div');
    auditoriumDiv.innerText = `Auditorium ${auditoriumNumber}`;
    auditoriumDiv.classList.add('auditorium');
    theater.appendChild(auditoriumDiv);

    const screenDiv = document.createElement('div');
    screenDiv.innerText = `Screen`;
    screenDiv.classList.add('screen');
    theater.appendChild(screenDiv);

    for (let row = 1; row <= numberOfRows; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        if (count > 0) {
            for (let col = 1; col <= seatsPerRow; col++) {
                const seatDiv = document.createElement('div');
                seatDiv.classList.add('seat');
                seatDiv.setAttribute('data-seatnumber', `${row}${col}`);
                seatDiv.setAttribute('data-rownumber', `${row}`);
                /*
                                                            seatDiv.innerText = `${row}${col}`;
                */
                count--
                /*console.log(count)*/

                rowDiv.appendChild(seatDiv);
            }
        }

        theater.appendChild(rowDiv);
    }
}