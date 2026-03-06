const task3Element = document.getElementById('task-3');

function empty(){
    alert("I'm an empty function!");
}

function nameOutput(name){
    alert(`Hello, ${name}!`)
}

function stringConcat(string1, string2, string3){
    return string1 + " " + string2 + " " + string3;
}

empty();
nameOutput("Nico");

task3Element.addEventListener("click", empty);

alert(stringConcat("Ciao", "sono,", "Nico!"));