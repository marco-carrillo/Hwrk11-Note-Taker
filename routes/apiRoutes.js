//************************************************************************************************************************/
//  Function returns random hexadecimal key.  Used to create unique keys for the notes, generally 12 characters long     */
//************************************************************************************************************************/
function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}

//*********************************************/
// Establishing dependencies for this module
//*********************************************/
let path=require('path');
let fs=require('fs');
let crypto=require('crypto');

//******************************************************/
//  Establishing function that contains all API routes
//******************************************************/

module.exports=function(app){

    //****************************************************************************/
    // /API/NOTES -> Servers data from DB/DB.JSON
    // Used by front end to populate a list of all notes available in the table
    //****************************************************************************/

    app.get('/api/notes/',function(req,res){
        let notes=JSON.parse(fs.readFileSync(path.join(__dirname,'../db/db.json'),'utf8'));   //  Reading file
        console.log(`Request to return all notes in JSON has been fulfilled`);                //  Message to console
        return res.json(notes);                                                               //  returns all notes
    });

    //*************************************************/
    // /API/NOTES -> Gets data and posts a new note
    // UI sends record to be added to the datatable
    //*************************************************/
    app.post('/api/notes',function(req,res){
        let newNote=req.body;                                                               // Getting the note from the request
        newNote.id=randomValueHex(12);;                                                     // Adding random hexadecimal key
        allNotes=JSON.parse(fs.readFileSync(path.join(__dirname,'../db/db.json'),'utf8'));  // Reading the existing JSON file into an array
        allNotes.push(newNote);                                                             // Adding the new note into the new array
        fs.writeFileSync(path.join(__dirname,'../db/db.json'),JSON.stringify(allNotes));    // Writting new file to hard disc
        console.log(`Note id ${newNote.id} successfully added to the JSON file`);           // Success message
        return res.json(200);                                                               // Sending success status    
    });

    //******************************************************************************/
    //  Setting all API DELETE routes to serve data to the application per requests
    //  UI has identified ID of record to be eliminated
    //******************************************************************************/
    app.delete('/api/notes/:id',function(req,res){
        let idToDelete = req.params.id;                                                     // Reading ID of note to delete
        allNotes=JSON.parse(fs.readFileSync(path.join(__dirname,'../db/db.json'),'utf8'));  // Reading the existing JSON file into an array
        for(let i=0;i<allNotes.length;i++){
            if(allNotes[i].id===idToDelete){allNotes.splice(i,1)};                          // Eliminating the array
        };
        fs.writeFileSync(path.join(__dirname,'../db/db.json'),JSON.stringify(allNotes));    // Writing changes to disk
        console.log(`Request to eliminate array ${idToDelete} has been fulfilled`);
        return res.json(200);                                                               // Sending success status    
    });
}