class UserBuilder {
  constructor() {
    this.data = {};
  }
  setName(name) {
    this.data.name = name;
    return this; // chainable
  }
  setAge(age) {
    this.data.age = age;
    return this;
  }
  build() {
    return { ...this.data };
  }
  a;
}

const user = new UserBuilder().setName("Konrad").setAge(10).build();
console.log("test.js:19 - user:", user);
