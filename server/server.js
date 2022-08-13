const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { type } = require("os");
const si = require("systeminformation");

const PORT = 4000;
// const FILES_DIR = path.join(__dirname, "public/resources");
const FILES_DIR = path.join("C:/Users/Lenovo/Documents/2022");

const app = express();

app.use(cors());
app.use(express.static("public/static"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("/fs", function (req, res, next) {
  fs.readdir(FILES_DIR, (err, files) => {
    if (err) {
      res.statusCode = 404;
      res.send(err);
    } else {
      let dirMetaData = [];
      (files || []).forEach((el) =>
        dirMetaData.push({
          name: el,
          type: el.indexOf(".") == -1 ? "Folder" : "File",
          extension:
            el.indexOf(".") !== -1
              ? el?.substring(el?.lastIndexOf(".") + 1)
              : "",
        })
      );
      res.send(dirMetaData);
    }
  });
});

app.get("/fs/:file(*)", function (req, res, next) {
  if (req.params.file != null && req.params.file.indexOf(".") != -1) {
    const readableTypes = [
      "js",
      "json",
      "tsx",
      "env",
      "csv",
      "md",
      "txt",
      "css",
      "scss",
      "doc",
      "ts",
      "gitignore",
      "html",
      "java",
      "cpp",
      "c",
      "py",
    ];

    const extension = req.params.file?.substring(
      req.params.file?.lastIndexOf(".") + 1
    );

    if (readableTypes.includes((extension || "").toLowerCase())) {
      fs.readFile(
        path.join(FILES_DIR, req.params.file),
        "utf8",
        function (err, data) {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            res.statusCode = 200;
            res.send(data);
          }
        }
      );
    } else {
      res.download(req.params.file, { root: FILES_DIR }, function (err) {
        if (!err) return; // file sent
        if (err.status !== 404) return next(err); // non-404 error
        // file for download not found
        res.statusCode = 404;
        res.send("Cant find that file, sorry!");
      });
    }
  } else {
    fs.readdir(path.join(FILES_DIR, req.params.file), (err, files) => {
      if (err) {
        res.statusCode = 404;
        res.send(err);
      } else {
        let dirMetaData = [];
        (files || []).forEach((el) =>
          dirMetaData.push({
            name: el,
            type: el.indexOf(".") == -1 ? "Folder" : "File",
            extension:
              el.indexOf(".") !== -1
                ? el?.substring(el?.lastIndexOf(".") + 1)
                : "",
          })
        );
        res.send(dirMetaData);
      }
    });
  }
});

app.get("/si/:fn", function (req, res, next) {
  si[req.params.fn]()
    .then((data) => {
      res.statusCode = 200;
      res.send(data);
    })
    .catch((error) => {
      res.statusCode = 500;
      res.send(error);
    });
});
