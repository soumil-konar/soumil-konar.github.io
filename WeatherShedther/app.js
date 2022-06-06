const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res)
{
    res.sendFile(__dirname+"/index.html");
})


app.post("/", function(req, res)
{
     const query = req.body.cityName;
    const apiKey = "0f0a44c0fa36893ce5e5e6512d710d33";
    const unit = "metric";
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url,function(response)
    {
        console.log(response.statusCode);

        response.on("data", function(data)
        {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.feels_like;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            
            res.write("<p>The weather is currently "+description+".</p>");
            res.write("<h1>The temperature in " +query+" is "+ temp + " degree Celcius</h1>");
            res.write("<img src="+ imageURL+">");
            
            res.send();

            
            // console.log(weatherData);
            // const object = {
            //     name:  "Soumil",
            //     favouriteFood: "Ramen"
            // }
            // console.log(JSON.stringify(object))
            
        });
    
    });
    // res.send("Server is running.")
    
})


   



















app.listen(3000, function()
{
    console.log("Server running on port 3000.")
})