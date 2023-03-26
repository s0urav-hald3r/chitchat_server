const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000;

const backendServer = app.listen(PORT, () => {
  console.log(`Server runnig at port ${PORT}`);
});

const chatServer = require("socket.io")(backendServer);

chatServer.on("connection", (stream) => {
  console.log("Someone Connected to the Stream at", stream.id);
  stream.on("disconnect", () => {
    console.log("Someone Dis-connected from the Stream at", stream.id);
  });
  stream.on("send-message", (data) => {
    stream.broadcast.emit("receive-message", data);
  });
});
