const addMoviebutton = document.querySelector("header button");
const modal = document.getElementById("add-modal");
//let modalManager = false;

addMoviebutton.addEventListener("click", () => {
  // Possiamo usare questo modo
  // if (!modalManager) {
  //   modal.classList.add("visible");
  //   modalManager = true;
  // } else {
  //   modal.classList.remove("visible");
  //   modalManager = false;
  // }
  // Oppure il .toggle()
  modal.classList.toggle('visible');
});
