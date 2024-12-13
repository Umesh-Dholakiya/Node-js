const http = require("http");

http.createServer((req , res) => {
    res.write("<h1>Good Evening</h1>");
    res.write("<h1>Good Evening....</h1>");
    res.end();
}).listen(8080);