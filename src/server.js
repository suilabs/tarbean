const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const config = require('./config');
const S3 = require('./S3Service');

const Utils = require('./utils');
const ImageService = require('./ImageService');

/**
 * Starts a new express static server
 * @param {Object} options Options for the static server
 * @param {Integer} options.port Port where to run the server
 * @param {String} options.basePath Base path where to save uploaded files
 * @param {Integer} options.fileSize Maximum file size in bytes
 * @return {http.Server}
 */
module.exports = function (options) {
  const {
    SERVER_PORT: port,
    S3_REGION,
    S3_BUCKET,
    secrets: {
      s3AccessKey,
      s3SecretKey,
    },
    files: {
      PATH: basePath,
      SIZE_LIMIT: fileSize
    },
    image_service
  } = config;
  const s3 = new S3(
    {
      S3_REGION,
      S3_BUCKET
    },
    {
      s3AccessKey,
      s3SecretKey
    });

  const imageService = new ImageService(image_service)
  
  const app = express();

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

  app.post('/upload/s3', async (req, res) => {
    const image = req.files.file;
    try {
      const s3Resp = await s3.uploadFile(image.name, image.data, image.mimetype);
      res.json({
        name: image.name,
        url: s3Resp.Location,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post('/upload/image/s3', async (req, res) => {
    const image = req.files.file;
    try {
      const images = await imageService.generateImages(image)
      const s3Images = []
      for (const image of images) {
        const s3Response = await s3.uploadFile(image.name, image.data, image.mimetype);
        console.log(s3Response)
        s3Images.push({
          url: s3Response.Location,
          ...image,
        });
      }
      res.json(s3Images)
    } catch (e) {
      res.status(500).send(e);
    }
  })

  app.use(express.static('public'));

  return app.listen(port, () => {
    console.log('Tarbean listening on port', port)
  });
};
