const express = require("express");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

const server = require("http").Server(app);
const io = require("socket.io")(server);
server.listen(3000,()=>{
    console.log("server start")
});

// tạo kết nối giữa client và server
io.on("connection", function (socket) {
    console.log("connect", socket.id)
    socket.on("disconnect", function () {
        console.log("disss")
    });

});
