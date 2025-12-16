// server.mjs
import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors({
  origin:"https://streaming-node-js.vercel.app",
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}));

app.get("/", (req, res) => {
  const range = req.headers.range;


  console.log(range)
  if (!range) return res.status(416).send("Range header required");

  const videoPath = "./sample_1280x720_surfing_with_audio.mp4";
  const fileSize = fs.statSync(videoPath).size;



  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);  //** */
  if (Number.isNaN(start) || start >= fileSize) return res.status(416).send("Range Not Satisfiable"); /*** */

  const CHUNK = 1 * 1024 * 1024;
  const end = parts[1] ? Math.min(parseInt(parts[1], 10), fileSize - 1) : Math.min(start + CHUNK - 1, fileSize - 1); /** */
  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": String(contentLength),
    "Content-Type": "video/mp4"
  };

  res.writeHead(206, headers);
  fs.createReadStream(videoPath, { start, end }).pipe(res);
});

app.listen(9600, () => console.log("running on 9600"));
