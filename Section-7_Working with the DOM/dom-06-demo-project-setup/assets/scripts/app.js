const addMoviebutton = document.querySelector("header button");
const modal = document.getElementById("add-modal");
const backDrop = document.getElementById("backdrop");
const cancelModal = document.querySelector(".modal__actions");

cancelModal.addEventListener("click", () => {
  toggleModal();
  showBackDrop();
});

addMoviebutton.addEventListener("click", () => {
  toggleModal();
  showBackDrop();
});

function showBackDrop() {
  backDrop.classList.toggle("visible");
}

function toggleModal() {
  modal.classList.toggle("visible");
}
