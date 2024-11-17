import AWS from "aws-sdk";

// AWS Configuration
AWS.config.update({
  accessKeyId: "aws-key", // Replace with your IAM Access Key ID
  secretAccessKey: "secret-key", // Replace with your IAM Secret Access Key
  region: "us-east-1" // Replace with your S3 bucket's region
});

const s3 = new AWS.S3();

export default s3;
