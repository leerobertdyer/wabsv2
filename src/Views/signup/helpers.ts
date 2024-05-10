import { supabase } from "../../supabaseClient";

type SignUpDefinition = {
  email: string;
  password: string;
  photo: string;
  location: string;
  artist_name: string;
  genre: string;
  phone_number: string;
  monthly_reminder: boolean;
  notify_on_new_song: boolean;
  reminder_type: "email" | "text" | "both" | null;
};

async function signupWithSupabase(props: SignUpDefinition) {
  const { error } = await supabase.auth.signUp({
    email: props.email,
    password: props.password,
    options: {
      data: {
        artist_name: props.artist_name,
        genre: props.genre,
        phone_number: props.phone_number,
        location: props.location,
        photo: props.photo,
        monthly_reminder: props.monthly_reminder,
        notify_on_new_song: props.notify_on_new_song,
        reminder_type: props.reminder_type
      },
    },
  });
  if (error) {
    alert(error.message);
    return;
  }
}

async function uploadPhotoToSupabase(photo: File, artistName: string) {
  const { data, error } = await supabase.storage
    .from("profile_photos")
    .upload(`/${artistName}/` + Date.now(), photo);
  if (error) {
    alert("Photo upload failed. Please try again.");
    return;
  }
  const { data: imageLink } = supabase.storage.from("profile_photos").getPublicUrl(data.path);
  return imageLink.publicUrl;
}

export {
  signupWithSupabase,
  uploadPhotoToSupabase,
};
