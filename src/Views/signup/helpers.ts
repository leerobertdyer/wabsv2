import { supabase } from "../../supabaseClient";

type SignUpDefinition = {
  tempPhotoPath: string;
  email: string;
  password: string;
  location: string;
  artist_name: string;
  genre: string;
  phone_number: string;
  monthly_reminder: boolean;
  notify_on_new_song: boolean;
  reminder_type: "email" | "text" | "both" | null;
};

async function signupWithSupabase(props: SignUpDefinition) {
  const tempPhotoResponse = await supabase.storage
    .from("profile_photos")
    .download(props.tempPhotoPath);
  if (!tempPhotoResponse.data) {
    alert("Error swapping temp photo. Please try again.");
    return;
  }
  const tempPhotoData = tempPhotoResponse.data as Blob;
  const tempPhotoFile = new File([tempPhotoData], `${props.artist_name}.jpg`, {
    type: "image/jpeg",
  });
  const photoData = await uploadPhotoToSupabase(
    tempPhotoFile,
    `${props.artist_name}/${Date.now()}`
  );
  if (!photoData) return;
  const photo = photoData.publicUrl;
  await supabase.storage.from("profile_photos").remove([props.tempPhotoPath]);
  const { error } = await supabase.auth.signUp({
    email: props.email,
    password: props.password,
    options: {
      data: {
        artist_name: props.artist_name,
        genre: props.genre,
        phone_number: props.phone_number,
        location: props.location,
        photo,
        monthly_reminder: props.monthly_reminder,
        notify_on_new_song: props.notify_on_new_song,
        reminder_type: props.reminder_type,
      },
    },
  });
  if (error) {
    alert(error.message);
    return;
  }
}

type UploadPhotoReturnData = {
  publicUrl: string;
  path: string;
};

async function uploadPhotoToSupabase(
  photo: File,
  artistName: string
): Promise<UploadPhotoReturnData | void> {
  const { data, error } = await supabase.storage
    .from("profile_photos")
    .upload(`/${artistName}/` + Date.now(), photo);
  if (error) {
    alert("Photo upload failed. Please try again.");
    return;
  }
  if (data) {
    const path = data.path;
    const { data: imageLink } = supabase.storage
      .from("profile_photos")
      .getPublicUrl(data.path);
    if (!imageLink) return alert("Error uploading photo to database");
    const publicUrl = imageLink.publicUrl;
    return { publicUrl, path };
  }
}

export { signupWithSupabase, uploadPhotoToSupabase };
