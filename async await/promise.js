console.log("person1: shows ticket");

console.log("person2: shows ticket");

const promiseWifeBringingTicks = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("ticket");
  }, 3000);
});

const getPopcorn = promiseWifeBringingTicks.then((t) => {
  console.log("wife: i have the tics");

  console.log("husband: we should go in");

  console.log("wife: no i am hungry");

  return new Promise((resolve, reject) => resolve(`${t} popcorn`));
});

const getButter = getPopcorn.then((t) => {
  console.log("husband: I got some popcorn");

  console.log("husband: we should go in");

  console.log("wife: I need butter on my popcorn");

  return new Promise((resolve, reject) => resolve(`${t} butter`));
});

const getColdDrinks = getButter.then((t) => {
  console.log("wife: I need coldrinks with my popcorn");

  console.log("husband: I will get you one from the stall there");

  return new Promise((resolve, reject) => resolve(`${t} coldrinks`));
});

getColdDrinks.then((coldrinks) => console.log(coldrinks));

console.log("person4: shows ticket");

console.log("person5: shows ticket");
