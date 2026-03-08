// Selezioniamo tutti gli elementi li
// Questo è il metodo piu moderno
const listElements = document.querySelectorAll('li'); 

// Abbiamo anche un altro modo
// Questo metodo pero ci da una lista live che riflette i cambiamenti
const lElements = document.getElementsByTagName('li');

// Poi possiamo ciclare su di essi lavorandoci sopra

for( const listEl of listElements){
  console.log(listEl);
}
for( const listEl of lElements){
  console.log(listEl);
}
