export const validaitonOfAllFieldsAreValid = (object) => {
  let hasError = false;
  for (let values in object) {
    if (!object[values]) {
      hasError = true;
    }
  }
  return hasError;
};

export const getUrlFromCloudinary = async (file) => {
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
