document.addEventListener('DOMContentLoaded', () => {
    let seatContainer = document.getElementById("seat-container");
    for (let seatNumber = 1; seatNumber <= 80; seatNumber++) {
        let seat = document.createElement("span");
        seat.className = "seat available";
        seat.innerHTML = seatNumber;
        seatContainer.appendChild(seat);
    }
    //binding the click event for booking button
    document.getElementById('book-btn').addEventListener('click', bookSeat)
})

let availableSeatsInRows = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3];
let totalAvailableSeats = 80;

function bookSeat() {
    let quantityInput = document.getElementById('quantity');
    let quantity = Number(quantityInput.value);
    if (quantity < 1 || quantity > 7)
        alert("Number of seats should be between 1 and 7");
    else if (quantity > totalAvailableSeats) 
        alert(`${totalAvailableSeats} seats are available`);
    else {
        let seatContainer = document.getElementById("seat-container");
        let seats = seatContainer.querySelectorAll('span');
        let allocatedSeats = [];
        let rowIndex;
        let seatIndex;

        //book the row which has exact number of availalbe seats as quantity 
        if (availableSeatsInRows.includes(quantity)) {
            rowIndex = availableSeatsInRows.indexOf(quantity);
            seatIndex = findSeatindex(rowIndex, availableSeatsInRows[rowIndex])
            allocatSeats(rowIndex, seatIndex, seats, quantity, allocatedSeats)
        }
        else {
            //finding the row which has next greater number of avaialble seats than quantity
            [...availableSeatsInRows].sort().forEach((availableSeats) => {
                if (availableSeats > quantity)
                    if (rowIndex === undefined)
                        rowIndex = availableSeatsInRows.indexOf(availableSeats);
            })
            if (rowIndex !== undefined) {
                seatIndex = findSeatindex(rowIndex, availableSeatsInRows[rowIndex])
                allocatSeats(rowIndex, seatIndex, seats, quantity, allocatedSeats)
            }
            else {
                //iterate each rows and allocate the seats if possible
                for (rowIndex = 0; rowIndex < availableSeatsInRows.length && quantity > 0; rowIndex++) {
                    let availableSeats = availableSeatsInRows[rowIndex];
                    if (availableSeats !== 0) {
                        seatIndex = findSeatindex(rowIndex, availableSeats)
                        if (quantity > availableSeats)
                            allocatSeats(rowIndex, seatIndex, seats, availableSeats, allocatedSeats)
                        else
                            allocatSeats(rowIndex, seatIndex, seats, quantity, allocatedSeats)
                        quantity = quantity - availableSeats;
                    }
                }
            }
        }
        alert(`Confirmed seats are ${[...allocatedSeats]}`);
    }
    quantityInput.value ="";
}

function allocatSeats(rowIndex, seatIndex, seats, quantity, allocatedSeats) {
    while (quantity > 0 && seatIndex < 80) {
        if (seats[seatIndex].className === 'seat available') {
            seats[seatIndex].className = 'seat occupied';
            availableSeatsInRows[rowIndex]--;
            totalAvailableSeats--;
            allocatedSeats.push(seatIndex + 1);
            quantity--;
        }
        seatIndex++;
    }
}

function findSeatindex(rowIndex, availableSeats) {
    return (rowIndex === availableSeatsInRows.length - 1 ? 80 - availableSeats : rowIndex * 7 + 7 - availableSeats)
}
