const http = require("http");

const app = http.createServer((req,res) => {
    res.write("<h1>Hello</h1>");
    res.write("<h2>Hello Good Evening</h2>");
    res.end();
})

app.listen(8080 , (err) => {
    if(err) {
        console.log(err);
        return false;
    }
    console.log("server is running on port 8080");
});