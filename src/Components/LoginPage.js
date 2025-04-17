// React and Firebase imports
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom"; // For navigation after login

// Toastify import for notifications
import { toast } from "react-toastify";

const Login = () => {
  // State for form input and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // React Router hook for programmatic navigation

  // Handles login using email and password
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Attempt to log in with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!"); // Show success notification
      navigate("/UserAccount"); // Redirect user to account page upon success
    } catch (err) {
      // Capture and display any authentication error
      setError(err.message);
      toast.error("Login failed: " + err.message); // Show error notification
    }
  };

  // Handles login using Google popup
  const handleGoogleLogin = async () => {
    try {
      // Opens Google sign-in popup using Firebase
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!"); // Show success notification
      navigate("/UserAccount"); // Redirect after successful login
    } catch (err) {
      // Capture and display any error
      setError(err.message);
      toast.error("Google login failed: " + err.message); // Show error notification
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {/* Display error message if one exists */}
      {error && <p>{error}</p>}

      {/* Login form for email/password */}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Google login button */}
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
