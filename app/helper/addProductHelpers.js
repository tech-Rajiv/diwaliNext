import imageCompression from "browser-image-compression";

function addProductHelpers() {
  const validaitonOfAllFieldsAreValid = (object) => {
    let hasError = false;
    for (let values in object) {
      if (!object[values]) {
        hasError = true;
      }
    }
    return hasError;
  };
  const compressedAndCloudinaryUrl = async (imageFile) => {
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB

      const compressesUrl = await getUrlFromCloudinary(compressedFile);
      return compressesUrl;
    } catch (error) {
      console.log(error);
    }
  };
  const getUrlFromCloudinary = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "diwali");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/db3uycxd3/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (!res.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }
    const data = await res.json();
    return data.secure_url;
  };
  return { compressedAndCloudinaryUrl, validaitonOfAllFieldsAreValid };
}

export default addProductHelpers;
