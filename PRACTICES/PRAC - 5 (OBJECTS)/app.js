// OBJECTS
// simple object
// let user = [{
//   name: "Humza",
//   roll: 208204,
//   isStudent: true,
//   greet: function (hello) {
//     return hello + this.name;
//   },}];
// console.log(user.splice(0 , 1));


// console.log(user.greet("hello "));

// adding new key:value in object

// user.fatherName = "Jalil"
// user.age = 17
// console.log(user);

// edit in onject

// user.isStudent = false
// console.log(user);

// delete from object

// delete user.fatherName
// console.log(user);

let tuition = [];

let morning = [
  {
    name: "Humza",
    roll: 208204,
    isStudent: true,
    greet: (hello) => {
      return hello + this.name;
    },
  },
  {
    name: "Ali",
    roll: 208205,
    isStudent: true,
    greet: (hello) => {
      return hello + this.name;
    },
  },
];
let evening = [
  {
    name: "Ashar",
    roll: 208204,
    isStudent: true,
    greet: (hello) => {
      return hello + this.name;
    },
  },
  {
    name: "Haseeb",
    roll: 208205,
    isStudent: true,
    greet: (hello) => {
      return hello + this.name;
    },
  },
];
let night = [
  {
    name: "Bilal",
    roll: 208206,
    isStudent: true,
    greet: (hello) => {
      return hello + this.name;
    },
  },
  {
    name: "Zubair",
    roll: 208207,
    isStudent: true,
    greet: (hello) => {
      return hello + this.name;
    },
  },
];

tuition = [morning, evening, night];
let inst = tuition[0][0]
console.log(Object.entries(inst));

// console.log(tuition[1][0].roll);

// naya = tuition[2][1].isStudent = false

// console.log(tuition);

// delete tuition[2]
// console.log(tuition);

// tuition[2] = "NYA AYA HU"
// console.log(tuition);

// for (const i in tuition) {
//      console.log(Object.values(tuition[0][0].name[0]));
//      console.log(Object.keys(tuition[0][0]));
//      console.log(Object.entries(tuition[0][0]));
     

     
// }



//POCHNA HAI SIR SE LAZMI

// function obj (name , age , isPermenant , greet) {
    
//     this.name = name
//     this.age = age
//     this.isPermenant = isPermenant
//     this.greet = greet
// }

// const obj1 = new obj("Bilal" , 20 , true , (hello)=>{
//   return "hello" + this.name
// })
// console.log(obj1.greet());

// const func = function (heloo) {
//     return heloo
// }

// console.log(func("welcome"));
