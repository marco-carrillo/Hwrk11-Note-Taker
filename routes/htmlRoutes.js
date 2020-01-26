//*********************************************/
// Establishing dependencies for this module
//*********************************************/

let path=require('path');

//******************************************************/
//  Following route establishes static routes
//******************************************************/

module.exports=function(app){

    // path /notes -> Called by index.html -> Serve notes.html
    app.get('/notes',function(req,res){
        res.sendFile(path.join(__dirname,"../public/notes.html"));
    });

    // CSS styling sheets -> Called by notes.html -> Serve styles.css
    app.get('/assets/css/styles.css',function(req,res){
        res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"));
    });

    // index.js -> Called by notes.html -> Serve index.js
    app.get('/assets/js/index.js',function(req,res){
        res.sendFile(path.join(__dirname, "../public/assets/js/index.js"));
    });

    // If no matching route, then default is home -> Serve index.html
    app.get('*',function(req,res){
        res.sendFile(path.join(__dirname,"../public/index.html"));
    });
};