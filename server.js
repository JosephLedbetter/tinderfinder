let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");

let app = express();

let PORT = process.env.PORT || 8000;

app.use(express.static(`${__dirname}/app`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function() {
    console.log(`App is listening on PORT: ${PORT}`);
});