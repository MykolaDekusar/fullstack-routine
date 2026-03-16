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
  //console.log(movies);
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
  //console.log(filteredMovies);
  filteredMovies.forEach((movie) => {
    // Possiamo anche verificare se esiste una chiave nell'oggetto
    if(!('info' in movie)){
      console.log("Non esiste la chaive info dentro i movie");
    }
    // Oppure abbiamo un altro modo
    if(!(movie.info === undefined)){
      console.log("Non esiste la chaive info dentro i movie");
    }
    // Destructuring of object
    // Deve avere lo stesso nome della chiave dell'object 
    const {info} = movie;
    // Possiamo anche assegnarli un nome diverso
    const {title: movieTitle} = info;
    const li = document.createElement("li");
    let text = "";
    for (const key in info) {
      if (key !== "title") {
        text += ` ${key}: ${info[key]}`;
      }
    }
    li.innerHTML = `<h3>${movieTitle}<span> - ${text}</span></h3>
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
