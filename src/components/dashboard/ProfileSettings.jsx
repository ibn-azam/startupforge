"use client";

import { useEffect, useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";

import { Button, Input, Label, TextField, TextArea } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { deleteProfile, getProfile, updateProfile } from "@/lib/api/user";

const ProfileSettings = () => {
  const router = useRouter();
  const { isPending: sessionPending } = useSession();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

 useEffect(() => {
  if (sessionPending) return;

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      if (data?.message && !data?.email) {
        toast.error(data.message);
        return;
      }

      setProfile(data);
      setName(data.name || "");
      setImage(data.image || "");
      setSkills(Array.isArray(data.skills) ? data.skills.join(", ") : "");
      setBio(data.bio || "");
    } catch (error) {
      toast.error("Unable to load your profile.");
    } finally {
      setIsLoading(false);
    }
  };

  loadProfile();
}, [sessionPending]);

 const handleSubmit = async (event) => {
  event.preventDefault();
  setIsSaving(true);

  try {
    const payload = {
      name: name.trim(),
      image: image.trim() || null,
    };

    if (profile.role === "collaborator") {
      payload.skills = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
      payload.bio = bio.trim();
    }

    const data = await updateProfile(payload);

    if (data?.message && !data?.email) {
      toast.error(data.message);
      return;
    }

    setProfile(data);
    toast.success("Profile updated successfully.");
  } catch (error) {
    toast.error("Unable to update your profile.");
  } finally {
    setIsSaving(false);
  }
};

  const handleDelete = async () => {
    if (!window.confirm("Delete your account permanently? This cannot be undone.")) {
      return;
    }

    setIsDeleting(true);

    try {
      const data = await deleteProfile();

      if (data?.message && data.message !== "Account deleted successfully.") {
        toast.error(data.message);
        setIsDeleting(false);
        return;
      }

      await authClient.signOut();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      toast.error("Unable to delete your account.");
      setIsDeleting(false);
    }
  };

  if (sessionPending || isLoading || !profile) {
    return <div className="p-6 text-sm text-gray-500">Loading profile...</div>;
  }

  const initials = profile.name?.slice(0, 2).toUpperCase() || "U";

  return (
    <div className="min-h-full p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FF6B35]">
            Account settings
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#131B3A]">Your Profile</h1>
          <p className="mt-2 text-sm text-gray-500">
            Update the information other StartupForge users see.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px]">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="space-y-5">
              <TextField name="name" isRequired>
                <Label>Name</Label>
                <Input value={name} onChange={(event) => setName(event.target.value)} />
              </TextField>

              <TextField name="image" type="url">
                <Label>Profile image URL</Label>
                <Input
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                />
              </TextField>

              

             {profile.role === "collaborator" && (
  <>
    <TextField name="skills">
      <Label>Skills</Label>
      <Input
        value={skills}
        onChange={(event) => setSkills(event.target.value)}
        placeholder="React, Node.js, Figma"
      />
    </TextField>

    <TextField name="bio">
      <Label>Bio</Label>
      <TextArea
        value={bio}
        onChange={(event) => setBio(event.target.value)}
        placeholder="Tell other founders and collaborators about yourself."
        rows={4}
      />
    </TextField>
  </>
)}
              <div className="border-t border-gray-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Email</p>
                <p className="mt-1 text-sm text-gray-600">{profile.email}</p>
              </div>

              <Button type="submit" isDisabled={isSaving} className="w-full bg-[#131B3A] font-semibold text-white">
                {isSaving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>

          <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#131B3A] text-xl font-bold text-white">
              {image ? <img src={image} alt="Profile" className="h-full w-full object-cover" /> : initials}
            </div>
            <p className="mt-4 text-center text-sm font-semibold capitalize text-[#131B3A]">{profile.role}</p>
            <p className="mt-1 text-center text-xs text-gray-500">
              {profile.isPremium ? "Premium member" : "Standard member"}
            </p>
          </aside>
        </div>

        <section className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-800">Delete account</h2>
          <p className="mt-1 text-sm text-red-700">This permanently removes your account and signs you out.</p>
          <Button type="button" isDisabled={isDeleting} onPress={handleDelete} className="mt-4 bg-red-600 font-semibold text-white">
            {isDeleting ? "Deleting..." : "Delete my account"}
          </Button>
        </section>
      </div>
    </div>
  );
};

export default ProfileSettings;