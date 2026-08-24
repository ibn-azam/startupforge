"use server";

export async function uploadImageToImgbb(formData) {
  try {
    const file = formData.get("image");

    if (!file || file.size === 0) {
      return {
        success: false,
        url: "",
        error: "No image selected",
      };
    }

    const imgbbFormData = new FormData();

    // ImgBB expects the field name "image"
    imgbbFormData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
      {
        method: "POST",
        body: imgbbFormData,
      }
    );

    const result = await response.json();

    console.log("ImgBB response:", result);

    if (!response.ok || !result?.success) {
      return {
        success: false,
        url: "",
        error:
          result?.error?.message || "Image upload failed",
      };
    }

    return {
      success: true,
      url: result.data.display_url || result.data.url,
      error: null,
    };
  } catch (error) {
    console.error("ImgBB upload error:", error);

    return {
      success: false,
      url: "",
      error: "Image upload failed",
    };
  }
}