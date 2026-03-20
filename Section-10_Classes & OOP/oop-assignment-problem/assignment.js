class Course {
  // Dichiaro il campo privato subito
  #price;
  constructor(title = "DEFAULT", length = 0, price = 0) {
    this.title = title;
    this.length = length;
    this.price = price;
  }
  get price() {
    return `\$${this.#price}`;
  }

  set price(value) {
    if (value > 0) {
      this.#price = value;
    } else {
      console.warn("Il prezzo deve essere maggiore di zero. Impostato a 0.");
      this.#price = 0; // Fallback di sicurezza
    }
  }

  lengthPriceCalculator() {
    if (this.#price === 0) {
      return this.length; //Restituisco solo i minuti
    }
    return `Minutes per dollar: ${(this.length / this.#price).toFixed(2)}$`;
  }

  courseSummary() {
    const courseText = `This course is about ${this.title}, it's length is ${this.length} minuts, and the price is ${this.price}$`;
    return courseText;
  }
}

const course1 = new Course("Javascript", 20, 39.99);
const course2 = new Course("React", 120, 59.99);

console.log(course1, course2);
console.log(course1.lengthPriceCalculator());
console.log(course2.lengthPriceCalculator());
console.log(course1.courseSummary());
console.log(course2.courseSummary());

// Assignment 3

class PracticalCourse extends Course {
  constructor(title, length, price, numOfExercises = 0) {
    super(title, length, price);
    this.numOfExercises = numOfExercises;
  }
}
class TheoreticalCourse extends Course {
  constructor(title, length, price) {
    super(title, length, price);
  }
  publish() {
    console.log("I'm the TheoreticaCourse that extends Course");
  }
}

const newCourse1 = new PracticalCourse("PHP", 150, 19.99, 25);
console.log(newCourse1);
const newCourse2 = new TheoreticalCourse();
newCourse2.publish();
console.log(newCourse1.price);
console.log(newCourse2.price);
