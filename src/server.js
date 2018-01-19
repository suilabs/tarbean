const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const Utils = require('./utils');

/**
 * Starts a new express static server
 * @param {Object} options Options for the static server
 * @param {Integer} options.port Port where to run the server
 * @param {String} options.basePath Base path where to save uploaded files
 * @param {Integer} options.fileSize Maximum file size in bytes
 * @return {http.Server}
 */
module.exports = function (options) {
  const app = express();
  const port = options.port || 3000;
  const basePath = options.basePath || __dirname;
  const fileSize = options.fileSize || 6 * 1024 * 1024;

  app.use(cors());
  app.use(fileUpload({
    limits: {
      fileSize: fileSize
    }
  }));
  app.post('/images/:project', (req, res) => {
    const projectName = req.params.project;
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }
    const image = req.files.data;

    if (image.truncated) {
      res.status(413).end();
    } else {
      Utils.saveFile(`${basePath}`, projectName, image.name, image)
        .then((url) => {
          res.send(JSON.stringify({url}));
        })
        .catch((err) => {
          console.log(err);
          res.status(500);
          res.send(JSON.stringify({error: err}));
        });
    }
  });

  app.use(express.static('public'));

  return app.listen(port);
};