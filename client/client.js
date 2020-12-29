// make a socket a connection on frontend
console.log("woking");
const socket = io.connect("http://localhost:4000");

// Query DOM
const message = document.getElementById("message");
const handle = document.getElementById("handle");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

// now when the send button click
// emit events
btn.addEventListener("click", () => {
  console.log("btn click");
  // socket.emit()  -> send the data to server. to handle this data go server side where the webSocket connetction is created
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
});

message.addEventListener("keypress", function () {
  socket.emit("typing", handle.value);
});

// listen for event // data that are pass from the server to client
socket.on("chat", function (data) {
  feedback.innerHTML = "";

  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

//brodCasting msg
socket.on("typing", function (data) {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});
