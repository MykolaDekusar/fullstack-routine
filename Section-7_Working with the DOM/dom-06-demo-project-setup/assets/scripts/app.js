const addMoviebutton = document.querySelector("header button");
const modal = document.getElementById("add-modal");
let modalManager = false;

addMoviebutton.addEventListener("click", () => {
  if (!modalManager) {
    console.log("ciao");
    modal.classList.add("visible");
    modalManager = true;
  } else {
    modal.classList.remove("visible");
    modalManager = false;
  }
});
