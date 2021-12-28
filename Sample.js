
var array1 = [];
var array2 = array1;
array2.push(3);
console.log(array1)

function A()
{
    let x = 3;
    console.log(x)
    return function B()
    {
       x= x++;
       console.log(x,"X in B")
    }
}
let closureFunc = A()
closureFunc();