import { useState } from "react";
import Button from "../../Components/Button/Button";
import WarningDialogue from "../../Components/WarningDialogue/WarningDialogue";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function DeleteAccount() {
  const [showWarning, setShowWarning] = useState(false);

  const navigate = useNavigate();

  async function handleCommitDelete() {
    const { data: user } = await supabase.auth.getUser();
    if (user) {
      if (!user.user) return;
      const { error } = await supabase.rpc("delete_user");
      if (error) {
        alert(error.message);
        return;
      }
      navigate("/");
    }
  }

  return (
    <>
      {showWarning &&
        WarningDialogue({
          message: "Are you sure? You cannot reverse this.",
          yesCallback: handleCommitDelete,
          noCallback: () => setShowWarning(false),
        })}

      <div className="bg-black text-white w-full h-screen absolute top-0 left-0 z-40 flex flex-col items-center">
        <h1 className="border-y text-center text-3xl border-wabsError p-4 w-full">
          Delete Account
        </h1>
        <p className="py-6">Are you sure you want to delete your account?</p>
        <Button
          role="primary"
          size="small"
          onClick={() => setShowWarning(true)}
        >
          Yes
        </Button>
        <Button
          role="primary"
          size="small"
          onClick={() => navigate("/profile")}
        >
          No
        </Button>
      </div>
    </>
  );
}
