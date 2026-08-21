'use server'

export async function uploadImageToImgbb(formData) {
    const file = formData.get("image");

    if (!file || file.size === 0) {
        return { url: "" };
    }

    try {
        const imgbbFormData = new FormData();
        imgbbFormData.append("image", file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
            {
                method: "POST",
                body: imgbbFormData,
            }
        );

        const result = await res.json();

        
        if (!result.success) {
            return { error: result?.error?.message || "Image upload failed" };
        }

        return { url: result.data.url };
    } catch (err) {
        console.error("imgbb upload error:", err);
        return { error: "Image upload failed" };
    }
}