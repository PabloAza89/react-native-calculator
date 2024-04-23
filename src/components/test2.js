let qq = "(1+2)-M3+4xM56/7".split("")

let res = []

qq.forEach((e, i) => { // => first parsed result
  if ((qq[i - 1] === "M" || !isNaN(parseInt(qq[i - 1]))) && !isNaN(parseInt(e))) res[res.length - 1] = res[res.length - 1].concat(e)
  else res.push(e)
})

res.forEach((e, i) => {
  if (e.slice(0,1) === "M") res[i] = -1 * parseInt(e.slice(1,e.length))
})


console.log(
  /* res.splice(4,2), // remove 2 values
  res.splice(4,0, "VVV"), // add values */
  //res
  res
  //qq
)