

const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");


//Routes





const port =  8000;

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(cookieParser());
app.use(cors());

//My Routes
app.get('/', (req, res) => {
  res.json({message : "Hello World"})
})





app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
});

