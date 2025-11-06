class Animal {
  private name: string;
  private type: string;
  private age: number;

  constructor(name: string, type: string, age: number) {
    this.name = name;
    this.type = type;
    this.age = age;
  }

  printName() {
    console.log(this.name);
  }
  // this.printName() {
  // }
}

class Dog extends Animal {
  private breed: string;
  constructor(name: string, type: string, age: number, breed: string) {
    super(name, type, age);
    this.breed = breed;
  }
}

const myDog = new Dog("palo", "dog", 23, "mieszaniec");

console.log(myDog);
//@ts-expect-error intentional
myDog.breed = "sialalala"; // ts error

console.log(myDog);

class SecureDog extends Animal {
  #breed: string;
  constructor(name: string, type: string, age: number, breed: string) {
    super(name, type, age);
    this.#breed = breed;
  }
}

class Dog2 extends Animal {
  // Use '#' for the private property in the subclass as well
  #breed: string;

  constructor(name: string, type: string, age: number, breed: string) {
    super(name, type, age);
    this.#breed = breed;
  }

  getBreed(): string {
    return this.#breed;
  }
}

const myDog2 = new Dog2("palo", "dog", 23, "mieszaniec");

console.log(myDog);
// Now, if you try to do this, you will get a hard error at RUNTIME.
// myDog.#breed = 'sialalala'; // SyntaxError: Private field '#breed' must be declared in an enclosing class

// You can't even access it:
// console.log(myDog.#breed); // Also a SyntaxError3

// The only way to get the value is through the public method you provided:
console.log(myDog2.getBreed()); // Output: mieszaniec

/*
 * If we want to be absolutely sure that that our private field is secure not only by leveraging
 *  ts error logging, but triggering a runtime js error we need to use #
 *  A feature that is part of the JavaScript language itself, not just TypeScript. This feature
 *  is called Private Class Fields, and it uses a hash/pound symbol (#) prefix.
 This # syntax tells the JavaScript engine itself to make the field private and enforce it at runtime.
 * */

const ClassesRecap = () => {
  return <>ClassesRecap</>;
};

export default ClassesRecap;
