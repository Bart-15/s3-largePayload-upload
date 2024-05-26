# Large File Image Upload

This repository provides a solution for handling large file image uploads in AWS, bypassing the payload size limits of API Gateway (10MB) and AWS Lambda (6MB). The solution involves using AWS S3 for direct file uploads, with the backend processing managed by AWS Lambda.

## Introduction

When working with AWS services, you may encounter file size limitations that restrict the direct upload of large images through API Gateway and Lambda. This repository demonstrates how to circumvent these limitations by allowing clients to upload files directly to S3. The process is as follows:

- The client requests an upload URL from the backend.
- The backend generates a pre-signed URL for S3 and returns it to the client.
- The client uploads the file directly to S3 using the pre-signed URL.
- S3 triggers a Lambda function upon file upload to perform further processing.

## Architecture

- Client: Requests an upload URL and uploads the file.
- API Gateway: Exposes an endpoint to request the pre-signed URL.
- Lambda: Generates the pre-signed URL and handles S3 events.
- S3: Stores the uploaded files and triggers Lambda functions.
