async function validateLogin(email: string, password: string) {
  if (!email || !password) {
    alert("Please enter email AND password.");
    return;
  }

  try {
    const resp = await fetch("https://wabs-backend.onrender.com/signin", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (resp.ok) {
      localStorage.setItem("loggedIn", "true");
      window.history.pushState({}, "", "/profile");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    alert(`Error: ${error}`);
  }
}

export default validateLogin;
