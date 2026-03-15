// Objects recap
const person = {
//key: value
  name: 'Nico',
  age: 28,
  hobbies: ['Racing', 'Gaming'],
  greet: function (){
    alert(`Hi there I'm ${this.name}`);
  }
};

person.greet();