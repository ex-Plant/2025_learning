import { say } from 'cowsay'
import { moo } from './moo.js'
console.log(say({
  text: moo('Konrad'),
  e: '^^', // eyes
  T: 'U ', // tongue
  f: 'USA' // name of the cow from cows folder
})
)
