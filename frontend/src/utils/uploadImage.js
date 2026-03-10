export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "run_club_uploads");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/ddeligb9n/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) throw new Error("Upload failed");

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary Error:", error);
    return null;
  }
};
