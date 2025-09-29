_min max w tailwind_
- min(10px,100%)
- max(10px,100%)
- koniecznie bez spacji!

_Outline i nesting wszystkich elementów na stronie_

_, _::before, \*::after {
outline: 2px solid lime;
background: hsl(0 100% 50% / .1);
}

\*\*

md:grid-cols-[repeat(23,calc((100%-140px)/8))]
md:grid-cols-[repeat(20,20px)]

- kiedy grid sie nie zgadza czasem wystarczy dodac do niego gap

_test locally on mobile_
ipconfig getifaddr en0

http:192.168.31.142

_Rozkminki_

const p = new Promise((resolve, reject) => {
{
// resolve(1)
// resolve(2)
// reject(3)
}
})

p.then(console.log).catch(console.log)
// const data = p.then(d => console.log(d))
// console.log(data)

// max + repeat + cols
md:grid-cols-[repeat(5,max(416px,calc((100vw-256px)/5)))]


### HIDE ELEMENTS WITH ANIMATION TO 0 ###

**parent element**
`grid `,
open ? `grid-rows-[1fr] ` : `grid-rows-[0fr]`
 
**child**
- overflow: hidden;
