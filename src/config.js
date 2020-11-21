const { env } = process;

module.exports = {
  SERVER_PORT: (env.PORT || 3000),
  S3_REGION: (env.S3_REGION || 'eu-west-3'),
  S3_BUCKET: (env.S3_BUCKET || 'suilabs'),
  secrets: {
    s3AccessKey: env.S3_ACCESS_KEY,
    s3SecretKey: env.S3_SECRET_KEY,
  },
  files: {
    PATH: env.FILES_PATH || __dirname,
    SIZE_LIMIT: env.FILES_SIZE_LIMIT || 6 * 1024 * 1024,
  }
};
