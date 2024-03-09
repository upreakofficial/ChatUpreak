const express = require("express");
const cookieParser = require("cookie-parser");
const winston = require("./config/winston");
var morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use('/uploads',express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan('combined', { stream: winston.stream }));

require("./routes/file_route")(app);

let port = process.env.PORT;
if(port == null || port == ""){
    port = 3001;
}
app.listen(port,function(){
    console.log("Chat Server has started on port",port);
});