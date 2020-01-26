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
let serverPort= process.env.PORT || 8080;
let app=express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//***********************************************/
//  Including routers, both static and dynamic
//***********************************************/
require(path.join(__dirname,'/routes/apiRoutes.js'))(app);
require(path.join(__dirname,'/routes/htmlRoutes.js'))(app);

//**********************/
//  Start listening
//**********************/
app.listen(serverPort,function(){
    console.log(`Started listening port ${serverPort}`);
})