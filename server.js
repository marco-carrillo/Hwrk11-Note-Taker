//*******************************************************/
//  Function to be executed when path requested is /    */
//*******************************************************/

function getRoot(req,res){
    console.log(`I got ${n} hit`);
    n++
};


//*******************************************************/
//  Main server functionality.  Setting dependencies    */
//*******************************************************/
let express= require('express');
let path=require('path');
let n=0

//*******************************************************/
//  Setting port functionality.  Enabling data parsing  */
//*******************************************************/
let serverPort=3000;
let app=express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//*******************************************************/
//  Setting all routes for get and posts
//*******************************************************/
app.get('/',getRoot);
app.get('/notes',getHTMLNotes);
app.get('*',getHTMLIndex);
app.get('/api/notes',getApiNotes);
app.post('/api/notes',postAPINote);
app.delete('/api/notes/:id',deleteNote)

//*******************************************************/
//  Start listening
//*******************************************************/
app.listen(serverPort,function(){
    console.log('Started listening port 3000')
})