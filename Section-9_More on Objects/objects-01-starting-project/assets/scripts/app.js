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

const renderMovies = (filterTerm = "") => {
  movieList.innerHTML = ""; // Non è ideale perche andiamo a pulire tutta la lista e aggiungerci di nuovo tutti i film
  if(movies.length){
      movieList.classList.add("visible");
  } else {
    movieList.classList.remove("visible");
  }
  // Filter functionality
  const filteredMovies = !filterTerm ? movies : movies.filter(movie => movie.info.title.includes(filterTerm));
  console.log(filteredMovies);
  filteredMovies.forEach((movie) => {
    const li = document.createElement("li");
    let text = "";
    for (const key in movie.info) {
      if (key !== "title") {
        text += ` ${key}: ${movie.info[key]}`;
      }
    }
    li.innerHTML = `<h3>${movie.info.title}<span> - ${text}</span></h3>
    `;
    movieList.appendChild(li);
  });
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);
