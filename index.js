const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const app = express();
const port = 4000;

//serve static files
app.use(express.static(__dirname + "/public"));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//serving index.html to '/
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/upload", upload.single("imageInput"), (req, res) => {
  const image = sharp(req.file.buffer);
  image
    .jpeg({ mozjpeg: true })
    .toBuffer()
    .then(function (data) {
      console.log("data",data);
      let base64Encoded = data.toString("base64");
      const url = `data:image/jpeg;base64,${base64Encoded}`;

      res.status(200).send({ data: url });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
