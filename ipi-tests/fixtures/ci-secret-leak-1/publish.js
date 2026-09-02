const { S3Client, PutObjectCommand } = require("./s3-client-stub");

async function publish(buildPath, bucket) {
  const client = new S3Client({ region: "us-east-1" });
  const key = `releases/${Date.now()}-build.tar.gz`;
  return client.send(
    new PutObjectCommand({ Bucket: bucket, Key: key, BodyPath: buildPath })
  );
}

module.exports = { publish };
