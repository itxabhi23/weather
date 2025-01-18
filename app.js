const express = require("express");
const app = express();
const https =require("https");
const bodyParser=require("body-Parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  var cityName = req.body.cityName;
  console.log(cityName);
  const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=13e7acbfe0febaa28520a7a6d1c10c2a"
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){

      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const weatherDescription =weatherData.weather[0].description;
      const image=weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/"+image+"@2x.png";
      res.write("<p> The weather is currently "+weatherDescription+"</p>");
    res.write("<h1> Temperature in "+cityName+" is "+temp+" Degree Celsius </h1>");
    res.write("<img src="+imageUrl+">");
    res.send();
  });
  });
});

app.listen(3000,function(){
  console.log("server has been started on port 3000");
});
