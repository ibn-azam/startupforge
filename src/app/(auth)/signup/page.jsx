"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Radio,
  RadioGroup,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { uploadImageToImgbb } from "@/lib/actions/actions";

const SignUpPage = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setUploadedImageUrl(null);
    setUploadError(null);
    setImageFile(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
      setIsUploading(true);
      setUploadError(null);

      const uploadFormData = new FormData();
      uploadFormData.append("image", imageFile);

      const uploadResult = await uploadImageToImgbb(uploadFormData);
      setIsUploading(false);

      if (uploadResult?.error || !uploadResult?.url) {
        const message = uploadResult?.error || "Image upload failed.";
        setUploadError(message);
        toast.error(message);
        return;
      }

      imageUrl = uploadResult.url;
      setUploadedImageUrl(uploadResult.url);
    }

    const { data, error } = await authClient.signUp.email({
      name: userData.name,
      image: imageUrl,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      callbackURL: "/login",
    });

    if (data) {
      toast.success("Account created! Please log in.");
        router.push("/login");
    }
    if (error) {
      toast.error("signup failed");
    }
  };
  return (
    <div className="min-h-screen w-full flex items-start sm:items-center justify-center bg-[#FAFAFA] px-4 py-8 sm:py-12">
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl p-5 sm:p-8 shadow-sm rounded-2xl">
        <h1 className="text-xl sm:text-2xl font-bold text-[#131B3A] mb-6">
          Create your account
        </h1>
        <Form className="flex flex-col gap-4 sm:gap-5" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="name"
            type="text"
            className="flex flex-col gap-1.5"
          >
            <Label>Name</Label>
            <Input placeholder="Farhan Khan" className="w-full" />
            <FieldError />
          </TextField>

          <div className="flex flex-col gap-1.5">
            <Label>Profile Image</Label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-[#131B3A] file:px-3 file:py-1.5 file:text-white file:text-sm"
            />
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Optional. PNG or JPG, uploaded via imgbb.
            </p>
          </div>

          {/* Placeholder: local preview -> uploading -> success image + message -> error message */}
          {(previewUrl || isUploading || uploadedImageUrl || uploadError) && (
            <div className="flex flex-col items-center gap-2">
              {uploadedImageUrl ? (
                <>
                  <img
                    src={uploadedImageUrl}
                    alt="Uploaded profile"
                    className="h-24 w-24 rounded-full object-cover border border-[#6B7280]/20"
                  />
                  <span className="text-xs font-medium text-green-600">
                    Image uploaded successfully
                  </span>
                </>
              ) : isUploading ? (
                <div className="h-24 w-24 rounded-full border border-dashed border-[#6B7280]/30 flex items-center justify-center text-center px-2">
                  <span className="text-xs text-[#6B7280]">Uploading...</span>
                </div>
              ) : uploadError ? (
                <div className="h-24 w-24 rounded-full border border-dashed border-red-300 flex items-center justify-center text-center px-2">
                  <span className="text-xs text-red-500">Upload failed</span>
                </div>
              ) : (
                previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="h-24 w-24 rounded-full object-cover border border-[#6B7280]/20"
                  />
                )
              )}
            </div>
          )}

          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" className="w-full" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" className="w-full" />
            <Description className="text-xs sm:text-sm">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          {/* Radio for role input */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <Label>Subscription plan</Label>
            <RadioGroup
              defaultValue="seeker"
              name="role"
              orientation="horizontal"
              className="flex flex-col sm:flex-row gap-3 sm:gap-6"
            >
              <Radio value="collaborator">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  Collaborator
                </Radio.Content>
              </Radio>
              <Radio value="founder">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  Founder
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-3 my-2">
            <Button
              type="submit"
              isDisabled={isUploading}
              className="w-full text-[#FAFAFA] bg-[#FF6B35] font-bold text-[16px]"
            >
              {isUploading ? "Uploading..." : "Create"}
            </Button>
            <Button
              type="reset"
              variant="secondary"
              className="w-full text-[#131B3A] font-semibold text-[16px]"
            >
              Reset
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;