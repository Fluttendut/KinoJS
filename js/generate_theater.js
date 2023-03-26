const ddScreeningForm = document.getElementById("ddScreeningForm");
ddScreeningForm.addEventListener("submit", function (e) {
    e.preventDefault();
    removeElements('temp_seats');
    removeElements('temp_rows');


    let data = document.getElementById('screenings').value;
    console.log(data);
/*    let numberOfRows = data.values.numberOfRows;
    let seatingCapacity = data.values.seatingCapacity;
    console.log(numberOfRows,seatingCapacity);*/
        generateSeatScript(2,16)

});


/*Script to generate seats*/
function generateSeatScript(numberOfRows, seatingCapacity) {
    let theater = document.querySelector('.theater');
    let seatsPerRow = seatingCapacity/numberOfRows

    for (let row = 1; row <= numberOfRows; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        for (let col = 1; col <= seatsPerRow; col++) {
            const seatDiv = document.createElement('div');
            seatDiv.classList.add('seat');
            seatDiv.setAttribute('data-seatnumber', `${row}${col}`);
            seatDiv.setAttribute('data-rownumber', `${row}`);
/*
            seatDiv.innerText = `${row}${col}`;
*/

            rowDiv.appendChild(seatDiv);
        }

        theater.appendChild(rowDiv);
    }
}