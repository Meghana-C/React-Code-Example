

//  ES7 Features

/*********************** includes () **********************************/

 let arr = ["reactjs","vuejs","nightwatch"]
 console.log("Is ReactJs available in an array -",arr.includes("reactjs"));


/********************* Exponential Operator(**) ***********************/

console.log("console.log(x**y) -",2**5)
console.log(Math.pow(2, 5)) 


//  ES8 Features 
  
/********************** Async / Await ********************************/

async function f()
{
    let promise = new Promise((resolve,reject)=>{
        setTimeout(()=> resolve("Resolved!"),5000) });
       let result = await promise; // wait until the promise resolves (*)
       console.log("Prmoise in asyn/ await  is -",result);
}
f();


/******************* Object.values() & Object.entries() *****************/

let bookObj = { bookName:"ReactJs",pages: 250,isEditable: false }
console.log("Obj Values -",Object.values(bookObj));
console.log("Obj Entries -",Object.entries(bookObj));
console.log("Expanded Obj Entries -",JSON.stringify(Object.entries(bookObj)));


/******************* PadStart() &  padEnd() *****************************/

let str = "7";
console.log("PadStart is -",str.padStart(5,"0"));
console.log("PadEnd is -",str.padEnd(5,"0"));


// ES9 Features

/******************* Object Expansion Operator ***************************/

let obj1 = {a:1, b:2,c:3}
let obj2 = {...obj1, d:4, e:5}
console.log("Expanded Object is",obj2)



/******************* Promise.finally() **********************************/

 function promiseEx()
{
    let promise = new Promise((resolve,reject)=>{
        setTimeout(()=> resolve("Resolved"),5000) });
       promise.then(result => {console.log("Resolved Promise..",result)})
               .catch(err=>{console.log("Rejected Promise..",err)})
               .finally(()=>{console.log("I will execute always irrespective of promise resolved or rejected")})

}
promiseEx();



// ES10 Features

/******************* Array.flat() & Array.flatMap() ********************/

// let numArray =[1,2,3,[4,5],[6,7]]
// console.log("Number Array -",numArray.flat())
// let numArray2 = [1,2,3,[[[4,5]]]]
// let arrFlat = numArray2.flat(2);
// console.log("Number Array 2 -",JSON.stringify(arrFlat))


let fruitsArr = ["A","B","C","D","E"];
let fruitNames =["Apple","Orange","Banana","Mango","Green Apple"];
let fruitsMap = fruitsArr.flatMap((fruit,i)=>[fruit, fruitNames[i]])

console.log("Fruits Array -",JSON.stringify(fruitsMap));


/********************* trimStart() and trimEnd() ***********************/

let greeting = "    Hello World!";
console.log("Trimming from Start -",greeting.trimStart());
let greeting2 = "Hello World!         ";
console.log("Trimming from End -",greeting2.trimEnd());


/********************* Object.fromEntries() *************************/

let entriesArr = [["bookName","Javascript"],["Pages",250],["isEditable",true]]
let entriesObj = Object.fromEntries(entriesArr);
console.log("Object from entries! -",entriesObj);

/********************** Modified Catch Binding *********************/

try {
    console.log("Execute try block!!");
    throw "Throw Error!!"
} catch {
    console.log("Catch Error!!")
}

/**********************Function.toString() ***********************/

function sum(a,b)
{
    return a+b;
}
console.log("Function to string -",sum.toString())
