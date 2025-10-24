class Person {
  constructor(name, surname) {
    this.name = name
    this.surname = surname;
  }
}

const man = new Person("Konrad", "Antonik");

console.log(man)

for (let key in man) {
  console.log(key)
  //name
 // surname
}


// for (let item of man) {
//   console.log(key)
// ❌ Error
// }


for (let value of Object.values(man)) {
  console.log(value, '123')
  //Konrad 123
  // Antonik 123
}

for (let value of Object.keys(man)) {
  console.log(value )
  //name
  // surname
}

// logs indexes
for (let value in Object.keys(man)) {
  console.log(value )
  // 0
  // 1
}
