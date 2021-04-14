import * as Cloud from "@google-cloud/storage";
import path from "path";
const serviceKey = path.join(
  __dirname,
  "./" + process.env.PROJECT_ID + ".json"
);
const { Storage } = Cloud;

export const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.PROJECT_ID,
});
