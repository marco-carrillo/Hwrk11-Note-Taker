//***********************************************/
//  Function returns random hexadecimal key     */
//***********************************************/
function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}

//************************************************************/
//  Function to be executed when path requested is /notes    */
//************************************************************/
function getHTMLNotes(req,res){
    console.log(`Request to send file notes.html was fulfilled`);
    res.sendFile(path.join(__dirname, "notes.html"));
};

//*******************************************************/
//  Function to be executed when path requested is *    */
//*******************************************************/
function getHTMLIndex(req,res){
    console.log(`Request to send file index.html was fulfilled`);
    res.sendFile(path.join(__dirname, "index.html"));
};

//******************************************************************/
//  Function to be executed when path requested is GET /api/notes  */
//******************************************************************/
function getAPINotes(req,res){
    let notes=JSON.parse(fs.readFileSync('./notes.json'));                     //  Reading file
    console.log(`Request to return all notes in JSON has been fulfilled`);     //  Message to console
    return res.json(notes);                                                    //  returns all notes
};

//*******************************************************************/
//  Function to be executed when path requested is POST /api/notes  */
//*******************************************************************/
function postAPINote(req,res){
    let newNote=req.body;                                                       // Getting the note from the request
    newNote.id=randomValueHex(12);;                                             // Adding random hexadecimal key
    allNotes=JSON.parse(fs.readFileSync('./notes.json','utf8'));                // Reading the existing JSON file into an array
    allNotes.push(newNote);                                                     // Adding the new note into the new array
    fs.writeFileSync('./notes.json',JSON.stringify(allNotes));                  // Writting new file to hard disc
    console.log(`Note id ${newNote.id} successfully added to the JSON file`);   // Success message    
};

//*********************************************************************/
//  Function to be executed when path requested is DELETE /api/notes  */
//*********************************************************************/
function deleteNote(req,res){
    let idToDelete = req.params.id;                                             // Reading ID of note to delete
    console.log(idToDelete);
    allNotes=JSON.parse(fs.readFileSync('./notes.json','utf8'));                // Reading the existing JSON file into an array
    for(let i=0;i<allNotes.length;i++){
        if(allNotes[i].id===idToDelete){allNotes.splice(i,1)};                  // Eliminating the array
    };
    fs.writeFileSync('./notes.json',JSON.stringify(allNotes));                  // Writing changes to disk
    console.log(`Request to elimiante array ${idToDelete} has been fulfilled`);
};

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

//*****************************************/
//  Setting all routes for get and posts
//*****************************************/
app.get('/notes',getHTMLNotes);
app.get('/api/notes',getAPINotes);
app.get('/*',getHTMLIndex);
app.post('/api/notes',postAPINote);
app.delete('/api/notes/:id',deleteNote);

//**********************/
//  Start listening
//**********************/
app.listen(serverPort,function(){
    console.log('Started listening port 3000')
})