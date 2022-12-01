import cloudinary from "cloudinary";
import type { UploadHandler} from "@remix-run/node";
import { writeAsyncIterableToWritable, unstable_composeUploadHandlers, unstable_createMemoryUploadHandler } from "@remix-run/node";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(data: AsyncIterable<Uint8Array>) {
  const uploadPromise = new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "remix",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );
    await writeAsyncIterableToWritable(data, uploadStream);
  });

  return uploadPromise;
}

export const uploadHandler: UploadHandler = unstable_composeUploadHandlers(
  async ({ name, contentType, data, filename }) => {
    if (name !== "img") {
      return undefined;
    }
    const uploadedImage = await uploadImage(data);
    return uploadedImage.secure_url;
  },
  unstable_createMemoryUploadHandler()
);