let init = "12X2-10"
let arr0 = init.split("") // ['S'P'L'I'T'E'D']
let arr1 = [] // [10, X, 3, +, 3, -, 2]
let arr2 = [] // [DO ALL X]

arr0.forEach((e, i) => { // => arr1
  if (arr1.length === 0) arr1.push(e)
  else if (!isNaN(arr0[i - 1]) && !isNaN(e)) arr1[arr1.length - 1] = arr1[arr1.length - 1].concat(e)
  else arr1.push(e)
})

arr1.forEach((e, i) => { // => arr2
  if (i !== 0 && e === "X" && !isNaN(arr1[i - 1]) && !isNaN(arr1[i + 1])) arr2.push(arr1[i - 1] * arr1[i + 1])
  else if (i !== 0 && arr1[i - 1] !== "X") arr2.push(e)
})

console.log(
  arr2
)