const aws = require('aws-sdk');

const fileParams = (filename, contentType) => ({
  filename: filename,
  contentType: contentType || '',
});

class S3Service {
  constructor(config, secrets) {
    this.region = config.S3_REGION;
    this.bucket = config.S3_BUCKET;
    this.accessKey = secrets.s3AccessKey;
    this.secretKey = secrets.s3SecretKey;
  }

  uploadFile(filename, base64Data, contentType) {
    return new Promise((resolve, reject) => {
      const s3 = new aws.S3({
        apiVersion: '2006-03-01',
        region: this.region,
        accessKeyId: this.accessKey,
        secretAccessKey: this.secretKey,
      });

      const file = fileParams(filename, contentType);

      const params = {
        Bucket: this.bucket,
        Key: file.filename,
        Body: base64Data,
        ACL: 'public-read',
        ContentType: file.contentType,
        CacheControl: 'max-age=2592000',
      };

      s3.upload(params, (error, data) => {
        if (error) reject(error);
        else resolve(data);
      });
    });
  }
}

module.exports = S3Service;
