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
    getFormattedTitle: function () {
      return this.info.title.toUpperCase();
    },
  };
  movies.push(newMovie);
  //console.log(movies);
  renderMovies();
  console.log(newMovie.getFormattedTitle());
};

const renderMovies = (filterTerm = "") => {
  movieList.innerHTML = ""; // Non è ideale perche andiamo a pulire tutta la lista e aggiungerci di nuovo tutti i film
  if (movies.length) {
    movieList.classList.add("visible");
  } else {
    movieList.classList.remove("visible");
  }
  // Filter functionality
  const filteredMovies = !filterTerm
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filterTerm));
  //console.log(filteredMovies);
  filteredMovies.forEach((movie) => {
    // Possiamo anche verificare se esiste una chiave nell'oggetto
    if (!("info" in movie)) {
      console.log("Non esiste la chaive info dentro i movie");
    }
    // Oppure abbiamo un altro modo
    if (movie.info === undefined) {
      console.log("Non esiste la chiave info dentro i movie");
    }
    // Destructuring of object
    // Deve avere lo stesso nome della chiave dell'object
    const { info } = movie;
    // Possiamo anche assegnarli un nome diverso
    const { title: movieTitle } = info;

    const li = document.createElement("li");
    let text = "";
    for (const key in info) {
      if (key !== "title") {
        text += ` ${key}: ${info[key]}`;
      }
    }
    // Possiamo anche prendere il metodo da un oggetto
    let { getFormattedTitle } = movie;
    // Poi usando .bind() gli possiamo dire a cosa si deve riferire this
    // return this.info.title.toUpperCase();
    // getFormattedTitle= getFormattedTitle.bind(movie);
    // Oppure possiamo use .call(movie) in questo caso
    // Se .bind() prepara una funzione per il futuro .call() la esegue ma con i dati che gli passiamo
    // .call() è utile per modificare a cosa si riferisce this
    // Abbiamo anche .apply() pero prende meno argomenti
    li.innerHTML = `<h3>${getFormattedTitle.call(movie)}${text}</h3>
    `;
    movieList.appendChild(li);
  });
};
//The browser binds "this" for you (on event listeners)
// to the DOM element that triggered the event
// ONLY FOR NORMAL FUNCTIONS, NO ARROW FUNCTIONS
const searchMovieHandler = function () {
  console.log(this);//<button id="search-btn"> in this case 
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};
// Arrow functions don't bind "this" to anything
const searchMovieHandler2 = () => {
  console.log(this);//Window in this case 
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler2);
