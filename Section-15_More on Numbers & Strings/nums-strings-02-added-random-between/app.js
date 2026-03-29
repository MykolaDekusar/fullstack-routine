// Generiamo un numero a caso tra un Min/Max
function randomMinMax(min, max) {
  console.log(Math.floor(Math.random() * (max - min + 1) + min));
}
const btn = document.getElementById("random");

btn.addEventListener("click", () => {
  randomMinMax(1, 5);
});
