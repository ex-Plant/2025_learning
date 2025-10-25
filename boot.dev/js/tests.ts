// // Using type inference (flexible but might miss errors)
// const colors = {
//   red: "#FF0000",
//   green: "#00FF00",
//   blue: "#0000FF",
//   yelow: "#FFFF00",
// };
//
// type ColorMap = {
//   red: "#FF0000";
//   green: string;
//   blue: string;
//   yellow: string;
// };
//
// const colorsTyped: ColorMap = {
//   red: "#FF0000",
//   green: "#00FF00",
//   blue: "#0000FF",
//   // Error: "yelow" is not in type ColorMap
//   yelow: "#FFFF00",
// };
// // RedHex is any 'string'
// // where it used to be the literal "#FF0000"
//
// type RedHex = typeof colors.red;
//
//
// const colorsSatisfies = {
//   red: "#FF0000",
//   green: "#00FF00",
//   blue: "#0000FF",
//   yellow: "#FFFF00",
//   // Error: "yelow" is not in type ColorMap
//   // yelow: "#FFFF00"
// } as const satisfies <ColorMap>;
//
// // We keep the literal types!
// type RedHexSatisfies = typeof colorsSatisfies.red; // "#FF0000"
//
// const test1: RedHex = 'any string' // no error
// const test2: RedHexSatisfies = 'any string' //  error
