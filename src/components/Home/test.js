//((60000 - (Date.now() - parseInt(lastMessageLS))) / 1000).toFixed(0)
//console.log("asw")
//let current = Date.now()


// const one = async () => {
//   // …do multiple sync or async tasks
//   //let resRoute = await readData("savedRoute") // RESPONSE ROUTE
//   //navigation.navigate(resRoute)
//   //console.log("PUERBA PRUEBA", resRoute)
//   //console.log("INICIANDO")
//   setTimeout(() => console.log("111"), 1000)
//   setTimeout(() => console.log("222"), 2000)
//   setTimeout(() => console.log("333"), 3000)
//   setTimeout(() => console.log("444"), 4000)
//   setTimeout(() => console.log("555"), 5000)
//   setTimeout(() => console.log("666"), 6000)
//   return setTimeout(() => { return "done" }, 7000)
//   //BootSplash.hide()
  
// };

// const two = () => {
//   setTimeout(() => console.log("aaa"), 1000)
// }

  // setTimeout(() => console.log("111"), 1000)
  // setTimeout(() => console.log("222"), 2000)
  // setTimeout(() => console.log("333"), 3000)
  // setTimeout(() => console.log("444"), 4000)
  // setTimeout(() => console.log("555"), 5000)
  // setTimeout(() => console.log("666"), 6000)

let qq = async () => {
  setTimeout(async() => console.log("111"), 1000)
  
}

let qq2= () => {
  setTimeout(async() => console.log("222"), 1000)
  
}

//.then(() => setTimeout(() => console.log("222"), 1000))

const func = async () => {
  // for (let i = 0; i < 3; i++) {
  //   await new Promise((resolve) =>
  //     setTimeout(() => {
  //       console.log(i);
  //       resolve();
  //     }, 1000)
  //   );
  // }
  // for (let i = 0; i < 8; i++) {
  //   await new Promise((resolve) =>
  //     setTimeout(() => {
  //       console.log(i);
  //       resolve();
  //     }, 1000)
  //   );
  // }
  await new Promise((resolve) =>
    setTimeout(() => {
      console.log("A");
      resolve();
    }, 4000)
  );
  await new Promise((resolve) =>
    setTimeout(() => {
      console.log("B");
      resolve();
    }, 1000)
  );
  await new Promise((resolve) =>
    setTimeout(() => {
      console.log("C");
      resolve();
    }, 4000)
  );
  await new Promise((resolve) =>
    setTimeout(() => {
      console.log("D");
      resolve();
    }, 1000)
  );
};

console.log(
  //(60000 - (Date.now() - parseInt(lastMessageLS))) / 1000).toFixed(0)
  //one(),//.then(() => two())
  //two()
  //Promise.all([one()]).then(() => two())
  // one().then((res) => {
  //   if (res === "done") {
  //     two()
  //   }
  // })
  //qq().then(() => qq2())
  func()
  //.then(() => setTimeout(() => console.log("222"), 2000))
)