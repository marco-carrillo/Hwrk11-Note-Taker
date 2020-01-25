//*******************************************************/
//  Function to be executed when path requested is /    */
//*******************************************************/
function getRoot(req,res){
    console.log(`Need to do whatever I need do do when \ path is chosen`);
};

//************************************************************/
//  Function to be executed when path requested is /notes    */
//************************************************************/
function getHTMLNotes(req,res){
    console.log(`Need to return notes.html file`);
};

//*******************************************************/
//  Function to be executed when path requested is *    */
//*******************************************************/
function getHTMLIndex(req,res){
    console.log(`Need to return index.html file`);
};

//******************************************************************/
//  Function to be executed when path requested is GET /api/notes  */
//******************************************************************/
function getAPINotes(req,res){
    console.log(`Need to return Notes, this is the API path`);
};

//*******************************************************************/
//  Function to be executed when path requested is POST /api/notes  */
//*******************************************************************/
function postAPINote(req,res){
    console.log(`Need to return Notes, this is the API path`);
};

//*********************************************************************/
//  Function to be executed when path requested is DELETE /api/notes  */
//*********************************************************************/
function deleteNote(req,res){
    console.log(`Need to return Notes, this is the API path`);
};


//*******************************************************/
//  Main server functionality.  Setting dependencies    */
//*******************************************************/
let express= require('express');
let path=require('path');
let n=0

//  Setting port functionality.  Enabling data parsing  */
let serverPort=3000;
let app=express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//  Setting all routes for get and posts
app.get('/',getRoot);
app.get('/notes',getHTMLNotes);
app.get('*',getHTMLIndex);
app.get('/api/notes',getAPINotes);
app.post('/api/notes',postAPINote);
app.delete('/api/notes/:id',deleteNote)

//  Start listening
app.listen(serverPort,function(){
    console.log('Started listening port 3000')
})