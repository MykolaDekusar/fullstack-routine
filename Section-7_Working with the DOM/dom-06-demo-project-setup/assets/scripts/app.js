const addMoviebutton = document.querySelector("header button");
const modal = document.getElementById("add-modal");
const backDrop = document.getElementById("backdrop");
const cancelModal = document.querySelector(".modal__actions .btn--passive");
const addButton = document.querySelector(".modal__actions .btn--success");
const addMovieToList = document.getElementById("movie-list");
const movieSection = document.getElementById("entry-text");
// Selecting user inputs
const userInputs = modal.querySelectorAll("input");

const movieList = [];

// Logic of showing and removing modal and backdrop
cancelModal.addEventListener("click", () => {
  toggleModal();
  showBackDrop();
  clearUserInput();
});

addMoviebutton.addEventListener("click", () => {
  toggleModal();
  showBackDrop();
});

backDrop.addEventListener("click", () => {
  clearUserInput();
  toggleModal();
  showBackDrop();
});

addButton.addEventListener("click", () => {
  addMovie();
});

function showBackDrop() {
  backDrop.classList.toggle("visible");
}

function toggleModal() {
  modal.classList.toggle("visible");
}
// Logic for user input validation and storage
function addMovie() {
  const movieTitle = userInputs[0].value;
  const movieImage = userInputs[1].value;
  const movieRating = userInputs[2].value;

  if (movieTitle && movieImage && +movieRating >= 1 && +movieRating <= 5) {
    movieList.push({ movieTitle, movieImage, movieRating });
    alert("Il film è stato aggiunto con successo!");
    toggleModal();
    showBackDrop();
    createMovieCard(movieTitle, movieImage, movieRating);
  } else {
    alert("Inserisci valori validi, il rating deve essere tra 1 e 5");
    return;
  }
}

function clearUserInput() {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
}

function createMovieCard(title, image, rating) {
  if (movieList.length) {
    movieSection.classList.add("hide");
    const newMovieElement = document.createElement("li");
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
    <div class='movie-element__info'>
      <h2>Title: ${title}</h2>
      <p>Rating: ${rating}\\5 stars</p>
    </div>
    <div class='movie-element__image'>
      <img src = '${image}' alt = '${title}'>
    </div>`;
    addMovieToList.appendChild(newMovieElement);
  }
}
