function printPrimes(max) {
  for (let i = 0; max >= i; i++) {

    if (i === 2 ) {
      console.log(i)
      continue
    }

    if (i % 2 === 0) continue

    let isAPrime = true

    // start with 3 as this is the minimum
    for (let j = 3;  j * j  <= i; j+=2) {

      //this means it is not a prime number we want to break this check and update isAPrime flag
      if (i % j === 0) {
        isAPrime = false
        break
      }
    }

    if (isAPrime) console.log(i)
  }
}

printPrimes(20);
