
type MyTupple = [number, number];

let myFunction = ([x,y] : MyTupple) => {
  console.log("destructuring rules " + x + "," + y);
}

myFunction([1,2]);
