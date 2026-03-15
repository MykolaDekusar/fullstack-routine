const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');



const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;
  if(title.trim() === '' || extraName.trim() === '' || extraValue.trim() === ''){
    alert("Invalid inputs, fill all camps");
    return;
  }
  // Creiamo l'oggetto movie con i dati inseriti dall'utente
  const newMovie = {
    title,
    extraName,
    extraValue
  }
};