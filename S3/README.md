# Amazon S3 Bucket Guide

In this guide, we will learn how to create an Amazon S3 bucket using the AWS Management Console. We will also cover how to upload files, set permissions, and host a static website.

## Table of Contents

1. [Create an S3 Bucket](#1-create-an-s3-bucket)
2. [Upload Files](#2-upload-files)
3. [Set Permissions (Make Public)](#3-set-permissions-make-public)
4. [Host a Static Website](#4-host-a-static-website)

---

## 1. Create an S3 Bucket

A "bucket" is like a folder in the cloud where you store your files.

1.  **Log in** to your AWS Management Console.
2.  Search for **S3** in the search bar at the top and click on it.
3.  Click the orange **Create bucket** button.
4.  **Name your bucket**:
    - Enter a unique name (e.g., `my-awesome-website-123`).
    - _Note: The name must be unique across all of AWS._
5.  **Choose a Region**: Select the region closest to you or your audience (e.g., `us-east-1`).
6.  **Object Ownership**: Leave as default (ACLs disabled) recommended.
7.  **Block Public Access settings**:
    - If you want to host a website, **uncheck** "Block all public access".
    - Check the box that says "I acknowledge that the current settings might result in this bucket and the objects within becoming public."
8.  Leave other settings as default and click **Create bucket** at the bottom.

## 2. Upload Files

Now let's put some files (like images or HTML files) into your bucket.

1.  Click on the **name of the bucket** you just created.
2.  Click the orange **Upload** button.
3.  Click **Add files** to select files from your computer, or drag and drop them into the window.
4.  Once your files are listed, click the **Upload** button at the bottom.
5.  Wait for the "Upload succeeded" message, then click **Close**.

## 3. Set Permissions (Make Public)

To let everyone see your website, you need to add a "Bucket Policy". This is a rule that tells AWS to let anyone read the files.

1.  Go to the **Permissions** tab in your bucket.
2.  Scroll down to **Bucket policy**.
3.  Click **Edit**.
4.  Paste the following code into the editor (replace `YOUR-BUCKET-NAME` with your actual bucket name):

    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "PublicReadGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
      ]
    }
    ```

5.  Click **Save changes**.

## 4. Host a Static Website

Finally, let's turn this bucket into a website.

1.  Go to the **Properties** tab in your bucket.
2.  Scroll all the way down to **Static website hosting**.
3.  Click **Edit**.
4.  Select **Enable**.
5.  **Hosting type**: Choose "Host a static website".
6.  **Index document**: Type the name of your main file (usually `index.html`).
7.  (Optional) **Error document**: Type the name of your error file (e.g., `error.html`).
8.  Click **Save changes**.

### View Your Website

1.  Scroll down to the **Static website hosting** section again.
2.  You will see a **Bucket website endpoint** URL (e.g., `http://my-bucket.s3-website-us-east-1.amazonaws.com`).
3.  Click that link to see your live website!
