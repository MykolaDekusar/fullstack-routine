class Course {
  constructor(title, length, price) {
    if(title && length > 0 && price)
    this.title = title;
    this.length = length;
    this.price = price;
  }

  lengthPriceCalculator (){
    if(this.price === 0){
      return this.length;
    }
    return `Minutes per dollar: ${(this.length / this.price).toFixed(2)}$`;
  } 

  courseSummary(){
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