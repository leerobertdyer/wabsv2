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
  monthlyReminder: boolean;
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
  monthlyReminder,
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
        monthlyReminder,
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
  const { data: imageLink } = supabase.storage.from("profile_photos").getPublicUrl(data.path);
  return imageLink.publicUrl;
}

export {
  signupWithSupabase,
  uploadPhotoToSupabase,
  storeAdditionalUserData,
};
