import { supabase } from "../../supabaseClient";

type SignUpDefinition = {
  email: string;
  password: string;
};

type PropsDefinition2 = {
  photo: string;
  location: string;
  artistName: string;
  genre: string;
  phoneNumber: string;
  reminderStyle: string;
};

async function signupWithSupabase(props: SignUpDefinition) {
  const { error } = await supabase.auth.signUp({
    email: props.email,
    password: props.password,
  });
  if (error) {
    alert(error.message);
    return;
  }
}

async function storeAdditionalUserData({
  photo,
  artistName,
  genre,
  phoneNumber,
  location,
  reminderStyle,
}: PropsDefinition2) {
  const user = await supabase.auth.getUser();
  if (user.data?.user?.id) {
    const user_id = user.data.user.id;
    const { data, error } = await supabase.from("profiles").insert([
      {
        user_id,
        photo,
        artist_name: artistName,
        genre,
        phone_number: phoneNumber,
        location,
        reminder_style: reminderStyle,
      },
    ]);
    if (error) {
      alert(error.message);
      return;
    }
    return data;
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
  return data;
}

function getUrlFromSupabaseFile(bucket: string, file: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(file);
  return data;
}

export {
  signupWithSupabase,
  uploadPhotoToSupabase,
  getUrlFromSupabaseFile,
  storeAdditionalUserData,
};
