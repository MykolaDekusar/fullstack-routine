const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");
const movieList = document.getElementById("movie-list");

const movies = [];

const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;
  if (
    title.trim() === "" ||
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    alert("Invalid inputs, fill all camps");
    return;
  }
  // Creiamo l'oggetto movie con i dati inseriti dall'utente
  const newMovie = {
    id: Math.random(),
    info: {
      title,
      [extraName]: extraValue,
    },
  };
  movies.push(newMovie);
  console.log(movies);
  renderMovies();
};

const renderMovies = () => {
  movieList.innerHTML = ''; // Non è ideale perche andiamo a pulire tutta la lista e aggiungerci di nuovo tutti i film
  movieList.classList.add("visible");
  movies.forEach((movie) => {
    console.log(movie);
    const li = document.createElement("li");
    li.innerHTML = `<h2>${movie.info.title}</h2>`;
    movieList.appendChild(li);
  });
};

addMovieBtn.addEventListener("click", addMovieHandler);
