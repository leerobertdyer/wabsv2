import { supabase } from "../../supabaseClient";

async function validateLogin(email: string, password: string) {
  if (!email || !password) {
    alert("Please enter email AND password.");
    return;
  }
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    alert(error.message);
    return;
  }
  return true
}

export default validateLogin;
