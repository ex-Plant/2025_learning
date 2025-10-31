**Simple slide in animation**

`@keyframes slideUp {
0% {
opacity: 0;
transform: translateY(20px);
}

100% {
opacity: 1;
transform: translateY(0);
}
}

.animate-slide {
animation: slideUp 0.6s ease-in forwards;
animation-delay: 0.2s;
}`

`forwards is animation-fill property controling what happens after animation ends `
animation-fill-mode: forwards;      /* Keep last keyframe after animation */
animation-fill-mode: backwards;     /* Apply first keyframe before animation starts */
animation-fill-mode: both;          /* Both forwards and backwards */
animation-fill-mode: none;          /* Default, no retention */


*animation-direction*
normal (default): Animation plays from start to end (from 0% to 100% keyframes).
reverse: Animation plays from end to start (from 100% to 0% keyframes).
alternate: Animation alternates direction each cycle—first forward (0% to 100%), then backward (100% to 0%), and so on.
alternate-reverse: Animation alternates direction each cycle, but starts in reverse—first backward (100% to 0%), then forward (0% to 100%), etc.


*animation property values*
animation: [name] [duration] [timing-function] [delay] [iteration-count] [direction] [fill-mode] [play-state];
