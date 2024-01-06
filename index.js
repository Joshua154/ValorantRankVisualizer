const express = require("express");
const app = express();
const config = require('./config');




const port = process.env.PORT || config.webserver.port;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
