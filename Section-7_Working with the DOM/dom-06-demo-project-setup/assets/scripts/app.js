const addMoviebutton = document.querySelector("header button");
const modal = document.getElementById("add-modal");
const backDrop = document.getElementById("backdrop");
const cancelModal = document.querySelector(".modal__actions .btn--passive");
const addButton = document.querySelector(".modal__actions .btn--success");
const addMovieToList = document.getElementById('movie-list');
// Selecting user inputs
const userInputs = modal.querySelectorAll("input");

const movieList = [];

// Logic of showing and removing modal and backdrop
cancelModal.addEventListener("click", () => {
  toggleModal();
  showBackDrop();
});

addMoviebutton.addEventListener("click", () => {
  toggleModal();
  showBackDrop();
});

backDrop.addEventListener("click", () => {
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
  console.log(+movieRating >= 1 && +movieRating <= 5);
  if (movieTitle && movieImage && (+movieRating >= 1 && +movieRating <= 5)) {
    movieList.push({ movieTitle, movieImage, movieRating });
    alert("Il film è stato aggiunto con successo!");
    console.log(movieList[0]);
    toggleModal();
    showBackDrop();
  } else {
    alert("Inserisci valori validi, il rating deve essere tra 1 e 5");
    return;
  }
}
