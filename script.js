const containerElement = document.querySelector(".container");
const availableSeats = document.querySelectorAll(".row .seat");
const selectElement = document.getElementById("movie");
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

// Update Selected Count
updateSeatAndPrice();
