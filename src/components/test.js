let init = "123+100"
let arr0 = init.split("") // ['S'P'L'I'T'E'D']
let arr1 = [] // [10, X, 3, +, 3, -, 2]
let arr2 = [] // [DO ALL X]
let arr3 = [] // [DO ALL /]
let arr4 = [] // [DO ALL +]

arr0.forEach((e, i) => { // => arr1
  if (arr1.length === 0) arr1.push(e)
  else if (!isNaN(arr0[i - 1]) && !isNaN(e)) arr1[arr1.length - 1] = arr1[arr1.length - 1].concat(e)
  else arr1.push(e)
})

arr1.forEach((e, i) => { // => arr2 // [DO ALL X]
  if (e === "X" && !isNaN(arr1[i - 1]) && !isNaN(arr1[i + 1])) arr2.push(arr1[i - 1] * arr1[i + 1])
  else if (arr1[i - 1] !== "X" && arr1[i + 1] !== "X") arr2.push(e)
})

arr2.forEach((e, i) => { // => arr3 // [DO ALL /]
  if (e === "/" && !isNaN(arr2[i - 1]) && !isNaN(arr2[i + 1])) arr3.push(arr2[i - 1] / arr2[i + 1])
  else if (arr2[i - 1] !== "/" && arr2[i + 1] !== "/") arr3.push(e)
})

arr3.forEach((e, i) => { // => arr4 // [DO ALL +]
  if (e === "+" && !isNaN(arr3[i - 1]) && !isNaN(arr3[i + 1])) arr4.push(arr3[i - 1] + arr3[i + 1])
  else if (arr3[i - 1] !== "+" && arr3[i + 1] !== "+") arr4.push(e)
})

console.log(
  arr4
)