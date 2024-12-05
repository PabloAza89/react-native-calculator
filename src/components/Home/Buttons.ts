// const portSmall = '17.6%';
// const portLarge = '22.5%';
// const land = '12%';

const portSmall = '17.6%';
const portLarge = '22.5%';
const land = `${92/7}%`;

export let portButtons: any[] = [
  { value: "(", size: portSmall }, { value: ")", size: portSmall }, { value: "C", size: portSmall },
  { value: "N", size: portSmall }, { value: "B", size: portSmall }, { value: "7", size: portLarge },
  { value: "8", size: portLarge }, { value: "9", size: portLarge }, { value: "X", size: portLarge },
  { value: "4", size: portLarge }, { value: "5", size: portLarge }, { value: "6", size: portLarge },
  { value: "-", size: portLarge }, { value: "1", size: portLarge }, { value: "2", size: portLarge },
  { value: "3", size: portLarge }, { value: "+", size: portLarge }, { value: "/", size: portLarge },
  { value: "0", size: portLarge }, { value: ".", size: portLarge }
]

export let landButtons: any[] = [
  { value: "(", size: land }, { value: ")", size: land }, { value: "C", size: land },
  { value: "N", size: land }, { value: "B", size: land }, { value: "-", size: land },
  { value: "X", size: land }, { value: "5", size: land }, { value: "6", size: land },
  { value: "7", size: land }, { value: "8", size: land }, { value: "9", size: land },
  { value: "/", size: land }, { value: "+", size: land }, { value: "0", size: land },
  { value: "1", size: land }, { value: "2", size: land }, { value: "3", size: land },
  { value: "4", size: land }, { value: ".", size: land }
]