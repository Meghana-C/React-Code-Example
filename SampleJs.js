// const students = [{
//     name: 'something',
//     id: 1234,
//     address: 'something else',
//   },
//   {
//     name: 'something 2',
//     id: 4321,
//     address: 'something else 2',
//   },
//   {
//     name: 'something 3',
//     id: 5555,
//     address: 'something else 3',
//   },
// ];

// students.map((newArr,index)=>{
// return(
//  console.log(newArr.name)
// // (newArr.name=== 'something') ?
// // console.log(newArr.name) 
// // :null
// )})
const array = [
    {
      name: 'Rakesh',
      id: 1234,
      grade: 4,
    },
    {
      name: 'Rajesh',
      id: 4321,
      grade: 4,
    },
    {
      name: 'Ramesh',
      id: 5555,
      grade: 2,
    },
  ];
  let count = 0;
  for (let i = 0; i<array.length; i++)
  {
      if(array[i].grade == 4)
      {
          
           count = count +1
      }

  }
  console.log(count) 
