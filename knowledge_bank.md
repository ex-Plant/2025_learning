*min max w tailwind*
- min(10px,100%)
- max(10px,100%)
- koniecznie bez spacji!

*Outline i nesting wszystkich elementów na stronie*
 
*, *::before, *::after {
outline: 2px solid lime;
background: hsl(0 100% 50% / .1);
}

**


md:grid-cols-[repeat(23,calc((100%-140px)/8))]
md:grid-cols-[repeat(20,20px)]

- kiedy grid sie nie zgadza czasem wystarczy dodac do niego gap 



Check time of execution  of something 	
Console.time
console.timeend


type TimeoutId = ReturnType<typeof setTimeout>
const t = useRef<TimeoutId | null>(null)

useEffect(() => {
if (t.current) {
clearTimeout(t.current)
}

    t.current = setTimeout(() => {
      console.log('')
    }, 500)
}, [])  
