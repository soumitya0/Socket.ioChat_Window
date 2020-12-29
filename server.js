const express = require("express");

const socket = require("socket.io");

// App setup
const app = express();
const server = app.listen(4000, () => {
  console.log("server running ............");
});

// static file
app.use(express.static("client"));

// socket setup
const io = socket(server); //socket() - server paremeter is let socket.io that we want to work on this server

// when the connection of client and server made then we listen a event{io.on()} on "connections"
io.on("connection", (sockets) => {
  // socket paremeter :  is instance that the on client is connected
  console.log("-------------Opened Connection -----------");
  //   we have done with the socket connetion on server side now we have make a connection on frontend also

  console.log(sockets.id);

  // handling the data that have be pass by the client when send btn is click
  //   socket.emit()
  sockets.on("chat", (data) => {
    //  when we reciver the data from the client what we will do?
    //  we will do that we will send data to all to the client that are connected to the server
    console.log("recived data: " + data);

    // io.socket() this is going to refere to all client that are connected.
    //  with the help of this we will pass msg to all client that are connected
    //  add to pass that data will it emit() the data pass to client now we will handle this emit data on client side
    io.sockets.emit("chat", data);
  });

  //broadcast
  sockets.on("typing", function (data) {
    sockets.broadcast.emit("typing", data);
  });
});
