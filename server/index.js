import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import os from "os";
import http, { Server } from "http"; 
import mongoose from "mongoose";
import {webRoutes} from "./routes/web/webRoutes.js";
import { Socket } from "socket.io";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
// app.use(cors())
 app.use(cors({
  origin : "http://localhost:3000",
  credentials : true,
}));   

const PORT = process.env.PORT || 5000;

// create   socket.IO server
/* const server =  http.createServer(app)
const io = new Server(server,{
  cors : {
    origin : "http://localhost:3000",
    methods : ["GET", "POST"],
    credentials : true,
  }
}) */

/*io.on("connection",(Socket)=>{
  console.log("User Connected",Socket.id)
}) */


app.use("/web",webRoutes) // http://localhost:5000/web


app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

app.listen(PORT, () => {
  console.log("\n🚀 Server is running!");
  console.log(`➡️  Local:   http://localhost:${PORT}`);
  console.log(`🌐 Network: http://${getLocalIP()}:${PORT}\n`);
});



mongoose.connect(`mongodb://127.0.0.1:27017/fullstackapp`)
.then((res)=>{
  console.log("DB Connected Successfully")
 
})



// API Routes
 /* app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});  */ 