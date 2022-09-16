const containerElement = document.querySelector(".container");
const availableSeats = document.querySelectorAll(".row .seat:not(.occupied)");
const selectElement = document.getElementById("movie");
let countElement = document.getElementById("count");
let totalPriceElement = document.getElementById("total-price");
let ticketPrice = +selectElement.value;

populateUI();

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

// Set Movie Data
setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("moviePrice", moviePrice);
};

// Update count and total
function updateSeatAndPrice() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  let count = selectedSeats.length;
  let price = count * ticketPrice;
  countElement.innerText = count;
  totalPriceElement.innerText = price;

  // Save Data To Local Storage
  const seatsIndex = [...selectedSeats].map((seat) =>
    [...availableSeats].indexOf(seat)
  );
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}

// Populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    availableSeats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("movieIndex");
  if (selectedMovieIndex !== null) {
    selectElement.selectedIndex = selectedMovieIndex;
  }
}

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
  setMovieData(e.target.selectedIndex, e.target.value);
  ticketPrice = +e.target.value;
  updateSeatAndPrice();
});

// Count and TotalPrice Set
updateSeatAndPrice();
