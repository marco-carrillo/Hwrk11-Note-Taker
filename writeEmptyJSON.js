let fs=require('fs');

let emptyobject=[];



let data= {"date":"1/24/2020","content":"Remind me to think about the different things I want to do","priority":"urgent","id":"30991357a7db"};
let arrayofdata=[]
arrayofdata.push(data);
arrayofdata.push(data);
fs.writeFileSync('./notes.json',JSON.stringify(arrayofdata));


//  Data to send to postman
// {"date": "1/24/2020","content":"Remind me to think about the different things I want to do","priority":"urgent"}
