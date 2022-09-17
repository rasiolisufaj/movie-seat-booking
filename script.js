const containerElement = document.querySelector(".container");
const availableSeats = document.querySelectorAll(".row .seat");
const selectElement = document.getElementById("movie");
const reserveButton = document.getElementById("reserve-btn");
let countElement = document.getElementById("count");
let totalPriceElement = document.getElementById("total-price");

populateUI();

let ticketPrice = +selectElement.value;

// Set Movie Data
setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("moviePrice", moviePrice);
};

// Update count and total
function updateSeatAndPrice() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  let count = selectedSeats.length;
  countElement.innerText = count;
  totalPriceElement.innerText = count * ticketPrice;

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

// Update Occupied Seats
function reserveSeats() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    availableSeats.forEach((item, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        item.classList.add("occupied");
      }
    });
  }
}

// Price Updating
selectElement.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSeatAndPrice();
});

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

// Reserve Button
reserveButton.addEventListener("click", (e) => {
  reserveSeats();
});

// Update Selected Count
updateSeatAndPrice();
