let totalSeatsInRows = [7, 7, 5, 6, 4, 1, 7, 7, 7, 7, 7, 3];
let total = totalSeatsInRows.reduce((a,b) => a+b);
let availableSeatsInRows = [...totalSeatsInRows];
let totalAvailableSeats = totalSeatsInRows.reduce((a,b) => a+b);
// console.log(totalAvailableSeats);

document.addEventListener('DOMContentLoaded', () => {
    let seatContainer = document.getElementById("seat-container");
    let seatNumber = 1;
    availableSeatsInRows.forEach( (row) => {
        let rowDiv = document.createElement("div");
        for (let index=1; index <= row; index++) {
            let seat = document.createElement("span");
            seat.className = "seat available";
            seat.innerHTML = seatNumber;
            seatNumber++;
            rowDiv.appendChild(seat);
        }
        seatContainer.appendChild(rowDiv);
    })
    //binding the click event for booking button
    document.getElementById('book-btn').addEventListener('click', bookSeat)
})

function bookSeat() {
    let quantityInput = document.getElementById('quantity');
    let quantity = Number(quantityInput.value);
    if (quantity < 1 || quantity > 7)
        alert("Number of seats should be between 1 and 7");
    else if (quantity > totalAvailableSeats) 
        alert(`${totalAvailableSeats} seats are available`);
    else {
        debugger;
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
    debugger;
    while (quantity > 0 && seatIndex < total) {
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
    let index1 = totalSeatsInRows.slice(0,rowIndex)
    if(index1.length) {
        index1 = index1.reduce((a,b) => a+b);
    }
    let index2  = totalSeatsInRows[rowIndex] - availableSeats;
    return index1+index2;
}
