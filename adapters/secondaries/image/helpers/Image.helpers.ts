const util = require("util");
import * as ImageConfig from "../config";

const bucket = ImageConfig.storage.bucket("recipes-of-marine");

const { format } = util;

/**
 *
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 * @param file
 */

export const uploadImage = (file: any) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname);
    //blob.delete();
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
      resumable: false,
    });

    blobStream
      .on("finish", () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        console.log(publicUrl)
        resolve(publicUrl);
      })
      .on("error", () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });

export const deleteFile = (fileName: any) =>
  new Promise((resolve, reject) => {
    bucket.file(fileName).delete();
  });
