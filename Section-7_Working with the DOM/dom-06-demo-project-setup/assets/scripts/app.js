const addMoviebutton = document.querySelector("header button");
const modal = document.getElementById("add-modal");
const backDrop = document.getElementById("backdrop");
const cancelModal = document.querySelector(".modal__actions .btn--passive");
const addButton = document.querySelector(".modal__actions .btn--success");

// Logic of showing and removing modal and backdrop
cancelModal.addEventListener("click", () => {
  toggleModal();
  showBackDrop();
});

addMoviebutton.addEventListener("click", () => {
  toggleModal();
  showBackDrop();
});

backDrop.addEventListener("click", ()=>{
  toggleModal();
  showBackDrop();
});

addButton.addEventListener("click", ()=>{
  addMovie();
})

function showBackDrop() {
  backDrop.classList.toggle("visible");
}

function toggleModal() {
  modal.classList.toggle("visible");
}

function addMovie(){
  alert("Il film è stato aggiunto con successo!");
  toggleModal();
  showBackDrop();
}
