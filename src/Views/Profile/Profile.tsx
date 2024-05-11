import { FaCameraRetro } from "react-icons/fa";
import Button from "../../Components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { uploadPhotoToSupabase } from "../signup/helpers";
import InputField from "../../Components/InputField/InputField";
import Loading from "../../Components/Loading/Loading";
import { supabase } from "../../supabaseClient";
import { updateSupabaseColumn } from "../../supabaseHelpers";
import Toggle from "react-toggle";

type PropsDefinition = {
  photo: string;
  artistName: string;
  genre: string;
  location: string;
  phoneNumber: string;
  monthly_reminder: boolean;
  notify_on_new_song: boolean;
  reminder_type: string;
  getProfile: () => Promise<void>;
  handleUpdateLoginState: () => void;
};

export default function Profile({
  photo,
  getProfile,
  artistName,
  genre,
  location,
  phoneNumber,
  monthly_reminder,
  notify_on_new_song,
  reminder_type,
  handleUpdateLoginState,
}: PropsDefinition) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newPhoto, setNewPhoto] = useState("");
  const [newArtistName, setNewArtistName] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newMonthlyReminder, setNewMonthlyReminder] =
    useState(monthly_reminder);
  const [newSongSubmission, setNewSongSubmissions] =
    useState(notify_on_new_song);
  const [newReminderType, setNewReminderType] = useState(reminder_type);
  const [id, setId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function setUpProfile() {
      const user = await supabase.auth.getUser();
      if (user.data.user === null) navigate("/login");
      if (user.data?.user?.id) {
        const user_id = user.data.user.id;
        setId(user_id);
        const {data: profile} = await supabase
          .from("users")
          .select("*")
          .eq("user_id", user_id);
          if (profile) {
        setNewMonthlyReminder(profile[0].monthly_reminder);
        setNewSongSubmissions(profile[0].notify_on_new_song);
        setNewReminderType(profile[0].reminder_type);
          }
      }
      await getProfile();
    }
    setUpProfile();
  }, [artistName, getProfile, navigate]);

  async function handleEditProfile() {
    console.log(
      "new values",
      newMonthlyReminder,
      newSongSubmission,
      newReminderType,
      id,
      newArtistName,
      newGenre,
      newLocation,
      newPhoneNumber
    );
    setIsLoading(true);
    if (newArtistName)
      updateSupabaseColumn("users", "artist_name", newArtistName, id);
    if (newGenre) updateSupabaseColumn("users", "genre", newGenre, id);
    if (newLocation) updateSupabaseColumn("users", "location", newLocation, id);
    if (newReminderType)
      updateSupabaseColumn("users", "reminder_type", newReminderType, id);
    if (newPhoneNumber)
      updateSupabaseColumn("users", "phone_number", newPhoneNumber, id);

    updateSupabaseColumn("users", "notify_on_new_song", newSongSubmission, id);
    updateSupabaseColumn("users", "monthly_reminder", newMonthlyReminder, id);
    getProfile();
    setIsLoading(false);
    setIsEditing(false);
  }

  async function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      const publicUrl = await uploadPhotoToSupabase(file, artistName);
      if (publicUrl) {
        setNewPhoto(publicUrl);
        updateSupabaseColumn("profiles", "photo", publicUrl, id);
        setIsLoading(false);
      }
    }
  }

  function handleLogoutfromProfile() {
    handleUpdateLoginState();
    navigate("/login");
  }

  return (
    <div className="p-4">
      {isLoading ? <Loading title="Saving Profile Info" /> : null}
      {isEditing ? <h1>Edit Account</h1> : <h1>My Account</h1>}
      <div className="flex flex-col items-center justify-start w-[22rem] m-auto">
        <div
          className="
        flex 
        flex-col 
        m-auto
        rounded-full 
        w-[100px] 
        h-[100px] 
        bg-gray-200 
        items-center 
        justify-center"
          style={{
            backgroundImage: `url(${newPhoto ? newPhoto : photo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {isEditing && (
            <div className="rounded-full hover:cursor-pointer border-black border-[1px] w-[40px] h-[40px] flex justify-center items-center bg-white relative top-10 left-7 overflow-hidden">
              <FaCameraRetro
                size={25}
                onClick={() => document.getElementById("imageEdit")?.click()}
              />
              <input
                id="imageEdit"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleImageChange(e)}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col w-[22rem] m-auto items-center gap-2 py-6">
          {!isEditing ? (
            <>
              <h2>{artistName}</h2>
              <h3>{genre}</h3>
              <h4>{location}</h4>
              <h5>{phoneNumber}</h5>
            </>
          ) : (
            <>
              <InputField
                id="artistName"
                type="text"
                labelName="Artist Name"
                placeholder={artistName}
                onChange={(e) => setNewArtistName(e.target.value)}
              />
              <InputField
                id="genre"
                type="text"
                labelName="Genre"
                placeholder={genre}
                onChange={(e) => setNewGenre(e.target.value)}
              />
              <InputField
                id="location"
                type="text"
                labelName="Location"
                placeholder={location}
                onChange={(e) => setNewLocation(e.target.value)}
              />
              <InputField
                id="phoneNumber"
                type="text"
                labelName="Phone Number"
                placeholder={phoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
              />
              <label className="flex items-center gap-2">
                Monthly Reminder
                <Toggle
                  defaultChecked={newMonthlyReminder}
                  onClick={() => {
                    setNewMonthlyReminder(!newMonthlyReminder);
                  }}
                />
              </label>
              <label className="flex items-center gap-2">
                Song Submissions
                <Toggle
                  defaultChecked={newSongSubmission}
                  onClick={() => {
                    setNewSongSubmissions(!newSongSubmission);
                  }}
                />
              </label>
              <label className={`flex items-center gap-2 ${newReminderType === "email" ? "bg-wabsPurple text-white rounded-lg px-4" : ""}`}>
                <input
                  type="radio"
                  name="reminder_type"
                  value="email"
                  onChange={() => setNewReminderType("email")}
                />
                Email
              </label>
              <label className={`flex items-center gap-2 ${newReminderType === "text" ? "bg-wabsPurple text-white rounded-lg px-4" : ""}`}>
                <input
                  type="radio"
                  name="reminder_type"
                  value="text"
                  onChange={() => setNewReminderType("text")}
                />
                Text
              </label>
              <label className={`flex items-center gap-2 ${newReminderType === "both" ? "bg-wabsPurple text-white rounded-lg px-4" : ""}`}>
                <input
                  type="radio"
                  name="reminder_type"
                  value="both"
                  onChange={() => setNewReminderType("both")}
                />
                Both
              </label>
            </>
          )}
          <Button
            size="full"
            role="primary"
            onClick={
              isEditing ? () => handleEditProfile() : () => setIsEditing(true)
            }
          >
            {isEditing ? `Save` : `Edit`}
          </Button>
        </div>
      </div>
      <div className="py-4 mb-[8rem] flex flex-col justify-around h-fit gap-6">
        {!isEditing && (
          <>
            <h5 className="font-bold text-[1.25rem]">Your Songs</h5>
            <p>
              You have no songs! Go{" "}
              <Link className="text-wabsLink" to="/submit-song">
                Write A Bad Song!
              </Link>
            </p>
          </>
        )}
        {isEditing ? (
          <Link className="text-wabsLink" to="/delete-account">
            Delete Account
          </Link>
        ) : (
          <p
            className="text-wabsLink hover:cursor-pointer"
            onClick={handleLogoutfromProfile}
          >
            Log Out
          </p>
        )}
      </div>
    </div>
  );
}
