//************************************************************************************************************************/
//  Function returns random hexadecimal key.  Used to create unique keys for the notes, generally 12 characters long     */
//************************************************************************************************************************/
function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}

//*******************************************************/
//  Main server functionality.  Setting dependencies    */
//*******************************************************/
let express= require('express');
let path=require('path');
let fs=require('fs');
let crypto=require('crypto');
let n=0

//************************************************************/
//  Setting port functionality.  Enabling JSON data parsing  */
//************************************************************/
let serverPort=3000;
let app=express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//******************************************************************************/
//  Setting all static routes to server files required to run the application
//******************************************************************************/

// ROOT: "/" -> Serve index.html
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// path /notes -> Called by index.html -> Serve notes.html
app.get('/notes',function(req,res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// CSS styling sheets -> Called by notes.html -> Serve styles.css
app.get('/assets/css/styles.css',function(req,res){
    res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
});

// index.js -> Called by notes.html -> Serve index.js
app.get('/assets/js/index.js',function(req,res){
    res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
});

//******************************************************************************/
//  Setting all API GET routes to serve data to the application per requests
//******************************************************************************/

// /API/NOTES -> Servers data from DB/DB.JSON
app.get('/api/notes',function(req,res){
    let notes=JSON.parse(fs.readFileSync(path.join(__dirname,'/db/db.json'),'utf8'));     //  Reading file
    console.log(`Request to return all notes in JSON has been fulfilled`);                //  Message to console
    return res.json(notes);                                                               //  returns all notes
});

//******************************************************************************/
//  Setting all API POST routes to serve data to the application per requests
//******************************************************************************/

// /API/NOTES -> Gets data and posts a new note
app.post('/api/notes',function(req,res){
    let newNote=req.body;                                                               // Getting the note from the request
    newNote.id=randomValueHex(12);;                                                     // Adding random hexadecimal key
    allNotes=JSON.parse(fs.readFileSync(path.join(__dirname,'/db/db.json'),'utf8'));    // Reading the existing JSON file into an array
    allNotes.push(newNote);                                                             // Adding the new note into the new array
    fs.writeFileSync(path.join(__dirname,'/db/db.json'),JSON.stringify(allNotes));      // Writting new file to hard disc
    console.log(`Note id ${newNote.id} successfully added to the JSON file`);           // Success message
    return res.json(200);                                                               // Sending success status    
});

//******************************************************************************/
//  Setting all API DELETE routes to serve data to the application per requests
//******************************************************************************/
app.delete('/api/notes/:id',function(req,res){
    console.log(req.params);
    let idToDelete = req.params.id;                                                     // Reading ID of note to delete
    allNotes=JSON.parse(fs.readFileSync(path.join(__dirname,'/db/db.json'),'utf8'));    // Reading the existing JSON file into an array
    for(let i=0;i<allNotes.length;i++){
        if(allNotes[i].id===idToDelete){allNotes.splice(i,1)};                          // Eliminating the array
    };
    fs.writeFileSync(path.join(__dirname,'/db/db.json'),JSON.stringify(allNotes));      // Writing changes to disk
    console.log(`Request to eliminate array ${idToDelete} has been fulfilled`);
    return res.json(200);                                                               // Sending success status    
});

//**********************/
//  Start listening
//**********************/
app.listen(serverPort,function(){
    console.log(`Started listening port ${serverPort}`);
})