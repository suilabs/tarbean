const sharp = require('sharp');
const sizeOf = require('image-size');

class ImageService {
  constructor(config) {
    this.cuts = config.cuts;
  }

  async generateImages(image) {
    const { width, height } = sizeOf(new Buffer(image.data, 'base64'));
    const bigSide = width > height ? 'w' : 'h';

    const originalName = image.name.replace(/(\.[^.]+)$/, '');

    const images = [
      {
        name: originalName,
        data: image.data.toString('base64'),
        mimetype: image.mimetype
      },
    ];

    for (const { name, size } of this.cuts) {
      let resizedImage;
      if (bigSide === 'w') {
        resizedImage = await sharp(image.data).resize({ width: size, withoutEnlargement: true }).toBuffer();
      } else {
        resizedImage = await sharp(image.data).resize({ height: size, withoutEnlargement: true }).toBuffer();
      }

      console.log('Generated image', originalName, name, 'with size', resizedImage.size)
      images.push({
        name: `${originalName}-${name}`,
        data: resizedImage.toString('base64'),
        mimetype: image.mimetype
      });
    }

    return images;
  }
}

module.exports = ImageService;
