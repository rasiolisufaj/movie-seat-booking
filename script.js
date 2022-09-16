const containerElement = document.querySelector(".container");
const availableSeats = document.querySelectorAll(".row .seat:not(.occupied)");
const selectElement = document.getElementById("movie");
let countElement = document.getElementById("count");
let totalPriceElement = document.getElementById("total-price");
let ticketPrice = +selectElement.value;

/* Seat state initialization

const seats = [];
for(let i = 0; i< SEAT_NUMER; i++){
  let seat =  {
    seatId: i,
    isOcuppied: false,
    isSelected: false,
    price: 100
  }
  seats.push(seat);

  //Create seats UI by Js
  const created Element = document.create(div);
  createElement.id = i;
}


*/

// Update count and total
updateSeatAndPrice = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  let count = selectedSeats.length;
  let price = count * ticketPrice;
  countElement.innerText = count;
  totalPriceElement.innerText = price;
};

// Seat Selecting
containerElement.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSeatAndPrice();
  }
});

// Price Updating
selectElement.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSeatAndPrice();
});
