const express = require("express");
const aws = require("aws-sdk");
const csv = require("csv-parser");
const app = express();
const port = process.env.PORT || 8888;

require("dotenv").config();

const s3BucketName = process.env.ENV_BUCKET_NAME;

// Create an S3 object
const s3 = new aws.S3({
  accessKeyId: process.env.ENV_ACCESS_KEY_ID,
  secretAccessKey: process.env.ENV_SECRET_ACCESS_KEY,
  Bucket: s3BucketName,
});

app.get("/api/csv", (req, res) => {
  const s3FileName = req.query.file + ".csv";

  const s3KeyPrefix = "csv-data/";

  const params = {
    Bucket: s3BucketName,
    Key: s3KeyPrefix + s3FileName,
  };

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename=${s3FileName}`);

  s3.getObject(params).createReadStream().pipe(res);
});

app.get("/test", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
