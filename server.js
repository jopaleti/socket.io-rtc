const express = require("express")
const app = express()

// Serve the file in the public
app.use(express.static("public"))
const expressServer = app.listen(4000, () => console.log("Server listening on port 4000"));

const { Server } = require("socket.io")
const io = new Server(expressServer, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow specific HTTP methods
  },
});

io.on("connection", (socket) => {
    console.log(socket.id, "has joined the server!")
    socket.emit("welcome", "You joined the connection")

    socket.on("seen", (msg) => {
        console.log(msg)
    })
})