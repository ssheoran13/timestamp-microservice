// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function validDate(date_str){
  return !isNaN(new Date(date_str))
}

app.get("/api/", (req,res)=>{
  
  let  unix_time=new Date().getTime()
  let  utc=new Date().toUTCString()
  
  
  res.json({unix:unix_time,utc:utc})
})

app.get("/api/:date", (req,res)=>{
  let input=req.params.date
  if (input.length>10){
    input=Number(input)
  }
  // console.log(input.length)
  // console.log(input)
  let unix_time;
  let utc;
  let flag=console.log(validDate(input))
  if (flag){
    unix_time=new Date(input).getTime()
    utc=new Date(input).toUTCString()
    res.json({unix:unix_time,utc:utc})

  }
  else{
    res.json({error:"Invalid Date"})

  }
  
  
  
  
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
