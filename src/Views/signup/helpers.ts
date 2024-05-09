import { supabase } from "../../supabaseClient";

type SignUpDefinition = {
  email: string;
  password: string;
  photo: string;
  location: string;
  artistName: string;
  genre: string;
  phoneNumber: string;
  monthlyReminder: boolean;
};

async function signupWithSupabase(props: SignUpDefinition) {
  const { error } = await supabase.auth.signUp({
    email: props.email,
    password: props.password,
    options: {
      data: {
        artist_name: props.artistName,
        genre: props.genre,
        phone_number: props.phoneNumber,
        location: props.location,
        photo: props.photo,
        monthly_reminder: props.monthlyReminder,
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
