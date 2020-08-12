const http = require('http');
const port = process.env.PORT || 3000;
const app = require('./app.js');

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {"Content-Type" : "Text"});
//     res.write("Hello");
//     res.end();
// });
const server = http.createServer(app);

server.listen(port, (err) => {
    if(err) {
        console.log("Server connection faild");
    } else {
        console.log("Server listen on port: ", port);
    }
})